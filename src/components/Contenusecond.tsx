"use client";
import { FaHistory, FaUserFriends, FaClock } from "react-icons/fa";
export default function Contenusecond() {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-blue-900 bg-opacity-75 ">
      <div className="grid grid-cols-2 justify-items-center items-center pt-4 ">
        <div className="" style={{ marginLeft: "150px" }}>
          <h1 className="text-5xl font-bold mb-5 font-Grandstander">
            <span className="text-white">Avec un control parental </span>{" "}
            <span className="text-black"> securisé et fiable </span>
          </h1>
          <ul className="text-white mb-4 text-xl">
            <li className="flex items-start mb-4 ">
              <FaHistory className="w-6 h-6 text-yellow-300 flex-shrink-0 mr-2" />
              <span>Accès à l'historique des vidéos</span>
            </li>
            <li className="flex items-start mb-4">
              <FaUserFriends className="w-6 h-6 text-green-300 flex-shrink-0 mr-2" />
              <span>Gestion des profils des enfants</span>
            </li>
            <li className="flex items-start m">
              <FaClock className="w-6 h-6 text-pink-300 flex-shrink-0 mr-2" />
              <span>Temps d'écran contrôlé</span>
            </li>
          </ul>
        </div>

        <div>
          <img
            className="w-full max-w-xm p-6"
            src="/images/parent2.png"
            alt="Story"
          />
        </div>
      </div>
    </div>
  );
}
