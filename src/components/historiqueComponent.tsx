"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { RootState, store } from "@/store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { updateVideoState } from "@/store/slice";
import { FaArrowLeft, FaFrown, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Loader from "./loader";


const HistoriqueComponent = () => {
  const [historiqueVideos, setHistoriqueVideos] = useState<any[]>([]);
  const [dateDebut, setDateDebut] = useState<string>("");
  const [dateFin, setDateFin] = useState<string>("");
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Gestion du loader

  const aujourdHui = new Date().toISOString().split("T")[0]; // Date d'aujourd'hui

  const enfantData = useSelector(
    (state: RootState) => state.AppStates.enfantState
  );
  const dispatch = useDispatch();
  const videoData = useSelector(
    (state: RootState) => state.AppStates.videoState
  );

  const groupVideosByDate = (videos: any[]) => {
    return videos.reduce((acc, video) => {
      const dateKey = new Date(video.date).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(video);
      return acc;
    }, {} as { [date: string]: any[] });
  };

  const viewVideo = (v: any) => {
    dispatch(updateVideoState(v));
    setTimeout(() => {
      console.log(videoData); // Vérifiez l'état mis à jour
    }, 0);
  };

  const router = useRouter();
  const navigateBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchHistoriqueVideos = async () => {
      try {
        if (!enfantData || !enfantData.id) {
          console.error("ID de l'enfant non disponible");
          return;
        }

        const response = await fetch(
          `http://127.0.0.1:8000/video/lire/${enfantData.id}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        const data = await response.json();
        console.log("Données récupérées:", data);

        // Limiter à 30 vidéos
        const limitedVideos = data.slice(0, 30);
        setHistoriqueVideos(limitedVideos);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchHistoriqueVideos();
  }, [enfantData]);

  useEffect(() => {
    if (dateDebut && dateFin) {
      const filtered = historiqueVideos.filter((video: any) => {
        const videoDate = new Date(video.date);
        const startDate = new Date(dateDebut);
        const endDate = new Date(dateFin);
        return videoDate >= startDate && videoDate <= endDate;
      });
      setFilteredVideos(filtered);
      setNoResults(filtered.length === 0);
    } else {
      setFilteredVideos(historiqueVideos);
      setNoResults(false); // Réinitialiser l'état de message d'aucun résultat
    }
  }, [dateDebut, dateFin, historiqueVideos]);

  const groupedVideos = groupVideosByDate(filteredVideos);

  return (
    <Provider store={store}>
      <div
        className="min-h-screen bg-cover bg-center font-Grandstander"
        style={{ backgroundImage: "url(/images/fondBleuNuit.jpg)" }}
      >
          {loading && <Loader />}
        <div className="relative">
          <div
            onClick={navigateBack}
            className="absolute top-8 left-8 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <FaArrowLeft className="w-6 h-6" />
          </div>

          <div className="text-4xl font-semibold text-white text-center pt-8">
            <span className="text-white">HISTORIQUE DES </span>
            <span className="text-yellow-400">VIDEOS</span>
          </div>

         
            <div className="flex flex-col items-center p-4">
              <div className="flex items-center space-x-4 mb-4">
                <input
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  placeholder="Date de début"
                  max={dateFin ? dateFin : aujourdHui} // Date de fin ou aujourd'hui comme maximum
                  className="p-2 border rounded bg-blue-600 bg-opacity-25 text-black border-blue-300 focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="date"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                  placeholder="Date de fin"
                  min={dateDebut} // La date de début est le minimum
                  className="p-2 border rounded bg-blue-600 bg-opacity-25 text-black border-blue-300 focus:border-blue-600 focus:outline-none"
                />

                <button
                  onClick={() => {}}
                  className="bg-transparent text-white p-2 border rounded flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <FaSearch className="w-6 h-6" />
                </button>
              </div>

              {noResults && (
                <div className="text-red-500 font-semibold text-lg mt-4">
                  <FaFrown className="text-6xl mb-4 text-black" />
                  Aucun résultat trouvé pour les dates sélectionnées.
                </div>
              )}
            </div>
          

          <div className="flex-1 flex p-8">
            <div className="w-2/3 mx-auto flex flex-col items-center">
              {Object.entries(groupedVideos).length > 0
                ? Object.entries(groupedVideos)
                    .slice(0, 30)
                    .map(([date, videos], index) => (
                      <div key={index} className="w-full">
                        <h2 className="text-2xl text-yellow-400 font-bold mb-6 mt-4">
                          {date}
                        </h2>
                        {(videos as any[]).map((video, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center bg-blue-500 bg-opacity-25 p-4 rounded-lg shadow-md mb-4 max-h-40"
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
                                onClick={() => viewVideo(video)}
                                href="/video"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl font-semibold mb-3 text-yellow-400"
                              >
                                <span className="text-black font-bold">
                                  Titre:
                                </span>{" "}
                                {video.titre}
                              </Link>
                              <p className="text-white mb-1">
                                <span className="text-black font-bold">
                                  Heure:
                                </span>{" "}
                                {new Date(video.date).toLocaleTimeString(
                                  "fr-FR",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>

                              <p className="text-white">
                                <span className="text-black font-bold">
                                  Description:
                                </span>{" "}
                                {video.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                : !noResults && (
                    <p className="text-white">
                      Aucune vidéo dans l'historique.
                    </p>
                  )}
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default HistoriqueComponent;
