"use client";
import React, { useEffect, useState } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import Modal from "react-modal";
const EnfantsCard: React.FC<{ children: any[] }> = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [inputPin, setInputPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = (child: any) => {
    setSelectedChild(child);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedChild(null);
    setInputPin("");
    setErrorMessage("");
  };

  const handlePinSubmit = () => {
    if (selectedChild && inputPin === selectedChild.code_pin) {
      window.location.href = `/child/${selectedChild.id}`; // Replace with actual child interface URL
    } else {
      setErrorMessage("Code PIN incorrect. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {children.map((child, childIndex) => (
        <div key={childIndex} className="m-4 p-4 bg-white rounded-lg shadow-lg w-32 h-32 cursor-pointer" onClick={() => openModal(child)}>
          <div className="w-full h-24">
            <img src={child.image == null || child.image=="" ? "/images/imageParDefaut.jpeg" : child.image} className="w-full h-full object-cover" />
          </div>
          <div className="w-full flex justify-center items-center bg-yellow-500 h-8">
            <h3 className="text-black font-semibold">{child.pseudo}</h3>
          </div>
        </div>
      ))}

      {selectedChild && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Code PIN"
          className="flex flex-col items-center bg-gray-200 p-4 rounded shadow-lg max-w-md text-black"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-lg text-black font-semibold mb-4">Entrer le code PIN</h2>
          <input
            type="password"
            value={inputPin}
            onChange={(e) => setInputPin(e.target.value)}
            className=" p-2 rounded mb-4 text-black"
          />
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <div className="overflow-x">
            <button
              onClick={handlePinSubmit}
              className="bg-green-600 text-white p-1 rounded  mr-2"
            >
              <RiCheckboxCircleFill className="h-09 w-10" />
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-1 rounded  ml-2"
            >
              <IoMdCloseCircle className="h-09 w-10" />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default EnfantsCard;