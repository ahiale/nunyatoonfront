import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Profile } from '../../type';

// Déclaration du type Profile
// type Profile = {
//   id?: number; // Assurez-vous que c'est un nombre
//   pseudo?: string;
//   image?: string;
// };

type DeleteConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
  initialProfile?: Profile; // Assurez-vous que ce type correspond à la définition
};

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, onCancel, initialProfile }) => {
  const handleConfirm = async () => {
    if (!initialProfile?.id) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/enfant/delete/${initialProfile.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du profil');
      }

      // Suppression réussie, mettre à jour l'interface utilisateur en conséquence
      onConfirm();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-200 p-4 rounded-lg w-full max-w-xs">
        <h2 className="text-xl mb-4 font-bold">Êtes-vous sûr?</h2>
        <div className="flex space-x-4 justify-center items-center">
          <button onClick={handleConfirm} className="p-2 bg-purple-600 text-white rounded flex items-center">
            <FaCheckCircle className="h-4 w-4 mr-2" />
            Confirmer
          </button>
          <button onClick={onCancel} className="p-2 bg-red-600 text-white rounded flex items-center">
            <FaTimesCircle className="h-4 w-4 mr-2" />
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
