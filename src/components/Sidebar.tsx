import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faVideo, faSignOutAlt, faListAlt, faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { FaCommentDots, FaExclamationTriangle, FaRing} from "react-icons/fa";

interface SidebarProps {
  setSection: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setSection }) => {
  const router = useRouter();
  const [adminName, setAdminName] = useState<string>('');
  
    useEffect(() => {
      const userData = localStorage.getItem('connectedAdmin');
      if (userData) {
        const user = JSON.parse(userData);
        setAdminName(user.nom); 
      }
    }, []);

  const handleLogout = () => {
    localStorage.removeItem('token&Id');
    localStorage.removeItem('connectedAdmin');
    router.push('/adminLogin'); // Redirection vers la page de connexion admin
  };

  return (
    <div className="w-64 bg-blue-900 bg-opacity-75 text-white h-screen flex flex-col justify-between bg-cover bg-center font-Grandstander"
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
            className="w-full text-left px-4 py-2 hover:bg-blue-700 flex items-center text-white"
            onClick={() => setSection('statistics')}
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-2 h-5 w-5" />
            Etat des utilisateurs
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-700 flex items-center text-white"
            onClick={() => setSection('videoStatistics')}
          >
            <FontAwesomeIcon icon={faChartLine} className="mr-2 h-5 w-5" />
            Etat des videos
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-700 flex items-center text-white"
            onClick={() => setSection('users')}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2 h-5 w-5" />
             utilisateurs
          </button>
          
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-700 flex items-center text-white"
            onClick={() => setSection('videos')}
          >
            <FontAwesomeIcon icon={faVideo} className="mr-2 h-5 w-5" />
             videos
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-700 flex items-center text-white"
            onClick={() => setSection('categories')}
          >
            <FontAwesomeIcon icon={faListAlt} className="mr-2 h-5 w-5" />
             catégories
          </button>
          
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-700 flex items-center text-white"
            onClick={() => setSection('motifs')}
          >
            <FaExclamationTriangle className="mr-2 h-5 w-5" />
             Videos signalées
          </button>
          
        </nav>
      </div>
      <div className="p-4 flex flex-col items-center">
        <div className="text-left flex gap-4">
          <FontAwesomeIcon icon={faUser} className="text-white h-5 w-5" />
          <div className="text-xl text-white"> Admin: {adminName}</div>
        </div>
        <button
          className="mt-2 px-2 py-1 bg-purple-500 bg-opacity-25 text-white rounded-lg flex items-center"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-1 h-5 w-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
