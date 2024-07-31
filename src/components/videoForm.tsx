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
  const [videoType, setVideoType] = useState('movie');
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
    console.log(videoFile)

    

    if (videoSource === '4' && videoFile ==null ) {
      console.error("Aucun fichier sélectionné");
      return;
    }

    const formData = new FormData();
    formData.append("file", videoFile!);
    

    try {

      const response = await fetch("http://127.0.0.1:8000/video/upload/", {
        method: "POST",
        body:formData,
      });
      const dataVideoUpload= await response.json()


      if (!response.ok) {
        throw new Error(`Erreur: ${response.statusText}`);
      }


      const formDataTwo = new FormData();

      console.log(couverture)
      console.log(title)
      console.log(description)
      console.log(videoSource)
      console.log(category)

      formDataTwo.append("couverture", couverture!);
      formDataTwo.append("titre", title!);
      formDataTwo.append("description", description!);
      formDataTwo.append("video_source", videoSource!);
      formDataTwo.append("url", dataVideoUpload.url);
      formDataTwo.append("categorie_id", category!);
      formDataTwo.append("duree", "1h");
      formDataTwo.append("type_video", "1");
      
      const responsetwo = await fetch("http://127.0.0.1:8000/video/createVideo", {
        method: "POST",
        body:formDataTwo,
      });

      if (!responsetwo.ok) {
        throw new Error(`Erreur: ${response.statusText}`);
      }

      const resulttwo = await responsetwo.json();

      console.log(resulttwo); // Affiche la réponse du serveur

      onClose(); // Ferme le formulaire après la soumission
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier:", error);
    }
  };

  // function setCouverture(value: string): void {
  //   throw new Error('Function not implemented.');
  // }

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
        {videoSource === '1' && (
          <div className="relative">
            <FaPlay className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Lien YouTube"
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
              value={videoLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVideoLink(e.target.value)}
              required
            />
          </div>
        )}
        {videoSource === '2' && (
          <div className="relative">
            <FaPlay className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Lien Dailymotion"
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
              value={videoLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVideoLink(e.target.value)}
              required
            />
          </div>
        )}
        {videoSource === '3' && (
          <div className="relative">
            <FaPlay className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Lien ANIMESAMA"
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
            placeholder="couverture"
            className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
            required
            onChange={handleFileChange}
          />
        
            {/* <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V4a4 4 0 014-4h5.586a1 1 0 01.707.293l7.414 7.414a1 1 0 01.293.707V12a4 4 0 01-4 4H7z"></path>
                </svg>
                <p className="mt-2 text-sm text-gray-500">Glissez les fichiers ici pour les télécharger </p>
              </div>
            </label> */}
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
            placeholder="couverture"
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
            className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none text-black"
            required
          >
            <option value="" disabled>Choisissez une catégorie</option>
            <div></div>
            {categories.map((category, index) => (
              <option
               key={index} 
               value={category.id}>
              
                {category.titre} 
                
                </option>
            ))}
          </select>

        </div>
        <div className="relative">
          <FaInfoCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Description"
            className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end mt-4">
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Publier</button>
          <button type="button" className="px-4 py-2 bg-red-600 text-gray-300 rounded-lg ml-2 hover:bg-red-700" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
