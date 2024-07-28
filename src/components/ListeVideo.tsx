"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface Categorie {
  id: string;
  titre: string;
  videos: Array<Video>;
  // categorie: any[];
}

interface Video {
  id: string;
  titre: string;
  description: string;
  url: string;
  duree: string;
  // categorie: any[];
}

export default function ListeVideo() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

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
    <div className=" bg-yellow-200 p-8 min-h-screen py-8 font-Grandstander ">
    
<div className="flex space-x-2 overflow-x-auto p-4 rounded-lg mt-10 bg-white bg-opacity-25 ml-10 mr-10 ">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-40 h-20 rounded-lg bg-gray-200 text-black hover:bg-gray-300 transition duration-300"
          >
            <div className="text-xl">{category.titre}</div>
          </div>
        ))}
      </div>


      {categories.map((categorie, index) => (
        <div key={index}>
          <div className="font-Grandstander text-3xl font-semibold text-black mx-10 mt-10  flex justify-between">
            <div className="flex">
              <span className="">{categorie.titre}</span>
            </div>
          </div>

          {categorie.videos.map((video, index) => (

            <div className="inline-block ml-10 mr-10" >
            <div key={index} className="flex flex-wrap items-left  mb-8 space-x-4 gap-x-1" >
              <Link href="">
                <div className=" w-60 rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500 bg-orange-300 hover:bg-orange-400 m-2 cursor-pointer">
                  <img
                    className="w-full"
                    src="/images/imageCartoon.jpeg"
                    alt="Entertainment"
                  />
                  
                </div>
              </Link>
              {/* <div className="max-w-xs w-64 rounded overflow-hidden shadow-xl bg-red-300 transform hover:scale-105 transition duration-500 hover:bg-red-400 m-2">
            <img className="w-full" src="/images/imageStory.jpeg" alt="Story" />
          </div> */}
            </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
