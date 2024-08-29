"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import Swal from 'sweetalert2';  // Importer SweetAlert2

interface ScreenTimeContextType {
    checkScreenTime: () => void;
    setEnfantId: (id: string) => void;
}

interface ScreenTimeProviderProps {
    children: ReactNode;
}

export const ScreenTimeContext = createContext<ScreenTimeContextType | undefined>(undefined);

export const ScreenTimeProvider = ({ children }: ScreenTimeProviderProps) => {
    const [isScreenTimeExpired, setIsScreenTimeExpired] = useState(false);
    const [isDayExpired, setIsisDayExpired] = useState(false);
    const [isNotstarted, setNotstarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [enfantId, setEnfantId] = useState<string>('');
    const enfantData = useSelector((state: RootState) => state.AppStates.enfantState);

    useEffect(() => {
        if (enfantData && enfantData.id) {
            setEnfantId(enfantData.id);
        }
    }, [enfantData]);

    useEffect(() => {
        if (enfantId) {
            console.log(enfantId)
            const interval = setInterval(() => {
                fetch(`http://127.0.0.1:8000/tempsEcran/check-screen-time/${enfantId}`)
                    .then(response => response.json())                    
                    .then(data => {
                        console.log(data)
                        if(data.status=='not_started')
                        {
                            setNotstarted(true);
                            return;
                        }
                       if (data.status === 'expired') {
                            setIsScreenTimeExpired(true);
                        } else if (data.status === 'daysexpired') {
                            setIsisDayExpired(true);
                        } else if (data.timeLeft <= 10 && data.timeLeft > 0) {
                            setTimeLeft(data.timeLeft);
                        }
                    })
                    .catch(error => {
                        console.error("Erreur lors de la vérification du temps d'écran", error);
                    });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [enfantId]);

    useEffect(() => {
        if (timeLeft !== null && timeLeft > 0) {
            const countdown = setInterval(() => {
                setTimeLeft((prevTime) => (prevTime !== null ? prevTime - 1 : 0));
            }, 1000);

            return () => clearInterval(countdown);
        } else if (timeLeft === 0) {
            setIsScreenTimeExpired(true);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (isNotstarted) {
            Swal.fire({
                title: 'Accès Refusé!',
                text: "votre temps d'ecran n'a pas encore commence.",
                icon: 'warning',
                timer: 5000, // Temps avant la fermeture automatique
                timerProgressBar: true,
                willClose: () => {
                    
                    window.location.href = '/profil'; // Rediriger vers la page de login
                }
            });
            return;
        }
        if (isScreenTimeExpired) {
            Swal.fire({
                title: 'Temps écoulé!',
                text: "Votre session est terminée, vous allez être déconnecté.",
                icon: 'warning',
                timer: 5000, // Temps avant la fermeture automatique
                timerProgressBar: true,
                willClose: () => {
                    localStorage.clear(); // Vider le localStorage
                    window.location.href = '/login'; // Rediriger vers la page de login
                }
            });
        }
        if (isDayExpired) {
            Swal.fire({
                title: 'Accès Refusé!',
                text: "Vous n'êtes pas autorisé à vous connecter aujourd'hui.",
                icon: 'error',
                timer: 5000,
                confirmButtonText: 'OK',
                timerProgressBar: true,
                willClose: () => {
                   
                    window.location.href = '/profil'; // Rediriger vers la page de login
                }
            });
        }
       
    }, [isScreenTimeExpired,isDayExpired, isNotstarted]);

    return (
        <Provider store={store}>
            <ScreenTimeContext.Provider value={{ checkScreenTime: () => {}, setEnfantId }}>
                {children}
                {timeLeft !== null && timeLeft <= 10 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white text-center p-4">
                        <p>Votre session expire dans {timeLeft} secondes.</p>
                    </div>
                )}
            </ScreenTimeContext.Provider>
        </Provider>
    );
};
