// components/VideoCountCard.tsx
import React, { useEffect, useState } from 'react';
import { FaVideo } from 'react-icons/fa';

const VideoCountCard: React.FC = () => {
  const [videoCount, setVideoCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVideoCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/video/allVideo');
        const result = await response.json();

        // Compter le nombre de vidéos
        const count = result.length;

        setVideoCount(count);
      } catch (error) {
        console.error('Error fetching video count:', error);
      }
    };

    fetchVideoCount();
  }, []);

  return (
    <div className="relative bg-blue-500 text-white p-4 rounded-lg shadow-lg flex flex-col justify-between w-64 h-30">
    {/* Conteneur pour l'icône et le titre */}
    <div className="flex items-center mb-2">
      {/* Icône */}
      <FaVideo className="w-8 h-8 mr-2" />
      {/* Texte */}
      <h3 className="text-xl font-semibold">Nombre de Vidéos</h3>
    </div>
    {/* Nombre de vidéos en bas */}
    <div className="flex justify-center">
      <p className="text-3xl font-bold">
        {videoCount !== null ? videoCount : 'Loading...'}
      </p>
    </div>
  </div>
  );
};

export default VideoCountCard;
