// components/VideoCountCard.tsx
import React, { useEffect, useState } from 'react';

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
    <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Nombre de Vidéos</h3>
        <p className="text-4xl font-bold mt-2">{videoCount !== null ? videoCount : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default VideoCountCard;
