"use client";
import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { RootState, store } from "@/store/store";
import EnfantCard from "./enfantCard";
import ParentCard from "./parentCard";
import { useDispatch } from "react-redux";
import { updateParentState } from "@/store/slice";

interface Profile {
  id: string;
  nom: string;
  age: number;
  motDePasse: string;
  pays: string;
  contact: string;
  email: string;
  codeParental: string;
  historique_video: [];
  children: Enfant[];
}

interface Enfant {
  id: string;
  pseudo: string;
  image: string;
  age: number;
  code_pin: string;
  historique_video: [];
  parent_id: string;
}

const defaultProfile: Profile = {
  id: "",
  nom: "",
  age: 0,
  motDePasse: "",
  pays: "",
  contact: "",
  email: "",
  codeParental: "",
  historique_video: [],
  children: [],
};

const Profiles: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [parentWithChildren, setParentWithChildren] = useState<Profile | null>(null);
  const dispatch = useDispatch();

  const fetchParentWithChildrenData = async () => {
    try {
      // Récupération des enfants depuis l'API
      const enfantsResponse = await fetch("http://127.0.0.1:8000/enfant/read_all_enfants", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!enfantsResponse.ok) {
        throw new Error("Erreur lors de la récupération des enfants");
      }

      const enfants = await enfantsResponse.json();

      // Récupération du parent connecté depuis le localStorage
      const parent = localStorage.getItem("connectedUser");
      console.log(parent)
      if (parent) {
        const parentJSON = JSON.parse(parent);

        // Mise à jour du profil du parent dans l'état
        setProfile(parentJSON);
        dispatch(updateParentState(parentJSON));

        // Filtrage des enfants pour associer uniquement ceux liés à ce parent
        const children = enfants.filter((enfant: Enfant) => enfant.parent_id === parentJSON.id);

        // Création d'un objet parent avec ses enfants
        const parentWithChildrenData: Profile = {
          ...parentJSON,
          children,
        };

        console.log("Parent avec enfants:", parentWithChildrenData); // Vérifiez ici

        // Mise à jour de l'état avec les données du parent et de ses enfants
        setParentWithChildren(parentWithChildrenData);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    fetchParentWithChildrenData();
  }, []);

  return (
    <Provider store={store}>
      <div
        className="flex flex-col items-center justify-center space-y-8 p-8 font-Grandstander w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/images/fondBleuNuit.jpg)" }}
      >
        <div className="absolute top-5 left-0 w-full">
          <Navbar />
        </div>

        <h1 className="text-5xl lg:text-5xl font-bold text-white mb-8">Quel est votre profil?</h1>

        <div className="flex space-x-4 lg:space-x-8">
          <ParentCard profile={profile} />
          {parentWithChildren?.children.map((enfant: Enfant) => (
            <EnfantCard key={enfant.id} enfant={enfant} />
          ))}
        </div>
      </div>
    </Provider>
  );
};

export default Profiles;
