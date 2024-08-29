import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaFileAlt, FaTags, FaInfoCircle, FaPlay, FaClock } from 'react-icons/fa';
import { getVideoDurationInSeconds } from 'get-video-duration';

interface Categorie {
  id: string;
  titre: string;
}

interface VideoFormProps {
  onClose: () => void;
  onAdd: () => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ onClose, onAdd}) => {
  const [videoSource, setVideoSource] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState('');
  const [title, setTitle] = useState('');
  const [duree, setDuree] = useState('');
  const [description, setDescription] = useState('');
  const [couverture, setCouverture] = useState<File | null>(null);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false); // État pour le chargement
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // État pour vérifier si le formulaire a été soumis

  const handleCategoryChange = (e: { target: { value: string }; }) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    const fetchallCategories = async () => {
      try {
        const categoriesResponse = await fetch("http://127.0.0.1:8000/categorie/allCategories", {
          method: "GET",
        });

        if (!categoriesResponse.ok) {
          throw new Error(`Erreur lors de la récupération des categories: ${categoriesResponse.statusText}`);
        }

        const categorieData: Categorie[] = await categoriesResponse.json();
        setCategories(categorieData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchallCategories();
  }, []);

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setVideoFile(file);
     
  //     const fileUrl = URL.createObjectURL(file);
  //     const durationInSeconds = await getVideoDurationInSeconds(fileUrl);
  //     setDuration(durationInSeconds.toFixed(2)); 
  //   }
  // };

  const handleFileChange = async (event:any) => {
    const file = event.target.files[0];
    setVideoFile(file);

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const videoElement = document.createElement('video');

      videoElement.src = fileUrl;

      videoElement.onloadedmetadata = () => {
        setVideoDuration(videoElement.duration);
        URL.revokeObjectURL(fileUrl); // Clean up the object URL
      };
    }
  };

  const handleCouvertureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCouverture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Afficher le loader
    setFormSubmitted(true); // Indiquer que le formulaire a été soumis

    try {
      let videoUrl = '';
      if (videoSource === '4') {
        if (!videoFile) {
          console.error("Aucun fichier vidéo sélectionné");
          return;
        }

        const formData = new FormData();
        formData.append("file", videoFile);

        const response = await fetch("http://127.0.0.1:8000/video/upload/", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Erreur: ${response.statusText}`);
        }

        const dataVideoUpload = await response.json();
        videoUrl = dataVideoUpload.url;
      } else {
        videoUrl = videoLink;
      }

      const formDataTwo = new FormData();
      if (couverture) formDataTwo.append("couverture", couverture);
      formDataTwo.append("titre", title);
      formDataTwo.append("description", description);
      formDataTwo.append("video_source", videoSource);
      formDataTwo.append("url", videoUrl);
      formDataTwo.append("categorie_id", category);
      formDataTwo.append("duree", videoDuration !== null ? videoDuration.toFixed(2) : '');
      formDataTwo.append("type_video", "1");

      const responsetwo = await fetch("http://127.0.0.1:8000/video/createVideo", {
        method: "POST",
        body: formDataTwo,
      });

      if (!responsetwo.ok) {
        throw new Error(`Erreur: ${responsetwo.statusText}`);
      }

      // Afficher le message de succès avec SweetAlert
      Swal.fire({
        title: 'Succès',
        text: 'La vidéo a été ajoutée avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        onAdd();
        onClose(); // Fermer le formulaire après la soumission
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier:", error);
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'ajout de la vidéo.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false); // Masquer le loader
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-16 h-16 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
        </div>
      ) : formSubmitted ? (
        <div className="bg-white p-6 shadow-md rounded-lg max-w-md w-full text-center">
          <p className="text-gray-700">Votre vidéo est en cours d'ajout. Merci de patienter.</p>
        </div>
      ) : (
        <form className="space-y-4 bg-white p-6 shadow-md rounded-lg max-w-md w-full" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">publier une Vidéo</h2>
            <button type="button" className="text-gray-400 hover:text-gray-100" onClick={onClose}>
              <span className="sr-only">Fermer</span>
            </button>
          </div>
          <div>
            <select
              value={videoSource}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVideoSource(e.target.value)}
              className="mt-1 block w-full p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
              required
            >
              <option value="" disabled>Choisissez la source de la vidéo</option>
              <option value="4">Upload</option>
            </select>
          </div>
        
          {videoSource === '4' && (
            <div className="border-dashed border-2 border-gray-600 p-4 rounded-md text-center h-30 flex flex-col justify-center">
              <input
                type="file"
                accept="video/*" // Autoriser uniquement les fichiers vidéo
                className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
                required
                onChange={handleFileChange}
              />
            </div>
          )}
          <div className="relative">
            <FaFileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Titre de la Vidéo"
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
            />
          </div>
         
          <div className="relative">
            <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={category}
              onChange={handleCategoryChange}
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
              required
            >
              <option value="" disabled>Choisissez une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.titre}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <FaInfoCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <textarea
              placeholder="Description"
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              rows={2}
              required
            />
          </div>
          <div className="relative">
            <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="file"
              accept="image/*" // Autoriser uniquement les fichiers image
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
              onChange={handleCouvertureChange}
            />
          </div>
          <div className="flex items-center gap-3 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Publier
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default VideoForm;
