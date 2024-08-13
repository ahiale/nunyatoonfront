import React, { useState } from "react";
import { FaClock, FaEdit, FaRegFileAlt } from "react-icons/fa";

interface Video {
  id: string;
  titre: string;
  duree:string;
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
  const [duree, setDuree] = useState(video.duree);
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
          duree:duree,
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
          <div className="mb-4 relative">
            <FaEdit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              id="titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Titre"
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
            />
          </div>
          <div className="mb-4 relative">
            <FaRegFileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div className="mb-4 relative">
            <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <textarea
              id="duree"
              value={duree}
              onChange={(e) => setDuree(e.target.value)}
              placeholder="Duree"
              className="mt-1 block w-full pl-8 p-2 border-2 border-gray-400 rounded-md bg-white text-black focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              onClick={handleSave}
            >
              Enregistrer
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
