"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider, useDispatch, UseDispatch } from "react-redux";
import { updateVideoState } from "@/store/slice";
import { RootState, store } from "@/store/store";
import { useSelector } from "react-redux";


interface Categorie {
  id: string;
  titre: string;
  videos: Array<Video>;
}

interface Video {
  id: string;
  titre: string;
  description: string;
  url: string;
  duree: string;
  couverture: string;
}

export default function ListeVideo() {
  const [categories, setCategories] = useState<Categorie[]>([]);
 const dispatch = useDispatch()

 const videoData = useSelector(
  (state:RootState) => state.AppStates.videoState
)
  const viewVideo = (v:Video) =>{
    
    dispatch(updateVideoState(v));
  
    // Assurez-vous que la mise à jour de l'état a bien eu lieu avant de naviguer
    setTimeout(() => {
      console.log(videoData); // Vérifiez l'état mis à jour
      // window.location.href = "/video";
    }, 0);
  }

  useEffect(() => {
    const fetchallCategories = async () => {
      try {
        const categoriesResponse = await fetch(
          "http://127.0.0.1:8000/categorie/allCategories",
          {
            method: "GET",
          }
        );

        if (!categoriesResponse.ok) {
          throw new Error(
            `Erreur lors de la récupération des categories: ${categoriesResponse.statusText}`
          );
        }

        const categorieData: Categorie[] = await categoriesResponse.json();
        setCategories(categorieData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchallCategories();
  }, []);

  return (
    <Provider store={store}>
<div className="p-8 min-h-screen py-8 font-Grandstander text-white">
      <div className="flex space-x-2 overflow-x-auto p-4 rounded-lg mt-5 shadow-lg mx-10">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-40 h-20 rounded-lg bg-blue-800 bg-transparent text-white hover:bg-blue-600 transition duration-300"
          >
            <div className="text-xl">{category.titre}</div>
          </div>
        ))}
      </div>

      {categories.map((categorie, index) => (
        <div key={index}>
          <div className="font-Grandstander text-3xl font-semibold text-white mx-10 mt-10 flex justify-between">
            <div className="flex">
              <span>{categorie.titre}</span>
            </div>
          </div>

          <div className="relative mx-10 mt-6">
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
              {categorie.videos.map((video, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-60 rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 bg-orange-300 hover:bg-orange-400 cursor-pointer"
                >
                  <Link href="/video" onClick={(e) => {
                      // e.preventDefault(); // Si vous souhaitez empêcher le comportement par défaut
                      viewVideo(video);
                    }}>
                    <img
                        className="w-full"
                        src={video.couverture}
                        alt={video.titre}
                      />
                    
                  </Link>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                document.querySelector('.overflow-x-auto')?.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={() => {
                document.querySelector('.overflow-x-auto')?.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              &gt;
            </button>
          </div>
        </div>
      ))}
    </div>
    </Provider>
  );
}
