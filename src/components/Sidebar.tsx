// components/Sidebar.tsx
import Image from "next/image";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faVideo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FaUser } from 'react-icons/fa';


interface SidebarProps {
  setSection: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setSection }) => {
  return (
    <div className="w-64 bg-blue-900 bg-opacity-75 text-white h-screen flex flex-col justify-between bg-cover bg-center "
    style={{ backgroundImage: 'url(/images/fondBleuNuit.jpg)' }}>
      <div>
        <div className="p-4 flex flex-col items-start">
        <Image 
      src="/images/logo.png"
      width={200}
      height={200}
      alt="Picture of the author"
    />
        </div>
        <nav className="flex flex-col mt-4">
          <button 
            className="w-full text-left px-4 py-2 hover:bg-blue-700 flex items-center text-black"
            onClick={() => setSection('users')}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Utilisateurs
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-blue-700 flex items-center text-black"
            onClick={() => setSection('videos')}
          >
            <FontAwesomeIcon icon={faVideo} className="mr-2" />
            Vidéos
          </button>
        </nav>
      </div>
      <div className=" p-4 flex flex-col items-center">
      
        <div className="text-left flex gap-4">
        <FaUser className="text-black h-5 w-5" /> <div className="text-xl text-black"> Admin: Olivia Rhye</div>
          
        </div>
        <button className="mt-2 px-2 py-1 bg-purple-500 bg-opacity-25 text-white rounded-lg flex items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
