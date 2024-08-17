"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const MotifsTable = () => {
  const [motifs, setMotifs] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMotifs = async () => {
      try {
        const response = await fetch("http://localhost:8000/video/get-all-motifs/");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        setMotifs(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchMotifs();
  }, []);

  const openConfirmationDialog = (videoId: string, parentId: string) => {
    setSelectedVideo(videoId);
    setParentId(parentId);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    console.log("Selected Video ID:", selectedVideo);
    console.log("Selected Parent ID:", parentId);
    if (selectedVideo === null || parentId === null) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/video/video/remove-from-lists/${selectedVideo}/${parentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la vidéo");
      }
      setMotifs(motifs.filter((item) => item.video_id !== selectedVideo));
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setShowDialog(false);
      setSelectedVideo(null);
      setParentId(null);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setSelectedVideo(null);
    setParentId(null);
  };

  return (
    <div className="container mx-auto p-2 font-Grandstander">
      <div className="text-black font-bold text-3xl pb-8 pt-4">
        Liste des vidéos signalées
      </div>
      <table className="min-w-full">
        <thead className="bg-purple-400">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Parent</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Vidéo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Motifs</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-600">
          {motifs.map((item) => (
            <tr key={item.video_id}>
              <td className="py-2 px-6 border-b text-black">{item.nom}</td>
              <td className="py-2 px-6 border-b text-black">{item.titre}</td>
              <td className="py-2 px-6 border-b text-black">{item.motif}</td>
              <td className="py-2 px-6 border-b text-black">
                <button
                  className="text-red-600 hover:text-red-900 mx-2"
                  onClick={() => openConfirmationDialog(item.video_id, item.parent_id)}
                >
                  <FontAwesomeIcon icon={faTrash} title="Supprimer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmation */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-black">Êtes-vous sûr de vouloir retirer cette video? </p>
            <div className="mt-4 flex justify-end">
              <button 
                className="bg-red-500  hover:bg-red-600 text-white px-4 py-2 rounded mr-2" 
                onClick={handleDelete}
              >
                Oui
              </button>
              <button 
                className="bg-gray-400 bg-hover-gray-500 px-4 py-2 rounded" 
                onClick={handleCancel}
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

export default MotifsTable;
