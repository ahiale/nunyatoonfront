import Image from "next/image";
import { useState } from "react";
export default function Contenu() {
  return (
    <div className="relative bg-gradient-to-r from-purple-700 to-blue-900 bg-opacity-75">
    
        <div className="font-Grandstander text-3xl text-center font-semibold text-black justify-center pt-8 mb-8 ">
          {" "}
          DES CONTENUS VIDEOS 100% ADAPTES AUX ENFANTS DE{" "}
          <span className="text-white"> 05 à 14 ANS</span>{" "}
        </div>
        <div className="bg-white bg-opacity-25 rounded-lg shadow-lg p-8 mx-20">
        <div className="flex justify-center items-center space-x-8">
          {/* Première Carte */}
          <div className="max-w-xs rounded-xl overflow-hidden shadow-2xl bg-gradient-to-r from-purple-400 to-blue-400 transform hover:scale-105 transition duration-500 ease-in-out hover:shadow-3xl hover:rotate-3">
            <img
              className="w-full h-full object-cover"
              src="/images/imageCartoon.jpeg"
              alt="Entertainment"
            />
            <div className="px-4 py-3">
              <div className="font-Grandstander font-bold text-xl mb-2 text-white">
                Divertissement
              </div>
            </div>
          </div>

          {/* Deuxième Carte */}
          <div className="max-w-xs rounded-xl overflow-hidden shadow-2xl bg-gradient-to-r from-purple-400 transform hover:scale-105 transition duration-500 ease-in-out hover:shadow-3xl hover:rotate-3">
            <img
              className="w-full h-full object-cover"
              src="/images/imageEducation.jpeg"
              alt="Movie/Series"
            />
            <div className="px-5 py-2">
              <div className="font-Grandstander font-bold text-2xl mb-1 text-white">
                Films/Series
              </div>
            </div>
          </div>

          {/* Troisième Carte */}
          <div className="max-w-xs rounded-xl overflow-hidden shadow-2xl bg-gradient-to-r from-purple-400 transform hover:scale-105 transition duration-500 ease-in-out hover:shadow-3xl hover:rotate-3">
            <img
              className="w-full h-full object-cover"
              src="/images/imageStory.jpeg"
              alt="Story"
            />
            <div className="px-5 py-2">
              <div className="font-Grandstander font-bold text-2xl mb-1 text-white">
                Histoires
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
