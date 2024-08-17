// pages/profiles.tsx
"use client";
import LogoutButton from '@/components/LogoutButton';
import PrivateRoute from '@/components/privatedRouter';
import Profiles from '@/components/profiles';
import { store } from '@/store/store';
import React from 'react';
import { Provider } from 'react-redux';


const ProfilesPage: React.FC = () => {
  return (
   <Provider store={store}>
    <PrivateRoute forAdmin={false}>
   <div>
      <Profiles />
    </div>
    </PrivateRoute>
   </Provider>
  );
};

export default ProfilesPage;
