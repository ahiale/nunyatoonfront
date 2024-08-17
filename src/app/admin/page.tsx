"use client";
import CategoryTable from '@/components/categoryTable';
import Header from '@/components/header';
import MotifsTable from '@/components/motifsTable';
import PrivateRoute from '@/components/privatedRouter';
import Sidebar from '@/components/Sidebar';
import Statistics from '@/components/statistics';
import UserTable from '@/components/userTable';
import VideoForm from '@/components/videoForm';
import VideoManagement from '@/components/videoManagement';
import VideoStatistics from '@/components/videoStatistics';


import { useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [section, setSection] = useState<string>('statistics');

  return (
    <PrivateRoute forAdmin={true}>
    <div className='bg-cover bg-center bg-blue-50 h-screen overflow-hidden'>
      <div className="flex h-full">
        <Sidebar setSection={setSection} />
        <div className="flex-1 p-6 overflow-y-auto">
          {section === 'statistics' && <Statistics />}
          {section === 'videoStatistics' && <VideoStatistics />}
          {section === 'users' && <UserTable />}
          {section === 'videos' && <VideoManagement />}
          {section === 'categories' && <CategoryTable />}
          {section === 'motifs' && <MotifsTable />}
        </div>
      </div>
    </div>
    </PrivateRoute>
  );
};
export default AdminDashboard;
