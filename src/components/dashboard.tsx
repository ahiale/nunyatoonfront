"use client";
import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaUser,
  FaEdit,
  FaPlus,
  FaSignOutAlt,
  FaPen,
} from "react-icons/fa";
import ProfileCard from "./profilCard";
import Footer from "./Footer";
import ProfileEditForm from "./profileEditForm";
import ProfileForm from "./profileForm";
import ParentProfileForm from "./parentProfilForm";
import DeleteConfirmation from "./deleteConfirmation";
import VoirProfil from "./voirProfil";
import { Profile } from "../../type";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

interface Parent {
  id: string;
  nom: string;
  email: string;
}

const defaultParent: Parent = {
  id: "",
  nom: "",
  email: "",
};

// interface Profile {
//   id: string;
//   pseudo: string;
//   image: string;
//   age: number;
//   code_pin: string;
//   historique_video: string[];
//   parent_id: string;
//   parent: Parent;
// }

const Dashboard: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showParentEditForm, setShowParentEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile>();
  const [loggedParent, setLoggedParent] = useState<Parent>(defaultParent);
  const [readenfant, setReadEnfant] = useState<Profile[] | null>(null);
  const [showReadProfile, setShowReadProfile] = useState<Boolean>(false);

  const fetchParentData = async () => {
    const parentData = localStorage.getItem("connectedUser");
    if (parentData) {
      const parentJSON = JSON.parse(parentData);

      try {
        const parentResponse = await fetch(
          `http://127.0.0.1:8000/parent/get/${parentJSON.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (!parentResponse.ok) {
          throw new Error(
            "Erreur lors de la récupération des données du parent"
          );
        }

        const updatedParentData = await parentResponse.json();
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
        const children = enfants.filter((enfant: any) => enfant.parent_id === parentJSON.id);

        // Création d'un objet parent avec ses enfants
        const parentWithChildrenData: any = {
          ...parentJSON,
          children,
        };

        setLoggedParent(updatedParentData);

        setReadEnfant(parentWithChildrenData.children);
        console.log("readenfant :", parentWithChildrenData.children);
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  };

  useEffect(() => {
    fetchParentData();
  }, []);

  const openAddForm = () => {
    setShowAddForm(true);
  };

  const openEditForm = (profile: Profile) => {
    console.log("profile :", profile);
    if (profile.pseudo === "Nom du Profil Parent") {
      setShowParentEditForm(true);
    } else {
      setSelectedProfile(profile);
      setShowEditForm(true);
    }
  };

  const openDeleteConfirm = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowDeleteConfirm(true);
  };

  const openReadProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowReadProfile(true);
  };

  const closeForm = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setShowParentEditForm(false);
    setShowDeleteConfirm(false);
    setShowReadProfile(false);

    fetchParentData();
  };

  const handleAddProfile = (profile: Profile) => {
    // Add profile logic here
    console.log("Adding profile:", profile);
    closeForm();
  };

  const handleEditProfile = (profile: Profile) => {
    // Edit profile logic here
    console.log("Editing profile:", profile);
    closeForm();
  };

  const handleDeleteProfile = () => {
    // Delete profile logic here
    console.log("Deleting profile:", selectedProfile);
    closeForm();
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-purple-700 to-blue-900 bg-opacity-75 min-h-screen font-Grandstander text-black">
      {/* Back button */}
      <div className="absolute top-4 left-4">
        <Link href="/parent" className="text-white text-2xl">
          <FaArrowLeft />
        </Link>
      </div>
      <div className="flex-grow p-8 space-y-8">
        {/* Première carte */}
        <div
  className="bg-purple-700 p-6 rounded-lg mb-8 shadow-lg max-w-3xl mx-auto relative"
  style={{ backgroundImage: "url(/images/fondBleuNuit.jpg)" }}
>
<div className="flex items-center justify-between mb-4">
  <div className="flex items-center space-x-4 cursor-pointer">
    <FaUser className="text-gray-800" size={48} />
    <div className="flex items-center space-x-2 relative group">
      <h2 className="text-white font-semibold text-4xl pt-6 leading-none">{loggedParent.nom}</h2>
      <FaPen
        className="text-purple-600 pb-54 cursor-pointer transform rotate-0"
        size={20}
        onClick={() => setShowParentEditForm(true)}
      />
      <span className="absolute left-full top-0 ml-2 opacity-0 text-sm text-gray-200 group-hover:opacity-100 transition-opacity duration-200">
        Modifier mon profil 
      </span>
    </div>
  </div>
  <div className="text-white flex items-center justify-center space-x-1 pt-1 absolute top-3 right-6">
      <FaSignOutAlt />
      <LogoutButton />
    </div>
</div>


  <div className="flex flex-col items-center">
    {readenfant && readenfant.length < 3 ? (
      <button
        onClick={openAddForm}
        className="text-white p-2 rounded-lg flex items-center justify-center space-x-1 text-2xl shadow-md "
      >
        <FaPlus size={20} /> <span>Ajouter un enfant </span>
      </button>
    ) : (
      <p className="text-red-500">Vous ne pouvez pas ajouter plus de trois enfants</p>
    )}
  </div>
</div>


        {/* Deuxième carte */}
        <div
          className="dark:bg-purple-700 p-6 rounded-lg shadow-lg max-w-3xl mx-auto"
          style={{ backgroundImage: "url(/images/fondBleuNuit.jpg)" }}
        >
          <h3 className="text-yellow-500 text-2xl mb-4 font-bold">Mes Enfants</h3>
          <div className="space-y-4">
            {readenfant?.map((profile, index) => (
              <ProfileCard
                key={index}
                // id={profile?.id || 'zero'}
                // pseudo={profile?.pseudo || 'Pseudo Inconnu'}
                // image={profile? || '/path/to/default/image.jpg'}
                enfant={profile}
                onEdit={() => openEditForm(profile)}
                onDelete={() => openDeleteConfirm(profile)}
                readProfile={() => openReadProfile(profile)}
                onHistory={() => (window.location.href = "/history")} // Replace with proper routing logic
              />
            ))}
          </div>
        </div>
      </div>
      <Footer /> {/* Footer component */}
      {showAddForm && (
        <ProfileForm
          onClose={closeForm}
          onSubmit={handleAddProfile}
          loggedParentId={loggedParent.id}
        />
      )}
      {showEditForm && selectedProfile && (
        <ProfileEditForm
          initialProfile={selectedProfile}
          onClose={closeForm}
          onSubmit={handleEditProfile}
        />
      )}
      {showParentEditForm && (
        <ParentProfileForm
          onClose={closeForm}
          onSubmit={handleEditProfile}
          parentData={loggedParent}
        />
      )}
      {showDeleteConfirm && (
        <DeleteConfirmation
          onConfirm={handleDeleteProfile}
          onCancel={() => setShowDeleteConfirm(false)}
          initialProfile={selectedProfile}
        />
      )}
      {showReadProfile && (
        <VoirProfil onClose={closeForm} initialProfile={selectedProfile} />
      )}
    </div>
  );
};

export default Dashboard;
