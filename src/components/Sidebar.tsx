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
    <div className="w-64 bg-white text-white h-screen flex flex-col justify-between">
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
            className="w-full text-left px-4 py-2 hover:bg-yellow-700 flex items-center text-black"
            onClick={() => setSection('users')}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Utilisateurs
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-yellow-700 flex items-center text-black"
            onClick={() => setSection('videos')}
          >
            <FontAwesomeIcon icon={faVideo} className="mr-2" />
            Vidéos
          </button>
        </nav>
      </div>
      <div className="bg-gray-200 p-4 flex flex-col items-center">
      
        <div className="text-left flex gap-4">
        <FaUser className="text-black h-5 w-5" /> <div className="text-xl text-black"> Admin: Olivia Rhye</div>
          
        </div>
        <button className="mt-2 px-2 py-1 bg-red-500 text-white rounded-lg flex items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
