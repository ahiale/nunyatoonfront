"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateEnfantState } from "@/store/slice";
import { RootState, store } from "@/store/store";
import Link from "next/link";

interface Enfant {
  id: string;
  pseudo: string;
  image: string;
  age: number;
  code_pin: string;
  historique_video: [];
  parent_id: string;
}

interface EnfantCardProps {
  enfant: Enfant;
}

const EnfantCard: React.FC<EnfantCardProps> = ({ enfant }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const couleurs = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  // Calculer une valeur numérique à partir de l'ID de l'enfant
  const couleurIndex =
    enfant.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    couleurs.length;
  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage("");
    setInputCode("");
  };

  const enfantData = useSelector(
    (state: RootState) => state.AppStates.enfantState
  );

  const handleCodeSubmit = (enf: Enfant, e: React.MouseEvent) => {
    if (inputCode === enfant.code_pin) {
      dispatch(updateEnfantState(enf));
      setErrorMessage("");
    } else {
      e.preventDefault(); // Prevent navigation
      setErrorMessage("Code PIN erroné. Veuillez réessayer.");
    }
  };

  return (
    <Provider store={store}>
      <div className="relative flex flex-col items-center space-y-2 transition-transform transform hover:scale-105 duration-300">
        <div
          className="w-20 h-20 lg:w-28 lg:h-28 rounded-md overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={openModal}
        >
          <div
            className={`w-full h-full flex items-center justify-center ${
              enfant.image ? "" : couleurs[couleurIndex]
            } text-white text-5xl font-bold`}
          >
            {enfant.image ? (
              <img
                src={enfant.image}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            ) : (
              <span>{enfant.pseudo.charAt(0).toUpperCase()}</span>
            )}
          </div>
        </div>
        <div className="text-white font-semibold">
          {" "}
          Enfant : {enfant.pseudo}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Code PIN"
          className="flex flex-col items-center bg-gray-100 p-4 rounded shadow-lg max-w-md text-black border-2 border-purple-500"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
        >
          <h2 className="text-lg text-black font-semibold mb-4">
            Entrer le code PIN
          </h2>
          <input
            type="password"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="p-2 rounded mb-4 text-black border-2 border-purple-500 focus:outline-none focus:border-purple-700"
          />
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <div className="flex">
            <Link href="/enfant">
              <div
                onClick={(e) => handleCodeSubmit(enfant, e)}
                className="bg-purple-600 text-white p-2 rounded mr-2"
              >
                <FaCheckCircle className="h-6 w-6" />
              </div>
            </Link>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 rounded ml-2"
            >
              <FaTimesCircle className="h-6 w-6" />
            </button>
          </div>
        </Modal>
      </div>
    </Provider>
  );
};

export default EnfantCard;
