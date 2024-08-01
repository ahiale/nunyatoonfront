// pages/Historique.tsx
import React from 'react';
import Footer from '@/components/Footer';


const videoList = [
  {
    title: 'Video 1',
    content: 'https://www.example.com/video1.mp4',
    date: '2024-07-01',
  },
  {
    title: 'Video 2',
    content: 'https://www.example.com/video2.mp4',
    date: '2024-07-02',
  },
  // Remove or update duplicate entries as needed
];

const HistoriqueComponent: React.FC = () => {
  return (
    <div className="bg-yellow-50 font-Grandstander min-h-screen flex flex-col">
      <div className="text-4xl font-semibold text-white text-center pt-8">
        <span className="text-black">HISTORIQUE DES </span>
        <span className="text-blue-600">VIDEOS</span>
      </div>

      <div className="flex-1 flex p-8">
        {/* Image section */}
        <div className="w-1/3">
          <img
            src="/images/login.png" // Make sure the image path is correct
            alt="Description de l'image"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Liste des vidéos avec marge à gauche */}
        {/* <VideoList videos={videoList} /> */}
      </div>

      <Footer />
    </div>
  );
};

export default HistoriqueComponent;
