import React, { useEffect, useState } from 'react';
import { Profile } from '../../type';

interface TempsEcran {
    joursA?: string;
    heuresD?: string;
    heuresF?: string;
}

const VoirProfil = ({ onClose, initialProfile }: { onClose: () => void; initialProfile?: Profile }) => {
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
                    throw new Error(`Erreur lors de la récupération du temps d'écran de ${initialProfile?.pseudo}`);
                }

                const data = await tempsEcranResponse.json();
                console.log("Data :", data);
                const tempsEcran = data[0];
                console.log(`Données du temps d'écran de ${initialProfile?.pseudo} : ${JSON.stringify(tempsEcran)}`);
                setTempsEcran(tempsEcran);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };
        fetchTempsEcran();
    }, [initialProfile?.id, initialProfile?.pseudo]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-100">
                <h2 className="text-2xl mb-4 text-blue-800 font-bold">Détails du profil</h2>
                <p className="text-black"><strong>Pseudo:</strong> {initialProfile?.pseudo}</p>
                <p className="text-black"><strong>Âge:</strong> {initialProfile?.age}</p>
                <p className="text-black"><strong>Code PIN:</strong> {initialProfile?.code_pin}</p>
                <p className="text-black"><strong>Jours de connexion:</strong> {tempsEcran?.joursA}</p>
                <p className="text-black"><strong>Heures de connexion:</strong> {`${tempsEcran?.heuresD?.split(".")[0]} - ${tempsEcran?.heuresF?.split(".")[0]}`}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded mx-auto block hover:bg-purple-700 transition duration-300"
                >
                    Fermer
                </button>
            </div>
        </div>
    );
};

export default VoirProfil;
