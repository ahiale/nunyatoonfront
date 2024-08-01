import { SetStateAction, useEffect, useState } from 'react';
import { FaFileAlt, FaTags, FaInfoCircle, FaPlay } from 'react-icons/fa';

interface Categorie {
  id: string;
  titre: string;
}

interface VideoFormProps {
  onClose: () => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ onClose }) => {
  const [videoSource, setVideoSource] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [couverture, setCouverture] = useState<File | null>(null);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [category, setCategory] = useState('');

  const handleCategoryChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    const fetchallCategories = async () => {
      try {
        const categoriesResponse = await fetch(
          "http://127.0.0.1:8000/categorie/allCategories",
          {
            method: "GET",
          }
        );

        if (!categoriesResponse.ok) {
          throw new Error(
            `Erreur lors de la récupération des categories: ${categoriesResponse.statusText}`
          );
        }

        const categorieData: Categorie[] = await categoriesResponse.json();
        setCategories(categorieData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchallCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      console.log(e.target.files[0].name);  // Affiche le titre du fichier dans la console
    }
  };

  const handleCouvertureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCouverture(e.target.files[0]);
      console.log(e.target.files[0].name);  // Affiche le titre du fichier dans la console
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let videoUrl = '';
      if (videoSource === '4') {
        if (!videoFile) {
          console.error("Aucun fichier sélectionné");
          return;
        }

        const formData = new FormData();
        formData.append("file", videoFile!);

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
      formDataTwo.append("couverture", couverture!);
      formDataTwo.append("titre", title);
      formDataTwo.append("description", description);
      formDataTwo.append("video_source", videoSource);
      formDataTwo.append("url", videoUrl);
      formDataTwo.append("categorie_id", category);
      formDataTwo.append("duree", "1h");
      formDataTwo.append("type_video", "1");

      const responsetwo = await fetch("http://127.0.0.1:8000/video/createVideo", {
        method: "POST",
        body: formDataTwo,
      });

      if (!responsetwo.ok) {
        throw new Error(`Erreur: ${responsetwo.statusText}`);
      }

      const resulttwo = await responsetwo.json();
      console.log(resulttwo); // Affiche la réponse du serveur

      onClose(); // Ferme le formulaire après la soumission
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center overflow-y-auto">
      <form className="space-y-4 bg-white p-6 shadow-md rounded-lg max-w-md w-full" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Ajouter une Vidéo</h2>
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
            <option value="1">YouTube</option>
            <option value="2">Dailymotion</option>
            <option value="3">ANIMESAMA</option>
            <option value="4">Upload</option>
          </select>
        </div>
        {videoSource !== '4' && (
          <div className="relative">
            <FaPlay className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={
                videoSource === '1' ? 'Lien YouTube' :
                videoSource === '2' ? 'Lien Dailymotion' :
                'Lien ANIMESAMA'
              }
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
              value={videoLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVideoLink(e.target.value)}
              required
            />
          </div>
        )}
        {videoSource === '4' && (
          <div className="border-dashed border-2 border-gray-600 p-4 rounded-md text-center h-30 flex flex-col justify-center">
            <input
              type="file"
              placeholder="Video File"
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
          <FaFileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="file"
            placeholder="Couverture"
            className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
            onChange={handleCouvertureChange}
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
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.titre}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <FaInfoCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <textarea
            placeholder="Description de la Vidéo"
            className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700"
        >
          Ajouter la Vidéo
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
