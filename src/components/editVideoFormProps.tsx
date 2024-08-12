import React, { useState } from "react";

interface Video {
  id: string;
  titre: string;
  description: string;
  type_video: number;
  categories: Array<any>;
}

interface EditVideoFormProps {
  video: Video;
  onClose: () => void;
  onUpdate: () => void;
}

const EditVideoForm: React.FC<EditVideoFormProps> = ({ video, onClose, onUpdate }) => {
  const [titre, setTitre] = useState(video.titre);
  const [description, setDescription] = useState(video.description);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/video/edit/${video.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre: titre, 
          description: description,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour de la vidéo: ${response.statusText}`);
      }
  
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la vidéo:", error);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg text-black font-semibold mb-4">Modifier la vidéo</h3>
        <form>
          <div className="mb-4">
            <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              id="titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="mt-1  w-full border-gray-300 rounded-md shadow-sm text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
            />
          </div>
        
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              onClick={handleSave}
            >
              Enregistrer
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVideoForm;
