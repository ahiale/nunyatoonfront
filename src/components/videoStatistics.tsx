import React from 'react';
import MostViewedVideosChart from './MostViewedVideos';
import { PolarArea } from 'react-chartjs-2';
import PolarAreaChart from './PolarAreaChart';
import VideoCountCard from './videoCountCard';


const VideoStatistics: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Statistiques des Vidéos</h2>
      {/* <MostViewedVideosChart /> */}
      {/* <PolarAreaChart /> */}
      <VideoCountCard>
        
      </VideoCountCard>
     
    </div>
  );
};

export default VideoStatistics;
