import { useState } from 'react';
import { FaFileAlt, FaTags, FaInfoCircle, FaPlay, FaCalendar, FaTv } from 'react-icons/fa';

interface VideoFormProps {
  onClose: () => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ onClose }) => {
  const [videoType, setVideoType] = useState('movie');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [seasonName, setSeasonName] = useState('');
  const [seriesName, setSeriesName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      console.log(e.target.files[0].name);  // Affiche le titre du fichier dans la console
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!videoFile) {
      console.error("Aucun fichier sélectionné");
      return;
    }

//     const formData = new FormData();
//   formData.append("file", videoFile);
// formData.append("titre", title);
// formData.append("description", description);
// formData.append("duree", duration);
// formData.append("type_video", videoType);
// formData.append("admin_id", adminId);
// if (seasonName) formData.append("saison_id", seasonName);
// if (categoryId) formData.append("categorie_id", categoryId);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        // body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result); // Affiche la réponse du serveur
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
        <div className="border-dashed border-2 border-gray-600 p-4 rounded-md text-center h-30 flex flex-col justify-center">
          <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} required />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V4a4 4 0 014-4h5.586a1 1 0 01.707.293l7.414 7.414a1 1 0 01.293.707V12a4 4 0 01-4 4H7z"></path>
              </svg>
              <p className="mt-2 text-sm text-gray-500">Glissez les fichiers ici pour les télécharger </p>
            </div>
          </label>
        </div>
        <div className="flex space-x-4">
          <div className="relative w-1/2">
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
          <div className="relative w-1/2">
            <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Catégorie"
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              required
            />
          </div>
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
        <div>
          <select
            value={videoType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVideoType(e.target.value)}
            className="mt-1 block w-full p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
          >
            <option value="movie">Film</option>
            <option value="episode">Épisode</option>
          </select>
        </div>
        {videoType === 'episode' && (
          <>
            <div className="relative">
              <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nom de la Saison"
                className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
                value={seasonName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeasonName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FaTv className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nom de la Série"
                className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
                value={seriesName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeriesName(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="flex justify-end mt-4">
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Publier</button>
          <button type="button" className="px-4 py-2 bg-red-600 text-gray-300 rounded-lg ml-2 hover:bg-red-700" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
