
import React, { useEffect, useState } from 'react';

interface Profile {
    pseudo?: string;
    image?: string;
    editPseudo?: string;
    editImage?: string;
    id?: string;
    age?: string;
    code_pin?: string;
}

interface TempsEcran {
    joursA?: string;
    heuresD?: string;
    heuresF?: string;
}

const VoirProfil = ({ onClose, initialProfile }: { onClose: () => void; initialProfile?: Profile}) => {
    const [tempsEcran, setTempsEcran] = useState<TempsEcran>();

    useEffect(() => {
        const fetchTempsEcran = async () => {
            try {
                const tempsEcranResponse = await fetch(
                    `http://127.0.0.1:8000/enfant/${initialProfile?.id}/temps_ecran`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                    }
                );

                if (!tempsEcranResponse.ok) {
                    throw new Error(`Erreur lors de la récupération du temps d'ecran de ${initialProfile?.pseudo}`);
                }

                const data = await tempsEcranResponse.json();
                console.log("Data :", data)
                const tempsEcran = data[0];
                console.log(`Donnees du temps d'ecran de ${initialProfile?.pseudo} : ${JSON.stringify(tempsEcran)}`);
                setTempsEcran(tempsEcran);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };
        fetchTempsEcran();
    }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Détails du profil</h2>
        <p><strong>Pseudo:</strong> {initialProfile?.pseudo}</p>
        <p><strong>Âge:</strong> {initialProfile?.age}</p>
        <p><strong>Code PIN:</strong> {initialProfile?.code_pin}</p>
        <p><strong>Jours de connexion:</strong> {tempsEcran?.joursA}</p>
        <p><strong>Heures de connexion:</strong> {`${tempsEcran?.heuresD?.split(".")[0]} - ${tempsEcran?.heuresF?.split(".")[0]}`}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default VoirProfil;
