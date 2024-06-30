import Image from "next/image";
export default function Contenu() {
    return (
        <div className="bg-gradient-to-l from-yellow-200 to-yellow-100 " >
            <div className="font-Grandstander text-3xl text-center font-semibold text-black justify-center pt-8 mb-8 "> DES CONTENUS VIDEOS 100% ADAPTES AUX ENFANTS DE <span className="text-red-500"> 05 à 14 ANS</span> </div>

            <div className="flex justify-center items-center space-x-4">
               
               <div className="max-w-xs rounded overflow-hidden shadow-xl bg-orange-300 transform hover:scale-105 transition duration-500 hover:bg-orange-400">
                   <img className="w-full" src="/images/imageCartoon.jpeg" alt="Entertainment"/>
                   <div className="px-5 py-2">
                       <div className=" font-Grandstander font-bold text-2xl mb-1">Divertissement</div>
                       <p className="text-gray-700 text-base">
                           Content 100% adapted for children.
                       </p>
                   </div>
               </div>
           
               <div className="max-w-xs rounded overflow-hidden shadow-xl bg-blue-300 transform hover:scale-105 transition duration-500 hover:bg-blue-400">
                   <img className="w-full" src="/images/imageEducation.jpeg" alt="Movie/Series"/>
                   <div className="px-5 py-2">
                       <div className="font-Grandstander font-bold text-2xl mb-1">Films/Series</div>
                       <p className="text-gray-700 text-base">
                           Content 100% adapted for children.
                       </p>
                   </div>
               </div>
           
               <div className="max-w-xs rounded overflow-hidden shadow-xl bg-red-300 transform hover:scale-105 transition duration-500 hover:bg-red-400">
                   <img className="w-full" src="/images/imageStory.jpeg" alt="Story"/>
                   <div className="px-5 py-2">
                       <div className=" font-Grandstander font-bold text-2xl mb-1">Histoires</div>
                       <p className="text-gray-700 text-base">
                           Content 100% adapted for children.
                       </p>
                   </div>
               </div>
           
           </div>
           
        </div>

    )
}

