// components/VideoManagement.tsx
import React, { useState, useEffect } from "react";
import VideoForm from './videoForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FaEdit, FaPlus, FaSignOutAlt, FaUser, FaEllipsisV, FaTrash, FaHistory } from 'react-icons/fa';

interface Video {
  id: string;
  titre: string;
  description:string;
  type_video:number;
  categories:Array<any>;
  // categorie: any[];
}

const VideoManagement = () => {

    const [videos, setVideos] = useState<Video[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [type_values, setType_values] = useState(false);
  
    const handleCloseForm = () => {
      setShowForm(false);
    };

    useEffect(() => {
      const fetchVideosAndCategories = async () => {
        try {
          const videosResponse = await fetch(
            "http://127.0.0.1:8000/video/allVideo",
            {
              method: "GET",
            }
          );
  
          if (!videosResponse.ok) {
            throw new Error(
              `Erreur lors de la récupération des videos: ${videosResponse.statusText}`
            );
          }
  
          const videoData: Video[] = await videosResponse.json();
          
          setVideos(videoData);
        } catch (error) {
          console.error("Erreur lors de la récupération des données:", error);
        }
      };

      fetchVideosAndCategories();
    }, []);

  return (
    <div className=''>
        <div className='text-3xl text-black font-bold text-left mb-8 text-yellow-600'>
            Liste des videos
        </div>
      <button
        className="mb-4 px-6 py-1 bg-gray-200 text-black rounded-lg"
        onClick={() => setShowForm(true)}
      >
        <span> ajouter une video</span>
      </button>
      {showForm && <VideoForm onClose={handleCloseForm}/>}
      <table className="min-w-full  text-black">
        <thead className='bg-yellow-50'>
          <tr>
            <th className="px-4 py-2">Titre</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Categorie</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
         <tbody>
          
          {videos.map((video, index) => (
            
            <tr key={index}>
          <td className="px-6 py-4 whitespace-nowrap text-black">
                <div>{video.titre}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                
                <div>{video.description}</div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-black">
                
                <div>{video.type_video === 1 ? "Film" : " Serie" }</div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-black">
                
                <div>{video.categories[0].titre}</div>
              </td>

          </tr>
        ))}
         </tbody>
        
      </table>
    </div>
  );
};

export default VideoManagement;
