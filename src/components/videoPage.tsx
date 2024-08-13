"use client";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/store/store";
import { useDispatch } from "react-redux";
import { updateVideoState } from "@/store/slice";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VideoPage() {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
 
  const videoData = useSelector(
    (state: RootState) => state.AppStates.videoState
  );
  const enfantData = useSelector(
    (state: RootState) => state.AppStates.enfantState
  );

  const fetchData = async () => {
    try {
      const responseConsult = await fetch(`http://127.0.0.1:8000/video/${videoData.id}/${enfantData.id}/consulter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseConsult.ok) {
        throw new Error(`Erreur lors de la consultation de la vidéo: ${responseConsult.statusText}`);
      }

      const resultConsult = await responseConsult.json();
      console.log("Consultation réussie:", resultConsult);

      // setLikesCount(Number(resultConsult.likesCount) || 0); // Assurez-vous que likesCount est bien un nombre

      const responseLike = await fetch(`http://127.0.0.1:8000/video/video/${videoData.id}/${enfantData.id}/like_status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseLike.ok) {
        throw new Error(`Erreur lors de la récupération du statut du like: ${responseLike.statusText}`);
      }

      const resultLike = await responseLike.json();
      console.log(resultLike)
      resultLike.liked? setLiked(true): setLiked(false);
      // console.log("liked?", resultLike.liked)
      console.log(videoData.nbre_like)
    } catch (error) {
      console.error("Erreur lors de la consultation de la vidéo:", error);
    }
  };

  const navigateBack=()=>{
    router.back();
  }
  useEffect(() => {
   
    if (videoData && enfantData && videoData.id && enfantData.id) {
      console.log(videoData)
      fetchData();
    }
  }, [videoData, enfantData,liked]);


  const handleLike = async () => {
    try {
      const responselike = await fetch(`http://127.0.0.1:8000/video/${videoData.id}/${enfantData.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
        
      const response = await fetch(`http://127.0.0.1:8000/video/edit/${videoData.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nbre_like: videoData.nbre_like + 1,
          
        }),
      });
      if (!responselike.ok) {
        throw new Error(`Erreur lors de la mise à jour du like: ${responselike.statusText}`);
      }
      const r = await responselike.json();
      // console.log(enfantData.id)
      // console.log(videoData.id)
      console.log(r)
      setLiked(r.like);
      console.log("liked?", r.like)
      console.log("like",liked)
      // Ensure state is updated before dispatching
      const nb_lik = r.like ? videoData.nbre_like + 1 : videoData.nbre_like -1;

      dispatch(updateVideoState({
        id: videoData.id,
        titre: videoData.titre,
        description: videoData.description,
        url: videoData.url,
        duree: videoData.duree,
        couverture: videoData.couverture,
        type_source: videoData.type_source,
        nbre_like: nb_lik,
      }));


    } catch (error) {
      console.error("Erreur lors de la mise à jour du like:", error);
    }
  };
 
  return (
    <Provider store={store}>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/images/fondBleuNuit.jpg)" }}
      >
        <div
            onClick={navigateBack}
            className="absolute top-8 left-8  text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <FaArrowLeft className="w-6 h-6" />
          </div>

        <div className="flex items-center justify-center p-12">
          <div className="relative max-w-4xl mx-auto flex items-center space-x-4 mt-12">
           
            <div className="relative w-3/3">
              <div className="relative">
                <video
                  controls
                  controlsList="nodownload"
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                  src={videoData.url}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="m-2 font-Grandstander mt-4">
                <div className="text-white font-bold text-2xl">
                  <span className="font-bold text-black">Titre :</span> {videoData.titre}
                </div>
                <p className="text-white">
                  <span className="font-bold text-black">Description :</span> {videoData.description}
                </p>
              </div>
              <br />
              <br />
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <button
                  onClick={handleLike}
                  className={`relative group transform transition-transform duration-300 ${
                    liked ? "scale-125 text-red-500" : "text-gray-500"
                  }`}
                >
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {liked ? "Unlike" : "Like"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill={liked==true? "red" : "none"}
                    stroke="red"
                    strokeWidth="2"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <span className="text-white ml-2">{videoData.nbre_like}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}
