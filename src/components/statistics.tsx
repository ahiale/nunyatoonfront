import React from 'react';
import AgeDistributionChart from './ageDistributionChart';
import MostViewedVideos from './MostViewedVideos';
import MostViewedVideosChart from './MostViewedVideos';
import ParentCountCard from './parentCountCard';
import ChildCountCard from './childCountCard';
import UserRegistrationsChart from './userRegistrationsChart';
import AgeDistributionPieChart from './ageDistributionPieChart';

const Statistics = () => {
  return (
    <div className="space-y-4  p-4  rounded-lg font-Grandstander">
      <h2 className="text-2xl font-semibold text-black pl-8 ">Etat des utilisateurs </h2>
      
     
      <div className="flex space-x-8 justify-center">
        <ParentCountCard />
        <ChildCountCard />
      </div>
    
        <UserRegistrationsChart />
        <AgeDistributionChart />
     
   
    </div>
  );
};

export default Statistics;
