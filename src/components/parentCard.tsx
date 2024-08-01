// components/ParentCard.tsx
import React, { useState } from "react";
import Modal from "react-modal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ParentCardProps {
  nom: string;
  codeParental: string;
}

const ParentCard: React.FC<ParentCardProps> = ({ nom, codeParental }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage("");
    setInputCode("");
  };

  const handleCodeSubmit = () => {
    if (inputCode === codeParental) {
      window.location.href = "/parent"; // Replace with actual parent interface URL
    } else {
      setErrorMessage("Code parental erroné. Veuillez réessayer.");
    }
  };

  return (
    <div className="relative flex flex-col items-center space-y-2 transition-transform transform hover:scale-105 duration-300">
      <div
        className="w-32 h-32 lg:w-48 lg:h-48 rounded-md overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={openModal}
      >
        <img
          src="/images/imageParDeafaut.jpeg"
          className="w-full h-full object-cover"
          alt={`Profile image of ${nom}`}
        />
      </div>
      <div className="text-white font-semibold">Parent : {nom}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Code Parental"
        className="flex flex-col items-center bg-gray-100 p-4 rounded shadow-lg max-w-md text-black border-2 border-purple-500"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-lg text-black font-semibold mb-4">Entrer le code parental</h2>
        <input
          type="password"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          className="p-2 rounded mb-4 text-black border-2 border-purple-500 focus:outline-none focus:border-purple-700"
        />
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <div className="flex">
          <button
            onClick={handleCodeSubmit}
            className="bg-purple-600 text-white p-2 rounded mr-2"
          >
            <FaCheckCircle className="h-6 w-6" />
          </button>
          <button
            onClick={closeModal}
            className="bg-red-500 text-white p-2 rounded ml-2"
          >
            <FaTimesCircle className="h-6 w-6" />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ParentCard;
