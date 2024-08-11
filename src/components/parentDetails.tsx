import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


interface Parent {
    pays: string;
    contact: string;
    id: string;
    nom: string;
    email: string;
    children: any[];
    date_inscription:string;
  }
  
interface ParentDetailsProps {
  parent: Parent;
  onClose: () => void;
}

const ParentDetails: React.FC<ParentDetailsProps> = ({ parent, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6">
          Détails du parent
        </h2>
        <div className="mb-4 text-black ">
          <p><strong >Nom:</strong> {parent.nom}</p>
          <p><strong>Email:</strong> {parent.email}</p>
          <p><strong>Contact:</strong> {parent.contact}</p>
          <p><strong>Pays:</strong> {parent.pays}</p>
          <p><strong>Date d'inscription:</strong> {new Date(parent.date_inscription).toLocaleDateString()}</p>
        </div>

        <h3 className="text-xl font-semibold text-purple-700 mb-4">
          Enfants
        </h3>
        <table className="min-w-full divide-y divide-purple-400">
          <thead className="bg-purple-400">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Pseudo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Âge
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Code PIN
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-600">
            {parent.children.map((child, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-black border-b">{child.pseudo}</td>
                <td className="px-6 py-4 text-black border-b">{child.age}</td>
                <td className="px-6 py-4 text-black border-b">{child.code_pin}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentDetails;
