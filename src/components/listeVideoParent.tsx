"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateVideoState } from "@/store/slice";
import { RootState, store } from "@/store/store";
import { FaChevronLeft, FaChevronRight, FaClock, FaFrown, FaPlayCircle } from 'react-icons/fa';

interface Video {
  id: string;
  titre: string;
  description: string;
  url: string;
  duree: string;
  couverture: string;
  type_source: number;
  nbre_like: number;
}

interface Categorie {
  id: string;
  titre: string;
  videos: Array<Video>;
}

export default function ListeVideoParent() {
  const [originalCategories, setOriginalCategories] = useState<Categorie[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [resultsFound, setResultsFound] = useState(true);
  const dispatch = useDispatch();

  const videoData = useSelector(
    (state: RootState) => state.AppStates.videoState
  );

  const searchData = useSelector(
    (state: RootState) => state.AppStates.searchState
  );

  const filterCategoriesAndVideos = () => {
    if (!searchData) {
      setCategories(originalCategories);
      setResultsFound(originalCategories.length > 0);
      return;
    }

    const categoriesFilteredByCategoryTitle = originalCategories.filter(category =>
      category.titre.toLowerCase().includes(searchData.toLowerCase())
    );

    if (categoriesFilteredByCategoryTitle.length > 0) {
      setCategories(categoriesFilteredByCategoryTitle);
      setResultsFound(true);
    } else {
      const categoriesWithFilteredVideos = originalCategories.map(category => {
        const filteredVideos = category.videos.filter(video =>
          video.titre.toLowerCase().includes(searchData.toLowerCase())
        );

        return {
          ...category,
          videos: filteredVideos
        };
      }).filter(category => category.videos.length > 0);

      setCategories(categoriesWithFilteredVideos);
      setResultsFound(categoriesWithFilteredVideos.length > 0);
    }
  };

  useEffect(() => {
    filterCategoriesAndVideos();
  }, [searchData]);

  const viewVideo = (v: Video) => {
    dispatch(updateVideoState(v));
    setTimeout(() => {
      console.log(videoData);
    }, 0);
  };

  const parentData = useSelector(
    (state: RootState) => state.AppStates.parentState
  );

  useEffect(() => {
    if (parentData) {
      console.log(parentData);
    }
  }, [parentData]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const categoriesResponse = await fetch(
          "http://127.0.0.1:8000/categorie/allCategories",
          {
            method: "GET",
          }
        );

        if (!categoriesResponse.ok) {
          throw new Error(
            `Erreur lors de la récupération des catégories: ${categoriesResponse.statusText}`
          );
        }

        const categorieData: Categorie[] = await categoriesResponse.json();
        setOriginalCategories(categorieData);
        setCategories(categorieData);
        setResultsFound(categorieData.length > 0);
        console.log(categorieData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setResultsFound(false);
      }
    };

    const fetchTrendingVideos = async () => {
      try {
        const response = await fetch("http://localhost:8000/video/allVideo");
        if (!response.ok) {
          throw new Error("Erreur de réseau");
        }
        const allVideos: Video[] = await response.json();

        // Trier les vidéos par nombre de likes, en ordre décroissant
        const sortedVideos = allVideos.sort((a, b) => b.nbre_like - a.nbre_like);

        // Obtenir les 10 vidéos les plus aimées
        const topVideos = sortedVideos.slice(0, 10);

        // Mettre à jour l'état avec les vidéos tendance
        setTrendingVideos(topVideos);
        setResultsFound(topVideos.length > 0);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos tendances:", error);
        setResultsFound(false);
      }
    };

    fetchAllCategories();
    fetchTrendingVideos();
  }, []);

  return (
    <Provider store={store}>
      <div className="p-8 min-h-screen py-8 font-Grandstander text-white">
        {/* Custom styles for scrollbar */}
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>

        {!resultsFound ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <FaFrown className="text-6xl mb-4 text-black" />
            <p className="text-2xl text-black"> Champion(e), Aucune vidéo n'a été trouvée</p>
          </div>
        ) : (
          <>
            {/* Liste des Catégories */}
            <div className="flex space-x-2 overflow-x-auto p-4 rounded-lg mt-5 shadow-lg mx-10  mb-8 scrollbar-hide">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-40 h-20 rounded-lg bg-purple-500 bg-opacity-25 text-white hover:bg-purple-600 transition duration-300"
                >
                  <div className="text-xl text-white font-bold">
                    {category.titre}
                  </div>
                </div>
              ))}
            </div>

            {/* Liste des Vidéos Tendances */}
            <div className="mx-10 mb-8">
              <h2 className="text-3xl font-semibold text-white mb-4">Liste des vidéos tendances</h2>
              <div className="relative ">
                <button
                  onClick={() =>
                    document.querySelector('.trending-scroll-container')?.scrollBy({
                      left: -300,
                      behavior: 'smooth',
                    })
                  }
                  className="absolute top-1/2 -left-8 transform -translate-y-1/2 text-white p-3 rounded-lg shadow-lg hover:bg-purple-600 transition-transform duration-300 z-10"
                >
                  <FaChevronLeft className="w-6 h-6" />
                </button>

                <div className="trending-scroll-container flex overflow-x-auto space-x-4 p-4 rounded-lg  scrollbar-hide mx-10 mt-10">
                  {trendingVideos.map((video, index) => (
                    <div
                      key={index}
                      className="relative flex-shrink-0 w-60 h-40 rounded-lg overflow-hidden shadow-2xl transform transition duration-500 ease-in-out hover:shadow-3xl hover:rotate-3 hover:bg-orange-400 cursor-pointer hover:scale-105 bg-orange-300"
                      onClick={() => viewVideo(video)}
                    >
                      <Link href="/videoParent">
                        <div className="w-full h-full relative">
                          <img
                            className="w-full h-full object-cover object-center rounded-lg"
                            src={video.couverture}
                            alt={video.titre}
                          />
                           <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-xs flex justify-between items-center">
                        <span className="flex items-center">
                        <FaPlayCircle className="mr-1" />
                           {video.titre}
                          </span>

                          <span className="flex items-center">
                            <FaClock className="mr-1" />
                            {video.duree}
                          </span>
                          
                        </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() =>
                    document.querySelector('.trending-scroll-container')?.scrollBy({
                      left: 300,
                      behavior: 'smooth',
                    })
                  }
                  className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-white p-3 rounded-lg shadow-lg hover:bg-purple-600 transition-transform duration-300 z-10"
                >
                  <FaChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Liste des Vidéos par Catégorie */}
            {categories.map((categorie, index) => (
              <div key={index} className="relative">
                <div className="font-Grandstander text-3xl font-semibold text-white mx-10 mt-10 flex justify-between">
                  <div className="flex">
                    <span>{categorie.titre}</span>
                  </div>
                </div>

                <div className="relative mx-10 mt-6">
                  <button
                    onClick={() =>
                      document.querySelector(`.scroll-container-${categorie.id}`)?.scrollBy({
                        left: -300,
                        behavior: 'smooth',
                      })
                    }
                    className="absolute top-1/2 -left-8 transform -translate-y-1/2 text-white p-3 rounded-lg shadow-lg hover:bg-purple-600 transition-transform duration-300 z-10"
                  >
                    <FaChevronLeft className="w-6 h-6" />
                  </button>

                  <div className={`scroll-container-${categorie.id} flex overflow-x-auto space-x-4 p-4 rounded-lg  scrollbar-hide ml-8`}>
                    {categorie.videos.map((video, index) => (
                      <div
                        key={index}
                        className="relative flex-shrink-0 w-60 h-40 rounded-lg overflow-hidden shadow-2xl transform transition duration-500 ease-in-out hover:shadow-3xl hover:rotate-3 hover:bg-orange-400 cursor-pointer hover:scale-105 bg-orange-300"
                        onClick={() => viewVideo(video)}
                      >
                        <Link href="/videoParent">
                          <div className="w-full h-full relative">
                            <img
                              className="w-full h-full object-cover object-center rounded-lg"
                              src={video.couverture}
                              alt={video.titre}
                            />
                             <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-xs flex justify-between items-center">
                        <span className="flex items-center">
                        <FaPlayCircle className="mr-1" />
                           {video.titre}
                          </span>

                          <span className="flex items-center">
                            <FaClock className="mr-1" />
                            {video.duree}
                          </span>
                          
                        </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      document.querySelector(`.scroll-container-${categorie.id}`)?.scrollBy({
                        left: 300,
                        behavior: 'smooth',
                      })
                    }
                    className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-white p-3 rounded-lg shadow-lg hover:bg-purple-600 transition-transform duration-300 z-10"
                  >
                    <FaChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Provider>
  );
}
