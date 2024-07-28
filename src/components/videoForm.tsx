// components/VideoForm.tsx
import { useState } from 'react';

interface VideoFormProps {
  onClose: () => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ onClose }) => {
  const [videoType, setVideoType] = useState('movie');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [seasonName, setSeasonName] = useState('');
  const [seriesName, setSeriesName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    // Upload video file and other form data
    onClose(); // Close the form on submit
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <form className="space-y-4 bg-white p-6 shadow-md rounded-lg max-w-lg w-full overflow-y-auto" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-yellow-700">Ajouter une Vidéo</h2>
          <button type="button" className="text-gray-400 hover:text-gray-600" onClick={onClose}>
            <span className="sr-only">Fermer</span>
            &times;
          </button>
        </div>
        <div className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center h-30 flex flex-col justify-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">Télécharger la Vidéo</label>
          <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} required />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V4a4 4 0 014-4h5.586a1 1 0 01.707.293l7.414 7.414a1 1 0 01.293.707V12a4 4 0 01-4 4H7z"></path>
              </svg>
              <p className="mt-2 text-sm text-gray-600">Glissez les fichiers ici pour les télécharger ou <span className="text-yellow-600">parcourez</span></p>
            </div>
          </label>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Titre de la Vidéo</label>
            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Catégorie</label>
            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type de Vidéo</label>
          <select
            value={videoType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVideoType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
          >
            <option value="movie">Film</option>
            <option value="episode">Épisode</option>
          </select>
        </div>
        {videoType === 'episode' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom de la Saison</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={seasonName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeasonName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom de la Série</label>
              <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={seriesName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeriesName(e.target.value)} required />
            </div>
          </>
        )}
        <div className="flex justify-end mt-4">
          <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg">Enregistrer</button>
          <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg ml-2" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
