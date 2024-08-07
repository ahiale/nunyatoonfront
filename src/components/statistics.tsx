import React from 'react';
import AgeDistributionChart from './ageDistributionChart';
import MostViewedVideos from './MostViewedVideos';
import MostViewedVideosChart from './MostViewedVideos';


const Statistics = () => {
  return (
    <div className="space-y-4 bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold">Statistiques</h2>
      <AgeDistributionChart />
      {/* <MostViewedVideosChart /> */}
     
    </div>
  );
};

export default Statistics;
