"use client";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/store/store";
import { useDispatch } from "react-redux";
import { updateVideoState } from "@/store/slice";
import { FaArrowLeft, FaFlag } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VideoPageParent() {
  const [selectedReason, setSelectedReason] = useState("");
  const [showReportOptions, setShowReportOptions] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const videoData = useSelector(
    (state: RootState) => state.AppStates.videoState
  );

  const navigateBack = () => {
    router.back();
  };

  const parentData = useSelector(
    (state: RootState) => state.AppStates.parentState
  );
  useEffect(() => {
    if (parentData) {
      {
        console.log("parentData", parentData);
      }
    }
  }, [parentData]);

  console.log("videoData", videoData);

  const handleReportClick = () => {
    setShowReportOptions(!showReportOptions);
  };

  const handleReasonChange = (event: any) => {
    setSelectedReason(event.target.value);
  };

  const handleSendReport = () => {
    if (selectedReason) {
      // Logique pour envoyer le rapport avec la raison sélectionnée
      console.log(`Vidéo signalée pour la raison : ${selectedReason}`);
      // Réinitialiser après l'envoi
      setShowReportOptions(false);
      setSelectedReason("");
    }
  };

  const handleCancel = () => {
    setShowReportOptions(false);
    setSelectedReason("");
  };

  return (
    <Provider store={store}>
      <div
        className="min-h-screen bg-cover bg-center font-Grandstander"
        style={{ backgroundImage: "url(/images/fondBleuNuit.jpg)" }}
      >
        <div
          onClick={navigateBack}
          className="absolute top-8 left-8  text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          <FaArrowLeft className="w-6 h-6" />
        </div>

        <div className="flex items-center justify-center p-8">
          <div className="relative max-w-4xl mx-auto flex items-center space-x-4">
            <div className="w-2/2">
              <img
                src="/images/videoImage.png"
                alt="Image description"
                className="w-full h-auto"
              />
            </div>
            <div className="relative w-2/3">
              <div className="relative">
                <video
                  controls
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                  src={videoData.url}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="m-2 font-Grandstander mt-4">
                <div className="text-white font-bold text-2xl">
                  <span className="font-bold text-black">Titre :</span>{" "}
                  {videoData.titre}
                </div>
                <p className="text-white">
                  <span className="font-bold text-black">Description :</span>{" "}
                  {videoData.description}
                </p>
              </div>

              {/* Bouton Signaler */}
              <div className="mt-4">
                <button
                  onClick={handleReportClick}
                  className="text-white font-semi-bold hover:text-red"
                >
                  <FaFlag className="ml-2 w-5 h-5" />
                  Signaler cette vidéo
                </button>
                {/* Options de signalement */}
                {showReportOptions && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="w-full max-w-md bg-purple-600 bg-opacity-50 p-4 rounded-lg shadow-lg">
                      <label
                        htmlFor="reason"
                        className="block text-black font-bold mb-2"
                      >
                        Raison :
                      </label>
                      <select
                        id="reason"
                        value={selectedReason}
                        onChange={handleReasonChange}
                        className="w-full text-black p-2 border rounded-lg"
                      >
                        <option value="">Sélectionner une raison</option>
                        <option value="Contenu inapproprié">
                          Contenu inapproprié
                        </option>
                        <option value="Harcèlement ou intimidation">
                          Harcèlement ou intimidation
                        </option>
                        <option value="Violence explicite">
                          Violence explicite
                        </option>
                        <option value="Contenu choquant ou dégoûtant">
                          Contenu choquant ou dégoûtant
                        </option>
                        <option value="Infraction aux droits d'auteur">
                          Infraction aux droits d'auteur
                        </option>
                        <option value="Autre">Autre</option>
                      </select>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={handleSendReport}
                          className="mr-2 bg-blue-600 text-white p-1 rounded-lg hover:bg-red-600 transition-colors duration-300"
                        >
                          Envoyer
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <br />
                <br />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}
