// pages/Profiles.tsx
"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import EnfantCard from "./enfantCard";
import ParentCard from "./parentCard";

interface Profile {
  nom: string;
  id: string;
  motDePasse: string;
  contact: string | null;
  codeParental: string;
  historique_video: string[] | null;
  age: number;
  pays: string;
  email: string;
  nbre_profil: number | null;
  maxProfilEnfant: number;
  children: any[];
}

const defaultProfile: Profile = {
  nom: "kodjqq",
  id: "169d1be6-4b20-4a45-9830-0b6be9",
  motDePasse: "$pbkdf2-sha256$29000$2jtnrDXmvNfae6815nzv3Q$ynG7joT8Rz10Ir8EOlRLrik71mHJIrSntue/fH1o2tc",
  contact: null,
  codeParental: "5678",
  historique_video: null,
  age: 30,
  pays: "Benin",
  email: "koda@gmail.com",
  nbre_profil: null,
  maxProfilEnfant: 3,
  children: [],
};

const Profiles: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [parentWithChildren, setParentWithTheirChildren] = useState<any[]>([]);

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const tokenPayload = token.split(".")[1];
          const decodedPayload = JSON.parse(atob(tokenPayload));
          const userId = decodedPayload.user_id;
          const response = await fetch(`http://127.0.0.1:8000/parents/${userId}/with-children`);
          if (!response.ok) {
            throw new Error("Failed to fetch parent data");
          }
          const data = await response.json();
          setParentWithTheirChildren([data]);
        } else {
          console.error("No token found in cookies.");
        }
      } catch (error) {
        console.error("Error fetching parent data:", error);
      }
    };

    fetchParentData();
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-800">
        <Navbar />
        <div className="text-center text-white py-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">Gestion de Profils</h1>
          <div className="flex justify-center">
            {parentWithChildren.map((parent: any) => (
              <div key={parent.id} className="space-y-4">
                <ParentCard nom={parent.nom} codeParental={parent.codeParental} />
                <div className="flex space-x-4">
                  {parent.children.map((child: any) => (
                    <EnfantCard
                      key={child.id}
                      pseudo={child.pseudo}
                      image={child.image_profil}
                      codePin={child.code_pin}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default Profiles;
