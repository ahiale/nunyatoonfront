import React, { useState, useEffect } from "react";
import VideoForm from './videoForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditVideoForm from "./editVideoFormProps";
import Loader from "./loader";


interface Video {
  id: string;
  titre: string;
  description: string;
  duree: string;
  type_video: number;
  categories: Array<any>;
}

const VideoManagement = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true); // État de chargement

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const fetchVideosAndCategories = async () => {
    setLoading(true); // Activer le chargement
    try {
      const videosResponse = await fetch("http://127.0.0.1:8000/video/allVideo", {
        method: "GET",
      });

      if (!videosResponse.ok) {
        throw new Error(`Erreur lors de la récupération des vidéos: ${videosResponse.statusText}`);
      }

      const videoData: Video[] = await videosResponse.json();
      setVideos(videoData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      setLoading(false); // Désactiver le chargement
    }
  };

  const handleDelete = async () => {
    if (videoToDelete) {
      try {
        const deleteResponse = await fetch(`http://127.0.0.1:8000/video/delete/${videoToDelete}`, {
          method: "DELETE",
        });

        if (!deleteResponse.ok) {
          throw new Error(`Erreur lors de la suppression de la vidéo: ${deleteResponse.statusText}`);
        }

        setVideos(videos.filter(video => video.id !== videoToDelete));
        setVideoToDelete(null);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Erreur lors de la suppression de la vidéo:", error);
      }
    }
  };

  const openConfirmationDialog = (id: string) => {
    setVideoToDelete(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setVideoToDelete(null);
  };

  const openEditForm = (video: Video) => {
    setEditFormData(video);
  };

  const handleCloseEditForm = () => {
    setEditFormData(null);
  };

  useEffect(() => {
    fetchVideosAndCategories();
  }, []);

  // Trier les vidéos par titre
  const sortedVideos = [...videos].sort((a, b) => a.titre.localeCompare(b.titre));

  
  const formatDuration = (duration: string): string => {
    // Convertir la chaîne de durée en nombre de secondes
    const durationInSeconds = parseFloat(duration);
  
    // Vérifier si la conversion a réussi et si la durée est valide
    if (isNaN(durationInSeconds) || durationInSeconds < 0) {
      console.warn('Durée non valide:', duration);
      return '0m 0s'; // Valeur par défaut en cas d'erreur
    }
  
    // Calculer les minutes et les secondes
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
  
    // Formater la durée avec des zéros pour les valeurs inférieures à 10
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
  
    // Retourner la durée formatée
    return `${formattedMinutes}m ${formattedSeconds}s`;
  };
  

  return (
    <div className="font-Grandstander">
      <div className="text-black font-bold text-3xl pb-8 pt-8">
        Liste des vidéos
      </div>
      <button
        className="mb-4 px-6 py-1 bg-purple-600 bg-opacity-25 text-black rounded-lg"
        onClick={() => setShowForm(true)}
      >
        <span>Ajouter une vidéo</span>
      </button>
      {showForm && (
        <VideoForm onClose={handleCloseForm}  
        onAdd={() => fetchVideosAndCategories()}/>
      )}
      {editFormData && (
        <EditVideoForm
          video={editFormData}
          onClose={handleCloseEditForm}
          onUpdate={() => fetchVideosAndCategories()}
        />
      )}
      {loading ? (
        <Loader /> // Afficher le Loader pendant le chargement
      ) : (
        <table className="min-w-full text-white">
          <thead className='bg-purple-400'>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Duree</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-600">
            {sortedVideos.map((video, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-black border-b">
                  <div>{video.titre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black border-b">
                  <div>{video.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black border-b">
                  <div>{video.categories[0]?.titre || "N/A"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black border-b">
                  <div>{formatDuration(video.duree)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b">
                  <div className="flex items-center justify-start space-x-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => openEditForm(video)}
                    >
                      <FontAwesomeIcon icon={faEdit} title="Modifier" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => openConfirmationDialog(video.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} title="Supprimer" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg text-black font-semibold mb-4">Êtes-vous sûr de vouloir supprimer cette vidéo ?</h3>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                onClick={handleDelete}
              >
                Oui
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={handleCloseDialog}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoManagement;
