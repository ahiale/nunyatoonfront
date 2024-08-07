// pages/profiles.tsx
"use client";
import LogoutButton from '@/components/LogoutButton';
import Profiles from '@/components/profiles';
import { store } from '@/store/store';
import React from 'react';
import { Provider } from 'react-redux';


const ProfilesPage: React.FC = () => {
  return (
   <Provider store={store}>
   <div>
      <Profiles />
    </div>
   </Provider>
  );
};

export default ProfilesPage;
