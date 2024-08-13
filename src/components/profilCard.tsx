"use client";
import { updateEnfantState } from '@/store/slice';
import Link from 'next/link';
import { useState } from 'react';
import { FaEllipsisV, FaEdit, FaTrash, FaHistory } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

type ProfileCardProps = {
  enfant: ProfilEnfant;
  onEdit: () => void;
  onDelete: () => void;
  onHistory: () => void;
  readProfile: () => void;
};

interface ProfilEnfant {
  id?: string;
  pseudo?: string;
  image?: string;
  age?: number;
  code_pin?: string;
  historique_video?: [];
  parent_id?: string;
}

// Fonction pour générer une couleur en fonction de l'ID de l'enfant
const getBackgroundColor = (id: string | undefined) => {
  const couleurs = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
  if (!id) return couleurs[0];
  const couleurIndex = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % couleurs.length;
  return couleurs[couleurIndex];
};


const ProfileCard: React.FC<ProfileCardProps> = ({
  enfant,
  onDelete,
  onEdit,
  readProfile,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const dispatch = useDispatch();

  const voirHistorique = (enfant: ProfilEnfant) => {
    dispatch(updateEnfantState(enfant));
  };

  return (
    <div className="relative bg-blue-800 bg-opacity-25 p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${enfant.image ? '' : getBackgroundColor(enfant.id)} ${!enfant.image ? 'text-white text-xl font-bold' : ''}`}
        >
          {enfant.image ? (
            <img
              src={enfant.image}
              alt={`${enfant.pseudo} Profile`}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <span>{enfant.pseudo?.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div>
          <h3 className="text-white text-lg">{enfant.pseudo}</h3>
        </div>
        <FaEllipsisV
          className="text-white cursor-pointer ml-auto"
          onClick={() => setShowOptions(!showOptions)}
        />
      </div>
      {showOptions && (
        <div className="mt-2 p-2 bg-white rounded-md  w-full">
          <button
            onClick={() => {
              readProfile();
              setShowOptions(false); // Fermer les options après l'action
            }}
            className="block px-4 py-2 text-black hover:bg-blue-700 w-full text-left flex items-center"
          >
            <FaHistory className="mr-2" /> Voir le profil
          </button>
          <button
            onClick={() => {
              onEdit();
              setShowOptions(false); // Fermer les options après l'action
            }}
            className="block px-4 py-2 text-black hover:bg-blue-800 w-full text-left flex items-center"
          >
            <FaEdit className="mr-2" /> Modifier
          </button>
          <button
            onClick={() => {
              onDelete();
              setShowOptions(false); // Fermer les options après l'action
            }}
            className="block px-4 py-2 text-black hover:bg-blue-800 w-full text-left flex items-center"
          >
            <FaTrash className="mr-2" /> Supprimer
          </button>
          <Link
            href="/historique"
            onClick={(e) => {
              // e.preventDefault();
              voirHistorique(enfant);
              setShowOptions(false); // Fermer les options après l'action
            }}
            className="block px-4 py-2 text-black hover:bg-blue-800 w-full text-left flex items-center"
          >
            <FaHistory className="mr-2" /> Historique
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
