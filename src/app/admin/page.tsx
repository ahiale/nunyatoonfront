"use client";
import CategoryTable from '@/components/categoryTable';
import Header from '@/components/header';
import Sidebar from '@/components/Sidebar';
import Statistics from '@/components/statistics';
import UserTable from '@/components/userTable';
import VideoForm from '@/components/videoForm';
import VideoManagement from '@/components/videoManagement';

import { useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [section, setSection] = useState<string>('users');

  return (
    <div className='bg-cover bg-center bg-blue-50'>
      <div className="flex h-screen font-Grandstander">
        <Sidebar setSection={setSection} />
        <div className="flex-1 p-6 m-0">
          {section === 'users' && <UserTable />}
          {section === 'videos' && <VideoManagement />}
          {section === 'statistics' && <Statistics />}
          {section === 'categories' && <CategoryTable />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
