"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [etat, setEtat] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const changeStateWithUserConnectedValue = () => {
    if (localStorage.getItem("connectedUser") === null) {
      setEtat(true); 
    } else {
      setEtat(false); // Optionnel : réinitialisez l'état si connecté
    }
  };


  
  const router = useRouter();
  const toggleListMenuAcceuil = () => {
    const connectedUser = localStorage.getItem("connectedUser");
    console.log(connectedUser);
    if (connectedUser ===null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Connectez-vous oh!",
        footer: '<a href="/login">Se connecter?</a>'
      });
      
    }else{
      
      router.push('/home')
    }
  };
  const toggleListMenuProfils = () => {
    const connectedUser = localStorage.getItem("connectedUser");
    console.log(connectedUser);
    if (connectedUser ===null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Connectez-vous oh!",
        footer: '<a href="/login">Se connecter?</a>'
      });
    }else{
      router.push('/profil')
    }
  };
  const toggleListMenucodeParental = () => {
    const connectedUser = localStorage.getItem("connectedUser");
    console.log(connectedUser);
    if (connectedUser ===null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Connectez-vous oh!",
        footer: '<a href="/login">Se connecter?</a>'
      });
    }else{
      router.push('/espaceParental')
    }
  };


  useEffect(() => {
    changeStateWithUserConnectedValue();
  }, []);
  
  return (
    <div className="relative flex p-2 justify-between font-medium text-lg w-full max-w-4xl h-14 items-center rounded-full bg-purple-700 bg-opacity-75 mx-auto font-Grandstander">
      <div className="flex-shrink-0 mr-4 pl-2 mb-2">
        <Image src="/images/logo.png" width={120} height={90} alt="Logo" />
      </div>

      <div className="flex space-x-4 items-center m-8">
        
          <div
            onClick={toggleListMenuProfils}
            className="hover:text-black cursor-pointer"
          >
            {" "}
            Profils
          </div>

        { !etat? <LogoutButton/> : 
        <div className="relative" >
          <button
            onClick={toggleDropdown}
            className=" text-black font-bold hover:text-white transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
          >
            Connexion/Inscription
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-purple-700 bg-opacity-50 rounded-md shadow-lg py-2 z-20">
              <Link href="/register">
                <div className="block px-4 py-2 text-white hover:bg-purple-600">
                  Inscription
                </div>
              </Link>
              <Link href="/login">
                <div className="block px-4 py-2 text-white hover:bg-purple-600">
                  Connexion
                </div>
              </Link>
            </div>
          )}
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
