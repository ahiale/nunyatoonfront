"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { RootState, store } from "@/store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { updateVideoState } from "@/store/slice";
import { FaArrowLeft } from "react-icons/fa"; // Import de l'icône de flèche
import { useRouter } from "next/navigation";

const HistoriqueComponent = () => {
  const [historiqueVideos, setHistoriqueVideos] = useState<any[]>([]);
  const enfantData = useSelector(
    (state: RootState) => state.AppStates.enfantState
  );
  const dispatch = useDispatch();

  const videoData = useSelector(
    (state: RootState) => state.AppStates.videoState
  );

  const viewVideo = (v: any) => {
    dispatch(updateVideoState(v));
  
    // Assurez-vous que la mise à jour de l'état a bien eu lieu avant de naviguer
    setTimeout(() => {
      console.log(videoData); // Vérifiez l'état mis à jour
    }, 0);
  };
  const router=useRouter()
  const navigateBack=()=>{
    router.back();
  }
  useEffect(() => {
    const fetchHistoriqueVideos = async () => {
      try {
        if (!enfantData || !enfantData.id) {
          console.error("ID de l'enfant non disponible");
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/video/lire/${enfantData.id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        const data = await response.json();
        console.log("Données récupérées:", data); 
        setHistoriqueVideos(data); 
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchHistoriqueVideos();
  }, [enfantData]);

  return (
    <Provider store={store}>
      <div
        className="min-h-screen bg-cover bg-center font-Grandstander"
        style={{ backgroundImage: 'url(/images/fondBleuNuit.jpg)' }}
      >
        <div className="relative">
          {/* Bouton de retour */}
          <div
            onClick={navigateBack}
            className="absolute top-8 left-8  text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <FaArrowLeft className="w-6 h-6" />
          </div>

          <div className="text-4xl font-semibold text-white text-center pt-8">
            <span className="text-white">HISTORIQUE DES </span>
            <span className="text-yellow-400">VIDEOS</span>
          </div>

          <div className="flex-1 flex p-8">
            {/* Image section */}

            {/* Historique section */}
            <div className="w-2/3 mx-auto flex flex-col items-center">
              {historiqueVideos.length > 0 ? (
                historiqueVideos.map((video, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-500 bg-opacity-25 p-4 rounded-lg shadow-md mb-4 max-h-40" // Réduit la hauteur avec max-h-40
                  >
                    <div className="w-1/6">
                      <img
                        src={video.couverture}
                        alt="Video Image"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>

                    <div className="w-2/3 pl-4">
                      <Link
                        onClick={(e) => {
                          viewVideo(video);
                        }}
                        href="/video"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold mb-3 text-yellow-400"
                      >
                        <span className="text-black font-bold">Titre:</span> {video.titre}
                      </Link>
                      <p className="text-white mb-1">
                        <span className="text-black font-bold">Date:</span> {video.date}
                      </p>
                      <p className="text-white">
                        <span className="text-black font-bold">Description:</span> {video.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white">Aucune vidéo dans l'historique.</p>
              )}
            </div>
          </div>
        </div>
       
      </div>
    </Provider>
  );
};

export default HistoriqueComponent;
