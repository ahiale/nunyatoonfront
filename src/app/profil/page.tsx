"use client";
import LogoutButton from "@/components/LogoutButton";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Modal from "react-modal";

interface Profile {
  nom: string;
  id: string;
  motDePasse: string;
  contact: string | null;
  codeParental: string;
  historique_video: string[] | null;
  age: number;
  pays: string;
  email: string;
  nbre_profil: number | null;
  maxProfilEnfant: number;
  children: any[];
}

const defaultProfile: Profile = {
  nom: "kodjqq",
  id: "169d1be6-4b20-4a45-9830-0b6be9",
  motDePasse: "$pbkdf2-sha256$29000$2jtnrDXmvNfae6815nzv3Q$ynG7joT8Rz10Ir8EOlRLrik71mHJIrSntue/fH1o2tc",
  contact: null,
  codeParental: "5678",
  historique_video: null,
  age: 30,
  pays: "Benin",
  email: "koda@gmail.com",
  nbre_profil: null,
  maxProfilEnfant: 3,
  children: [],
};

const ParentCard: React.FC<Profile> = ({
  nom,
  codeParental,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

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
        className={`w-32 h-32 lg:w-48 lg:h-48 rounded-md overflow-hidden flex items-center justify-center cursor-pointer`}
        onClick={openModal}
      >
        <img
          src="/images/imageParDeafaut.jpeg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-white font-semibold"> Parent : {nom}</div>
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

const EnfantCard: React.FC<{ pseudo: string; image: string; codePin: string }> = ({ pseudo, image, codePin }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setErrorMessage("");
    setInputCode("");
  };

  const handleCodeSubmit = () => {
    if (inputCode === codePin) {
      window.location.href = "/enfant"; // Replace with actual child platform URL
    } else {
      setErrorMessage("Code PIN erroné. Veuillez réessayer.");
    }
  };

  return (
    <div className="relative flex flex-col items-center space-y-2 transition-transform transform hover:scale-105 duration-300">
      <div
        className="w-20 h-20 lg:w-28 lg:h-28 rounded-md overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={openModal}
      >
        <img
          src={image ? image : "/images/imageParDeafaut.jpeg"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-white font-semibold"> Enfant : {pseudo}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Code PIN"
        className="flex flex-col items-center bg-gray-100 p-4 rounded shadow-lg max-w-md text-black border-2 border-purple-500"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-lg text-black font-semibold mb-4">Entrer le code PIN</h2>
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

const Profiles: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [parentWithChildren, setParentWithTheirChildren] = useState<any[]>([]);

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const tokenPayload = token.split(".")[1];
          const decodedPayload = atob(tokenPayload);
          const parsedPayload = JSON.parse(decodedPayload);
          const parentId = parsedPayload.parent_id;
          const response = await fetch(
            `http://127.0.0.1:8000/parent/get/${parentId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            const responseParent = data;
            localStorage.setItem("connectedUser", JSON.stringify(responseParent));
            setProfile(responseParent);
          } else {
            console.error("Error fetching parent data:", response.statusText);
          }
        } else {
          console.error("Token not found.");
        }
      } catch (error) {
        console.error("Error fetching parent data:", error);
      }
    };

    const fetchParentWithTheirChildrenData = async () => {
      const enfants = await fetch(
        `http://127.0.0.1:8000/enfant/read_all_enfants`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const parent = localStorage.getItem("connectedUser");
      if (parent) {
        const parentJSON = JSON.parse(parent);
        const connectedParent = await fetch(
          `http://127.0.0.1:8000/parent/get/${parentJSON.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
          }
        );
        const enfantsToJson = await enfants.json();
        const connectedParentJson = await connectedParent.json();
        const parentWithChildren = {
          ...connectedParentJson,
          children: enfantsToJson.filter(
            (enfant: { parent_id: string }) => enfant.parent_id === connectedParentJson.id
          ),
        };
        setParentWithTheirChildren([parentWithChildren]);
      }
    };

    fetchParentData();
    fetchParentWithTheirChildrenData();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center space-y-8 p-8 font-Grandstander w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/fondBleuNuit.jpg)' }}
    >
      <h1 className="text-5xl lg:text-5xl font-bold text-white mb-8">
        Quel est votre profil?
      </h1>
      <div className="flex space-x-4 lg:space-x-8">
        <ParentCard
          key={profile.id}
          nom={profile.nom}
          id={profile.id}
          motDePasse={profile.motDePasse}
          age={profile.age}
          contact={profile.contact}
          email={profile.email}
          codeParental={profile.codeParental}
          pays={profile.pays}
          nbre_profil={profile.nbre_profil}
          maxProfilEnfant={profile.maxProfilEnfant}
          historique_video={profile.historique_video}
          children={profile.children}
        />
        {parentWithChildren.map(
          (
            parent: {
              children: any;
              enfants: any[];
            },
            index: React.Key | null | undefined
          ) =>
            parent.children.map(
              (
                enfant: {
                  id: string;
                  pseudo: string;
                  image: string;
                  age: number;
                  code_pin: string;
                  historique_video: string[];
                  parent_id: string;
                },
                enfantIndex: React.Key | null | undefined
              ) => (
                <EnfantCard
                  key={enfant.id}
                  pseudo={enfant.pseudo}
                  image={enfant.image || ""}
                  codePin={enfant.code_pin} // Pass codePin here
                />
              )
            )
        )}
      </div>
      <div className="fixed top-4 right-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profiles;
