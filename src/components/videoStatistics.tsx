import React from 'react';
import MostViewedVideosChart from './MostViewedVideos';
import { PolarArea } from 'react-chartjs-2';
import PolarAreaChart from './PolarAreaChart';
import VideoCountCard from './videoCountCard';
import TopLikedVideosChart from './topLikedVideosChart';
import PieChartMotifs from './pieChartMotifs';


const VideoStatistics: React.FC = () => {
  return (
    <div className="p-4 font-Grandstander">
      <h2 className="text-2xl text-black font-bold mb-4 ">Statistiques des Vidéos</h2>
      {/* <MostViewedVideosChart /> */}
      {/* <PolarAreaChart /> */}
      <VideoCountCard>
      </VideoCountCard>
      <PieChartMotifs></PieChartMotifs>
      <TopLikedVideosChart></TopLikedVideosChart>
     
    </div>
  );
};

export default VideoStatistics;
