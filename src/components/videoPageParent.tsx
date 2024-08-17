import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/store/store";
import { useDispatch } from "react-redux";
import {
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function VideoPageParent() {
  const [selectedReason, setSelectedReason] = useState("");
  const [showReportOptions, setShowReportOptions] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const videoData = useSelector(
    (state: RootState) => state.AppStates.videoState
  );

  const parentData = useSelector(
    (state: RootState) => state.AppStates.parentState
  );

  const navigateBack = () => {
    router.back();
  };

  useEffect(() => {
    if (parentData) {
      console.log("parentData", parentData);
    }
  }, [parentData]);

  console.log("videoData", videoData);
  console.log(videoData.id);

  const handleReportClick = () => {
    setShowReportOptions(!showReportOptions);
  };

  const handleReasonChange = (event: any) => {
    setSelectedReason(event.target.value);
  };

  const handleSendReport = async () => {
    if (selectedReason) {
      const parent_id = parentData.id;
      const video_id = videoData.id;
      const interested = true;
      const motif = selectedReason;

      try {
        const response = await fetch(
          `http://localhost:8000/video/update-interest/${parent_id}/${video_id}/${interested}/${motif}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log(`Vidéo signalée pour la raison : ${selectedReason}`);
          // Réinitialiser après l'envoi
          setShowReportOptions(false);
          setSelectedReason("");
          const avis = await response.json();
          console.log(avis);

          // Afficher le message de succès
          Swal.fire({
            title: "Succès!",
            text: "Votre signalement a été envoyé avec succès.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          console.error("Erreur lors de l'envoi du rapport");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi du rapport:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowReportOptions(false);
    setSelectedReason("");
  };

  return (
    <Provider store={store}>
      <div
        className="min-h-screen bg-cover bg-center font-Grandstander flex flex-col items-center justify-center relative"
        style={{ backgroundImage: "url(/images/fondBleuNuit.jpg)" }}
      >
        <div
          onClick={navigateBack}
          className="absolute top-8 left-8 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          <FaArrowLeft className="w-6 h-6" />
        </div>

        <div className="flex flex-col items-center justify-center w-full p-8">
          <div className="relative w-full max-w-2xl">
            <div className="relative">
              <video
                controls
                controlsList="nodownload"
                className="rounded-lg shadow-lg w-full h-70 object-cover"
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
            <div className="mt-4 bg-red-600 bg-opacity-75 hover:bg-red-600 p-2 rounded-lg">
              <button
                onClick={handleReportClick}
                className="font-semi-bold flex items-center hover:text-white pt-1"
              >
                <FaExclamationTriangle className="ml-2 w-4 h-4 mr-2" />
                Signaler cette vidéo
              </button>

              {/* Modal de signalement */}
              {showReportOptions && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <label
                      htmlFor="reason"
                      className="block text-black font-bold mb-2"
                    >
                      Choisissez une raison
                    </label>
                    <select
                      id="reason"
                      value={selectedReason}
                      onChange={handleReasonChange}
                      className="w-full text-black p-2 rounded-lg bg-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
                    >
                      <option
                        value=""
                        className="bg-white bg-opacity-25 text-black"
                      >
                        Sélectionner une raison
                      </option>
                      <option
                        value="Contenu inapproprié pour mes enfants"
                        className="bg-white bg-opacity-75 text-black"
                      >
                        Contenu inapproprié pour mes enfants
                      </option>
                      <option
                        value="Harcèlement ou intimidation"
                        className="bg-white bg-opacity-75 text-black"
                      >
                        Harcèlement ou intimidation
                      </option>
                      <option
                        value="Contenu inintéressant"
                        className="bg-white bg-opacity-75 text-black"
                      >
                        Contenu inintéressant
                      </option>
                      <option
                        value="Par envie"
                        className="bg-white bg-opacity-75 text-black"
                      >
                        Par envie
                      </option>
                    </select>

                    <div className="flex justify-center mt-4 space-x-2">
                      <button
                        onClick={handleSendReport}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      >
                        Envoyer
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-500 transition-colors duration-300"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}
