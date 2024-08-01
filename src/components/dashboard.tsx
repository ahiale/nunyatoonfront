"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaUser, FaEdit, FaPlus, FaSignOutAlt } from "react-icons/fa";
import ProfileCard from "./profilCard";
import Footer from "./Footer";
import ProfileEditForm from "./profileEditForm";
import ProfileForm from "./profileForm";
import ParentProfileForm from "./parentProfilForm";
import DeleteConfirmation from "./deleteConfirmation";
import VoirProfil from "./voirProfil";
import { Profile } from "../../type";
import Link from "next/link";


interface Parent {
  id: string;
  nom: string;
  email: string;
}

const defaultParent: Parent = {
  id: "",
  nom: "",
  email: ""
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

  useEffect(() => {
    const fetchParentData = async () => {
      const parentData = localStorage.getItem("connectedUser");
      if (parentData) {
        const parentJSON = JSON.parse(parentData);
      
        console.log("parentJSON :", parentJSON)
        
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
            throw new Error("Erreur lors de la récupération des données du parent");
          }

          const updatedParentData = await parentResponse.json();

          console.log("updatedParentData :", updatedParentData);

          localStorage.setItem("connectedUser", JSON.stringify(updatedParentData));

          setLoggedParent(updatedParentData);

          setReadEnfant(updatedParentData.enfants);
          console.log("readenfant :", updatedParentData.enfants);
        } catch (error) {
          console.error("Erreur:", error);
        }
      }
    };

    fetchParentData();
  }, []);

  const openAddForm = () => {
    setShowAddForm(true);
  };

  const openEditForm = (profile: Profile) => {
    console.log("profile :", profile)
    if (profile.pseudo === 'Nom du Profil Parent') {
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
  };

  const handleAddProfile = (profile: Profile) => {
    // Add profile logic here
    console.log('Adding profile:', profile);
    closeForm();
  };

  const handleEditProfile = (profile: Profile) => {
    // Edit profile logic here
    console.log('Editing profile:', profile);
    closeForm();
  };

  const handleDeleteProfile = () => {
    // Delete profile logic here
    console.log('Deleting profile:', selectedProfile);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-purple-700 to-blue-900 bg-opacity-75 min-h-screen font-Grandstander text-black">
      {/* Back button */}
      <div className="absolute top-4 left-4">
        <Link href="/parent"
         className="text-white text-2xl"
         >
          <FaArrowLeft />
          
        </Link>
      </div>
      <div className="flex-grow p-8 space-y-8">
        {/* Première carte */}
        <div className="bg-purple-700 p-6 rounded-lg mb-8 shadow-lg max-w-3xl mx-auto" style={{ backgroundImage: 'url(/images/fondBleuNuit.jpg)' }}>
          <div className="flex items-center space-x-4 mb-4 cursor-pointer" onClick={() => setShowParentEditForm(true)}>
            <FaUser className="text-gray-800" size={50} />
            <div>
              <h2 className="text-white font-semibold text-2xl">{loggedParent.nom}</h2>
              <p className="text-gray-900">Bienvenue, vous avez {readenfant?.length} profil(s) enfants.</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2 items-start">
            <button onClick={() => setShowParentEditForm(true)} className="text-white p-2 rounded-lg flex items-center justify-center space-x-1">
              <FaEdit /> <span>Modifier Profil</span>
            </button>
            <button onClick={openAddForm} className="text-white p-2 rounded-lg flex items-center justify-center space-x-1">
              <FaPlus /> <span>Ajouter</span>
            </button>
            <button className="text-white p-2 rounded-lg flex items-center justify-center space-x-1">
              <FaSignOutAlt /> <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Deuxième carte */}
        <div className="dark:bg-purple-700 p-6 rounded-lg shadow-lg max-w-3xl mx-auto" style={{ backgroundImage: 'url(/images/fondBleuNuit.jpg)' }}>
          <h3 className="text-white text-xl mb-4 font-bold">Profils Enfants</h3>
          <div className="space-y-4">
            {readenfant?.map((profile, index) => (
              <ProfileCard
                key={index}
                pseudo={profile?.pseudo || 'Pseudo Inconnu'}
                image={profile?.image || '/path/to/default/image.jpg'}
                onEdit={() => openEditForm(profile)}
                onDelete={() => openDeleteConfirm(profile)}
                readProfile={() => openReadProfile(profile)}
                onHistory={() => window.location.href = '/history'} // Replace with proper routing logic
              />
            ))}
          </div>
        </div>
      </div>
      <Footer /> {/* Footer component */}
      
      {showAddForm && <ProfileForm onClose={closeForm} onSubmit={handleAddProfile} loggedParentId={loggedParent.id} />}
      {showEditForm && selectedProfile && <ProfileEditForm initialProfile={selectedProfile} onClose={closeForm} onSubmit={handleEditProfile} />}
      {showParentEditForm && (
        <ParentProfileForm onClose={closeForm} onSubmit={handleEditProfile} parentData={loggedParent} />
      )}
      {showDeleteConfirm && (
        <DeleteConfirmation
          onConfirm={handleDeleteProfile}
          onCancel={() => setShowDeleteConfirm(false)}
          initialProfile={selectedProfile}
        />
      )}
      {showReadProfile && <VoirProfil onClose={closeForm} initialProfile={selectedProfile} />}
    </div>
  );
};

export default Dashboard;
