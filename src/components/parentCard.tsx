import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { updateParentState } from '@/store/slice';
import Link from 'next/link';

interface Enfant {
  id: string;
  pseudo: string;
  image: string;
  age: number;
  code_pin: string;
  historique_video: [];
  parent_id: string;
}

interface Profile {
  id: string;
  nom: string;
  age: number;
  motDePasse: string;
  pays: string;
  contact: string;
  email: string;
  codeParental: string;
  historique_video: [];
  children: Enfant[];
}

interface ParentCardProps {
  profile: Profile;
}

const ParentCard: React.FC<ParentCardProps> = ({ profile }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage("");
    setInputCode("");
  };

  const parentData = useSelector((state: RootState) => state.AppStates.parentState);
  console.log(profile)
  console.log(parentData)

  const handleCodeSubmit = (pro: Profile, e: React.MouseEvent) => {
    if (inputCode === profile.codeParental) {
      dispatch(updateParentState(pro));
      setErrorMessage("");
    } else {
      e.preventDefault(); // Prevent navigation
      setErrorMessage("Code Parental erroné. Veuillez réessayer.");
    }
  };
  console.log(profile)

  return (
    <Provider store={store}>
      <div className="relative flex flex-col items-center space-y-2 transition-transform transform hover:scale-105 duration-300">
        <div
          className="w-32 h-32 lg:w-48 lg:h-48 rounded-md overflow-hidden flex items-center justify-center cursor-pointer"
          onClick={openModal}
        >
          <img
            src="/images/imageParDeafaut.jpeg"
            className="w-full h-full object-cover"
            alt="Profile"
          />
        </div>
        <div className="text-white font-semibold">Parent : {profile.nom}</div>
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
            <Link href="/parent">
              <div
                onClick={(e) => handleCodeSubmit(profile, e)}
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

export default ParentCard;
