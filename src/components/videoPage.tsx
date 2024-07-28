"use client";
import { useState } from 'react';

export default function VideoPage() {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <div className="bg-gradient-to-l from-yellow-200 to-yellow-100 h-screen flex items-center justify-center p-8">
            <div className="relative max-w-4xl mx-auto flex items-center space-x-4">
                <div className="w-2/2"> {/* Agrandit l'image à un tiers de la largeur totale */}
                    <img
                        src="/images/videoImage.png" // Remplacez par le chemin de votre image
                        alt="Image description"
                        className=" w-full h-auto"
                    />
                </div>
                <div className="relative w-2/3"> {/* Réduit la vidéo à deux tiers de la largeur totale */}
                    <div className="relative">
                        <video
                            controls
                            className="rounded-lg shadow-lg w-full h-96 object-cover"
                            // src={video.url}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="m-2 font-Grandstander mt-4">
                        <div className="text-purple-600 font-bold text-2xl">
                            <span className="font-bold text-black">Titre :</span> les aventures de Lya
                        </div>
                        <p className="text-gray-700">
                            <span className="font-bold text-black">Description :</span> C'est l'histoire d'une jeune fille du nom de Lya qui vivait dans la forêt, elle vivait des aventures incroyables dans la forêt avec les animaux.
                        </p>
                    </div> <br></br> <br></br>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                        <button
                            onClick={handleLike}
                            className={`relative group transform transition-transform duration-300 ${liked ? 'scale-125 text-red-500' : 'text-gray-500'}`}
                        >
                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">Like</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
