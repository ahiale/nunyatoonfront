"use client";
import React from 'react';

import Footer from '@/components/Footer';
import HeroSectionContainer from '@/components/heroSection';
import ListeVideo from '@/components/ListeVideo';
import { ScreenTimeProvider } from '@/components/screenTimeProvider';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import PrivateRoute from '@/components/privatedRouter';

const Enfant: React.FC = () => {
  return (
    <Provider store={store}>
      <PrivateRoute forAdmin={false}> {/* Protection pour les parents */}
        <ScreenTimeProvider>
          <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/fondBleuNuit.jpg)' }}
          >
            <HeroSectionContainer />
            <div className="">
              <ListeVideo />
            </div>
            <Footer />
          </div>
        </ScreenTimeProvider>
      </PrivateRoute>
    </Provider>
  );
};

export default Enfant;
