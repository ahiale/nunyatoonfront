"use client";
import CategoryTable from '@/components/categoryTable';
import Header from '@/components/header';
import Sidebar from '@/components/Sidebar';
import Statistics from '@/components/statistics';
import UserTable from '@/components/userTable';
import VideoForm from '@/components/videoForm';
import VideoManagement from '@/components/videoManagement';
import VideoStatistics from '@/components/videoStatistics';


import { useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [section, setSection] = useState<string>('users');

  return (
    <div className='bg-cover bg-center bg-blue-50 h-screen overflow-hidden'>
      <div className="flex h-full">
        <Sidebar setSection={setSection} />
        <div className="flex-1 p-6 overflow-y-auto">
          {section === 'users' && <UserTable />}
          {section === 'videos' && <VideoManagement />}
          {section === 'statistics' && <Statistics />}
          {section === 'categories' && <CategoryTable />}
          {section === 'videoStatistics' && <VideoStatistics />}
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
