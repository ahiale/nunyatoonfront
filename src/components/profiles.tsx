"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Provider, useSelector } from 'react-redux';

import Navbar from './Navbar';
import { RootState, store } from '@/store/store';

import EnfantCard from './enfantCard';
import ParentCard from './parentCard';
import { useDispatch } from 'react-redux';
import { updateParentState } from '@/store/slice';
import LogoutButton from './LogoutButton';


interface Profile {
  id: string;
  nom: string;
  age: number;
  motDePasse: string;
  pays: string;
  contact: string;
  email: string;
  codeParental: string;
  historique_video:[];
  children: Enfant[];
}

interface Enfant {
  id: string;
  pseudo: string;
  image: string;
  age: number;
  code_pin: string;
  historique_video:[];
  parent_id: string;
}

const defaultProfile: Profile = {
  id: '',
  nom: '',
  age: 0,
  motDePasse: '',
  pays: '',
  contact: '',
  email: '',
  codeParental: '',
  historique_video: [],
  children: []
};

const Profiles: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [parentWithChildren, setParentWithTheirChildren] = useState<any[]>([]);
  const dispatch = useDispatch()
 
  const parentData = useSelector(
    (state:RootState) => state.AppStates.parentState
  )
 
  const fetchParentWithTheirChildrenData = async () => {
    const enfants = await fetch(
      `http://127.0.0.1:8000/enfant/read_all_enfants`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const parent = localStorage.getItem("connectedUser");
    if (parent) {
      const parentJSON = JSON.parse(parent);
      // console.log("parentJSON", parentJSON);
      setProfile(parentJSON)
      // console.log("profileeee",profile)
    
      // const connectedParent = await fetch(
      //   `http://127.0.0.1:8000/parent/get/${parentJSON.id}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Access-Control-Allow-Origin": "*"
      //     },
      //   }
      // );
      // setProfile(parentJSON)
      // console.log("parent etat2",parentJSON)
      // console.log("parent etat3",profile)
      // console.log("parent etat4",parentData)
      // console.log(parentJSON)
      const enfantsToJson = await enfants.json();
      // console.log("enfantsToJson", enfantsToJson);

      // const connectedParentJson = await connectedParent.json();
      const parentWithChildren = {
        ...parentData,
        children: enfantsToJson.filter(
          (enfant: { parent_id: string }) => enfant.parent_id === parentData.id
        ),
      };
      setParentWithTheirChildren([parentWithChildren]);

    }
  };
  useEffect(() => {
    
    fetchParentWithTheirChildrenData();
  }, []);

  
  
  return (
    <Provider store={store}>
      <div
      className="flex flex-col items-center justify-center space-y-8 p-8 font-Grandstander w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/fondBleuNuit.jpg)' }}
    >
        <div className="absolute top-5 left-0 w-full">
        <LogoutButton/>
          <Navbar />
        </div>
     
        <h1 className="text-5xl lg:text-5xl font-bold text-white mb-8">
          Quel est votre profil?
        </h1>
        <div className="flex space-x-4 lg:space-x-8">
        <ParentCard profile={profile} />
        {parentWithChildren.map(
          (parent: { children: Enfant[] }, index: React.Key | null | undefined) =>
            parent.children.map(
              (enfant: Enfant, enfantIndex: React.Key | null | undefined) => (
                <EnfantCard key={enfant.id} enfant={enfant} />
              )
            )
        )}
      </div>
      </div>
    </Provider>
  );
};

export default Profiles;
