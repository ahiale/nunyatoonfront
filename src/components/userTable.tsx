import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";



interface Parent {
  id: string;
  nom: string;
  email: string;
  children: any[];
}

const UserTable: React.FC = () => {
  const [parentsWithChildren, setParents] = useState<Parent[]>([]);
  const [enfants, setEnfants] = useState<any[]>([]);

  useEffect(() => {
    const fetchParentsAndEnfants = async () => {
      try {
        const parentsResponse = await fetch(
          "http://127.0.0.1:8000/parent/red_all_parents",
          {
            method: "GET",
          }
        );
        let enfants=[]
         const enfantsResponse = await fetch(
          "http://127.0.0.1:8000/enfant/read_all_enfants",
          {
            method: "GET",
          }
        );

       
        

        if (!parentsResponse.ok) {
          throw new Error(
            `Erreur lors de la récupération des parents: ${parentsResponse.statusText}`
          );
        }

        if (!enfantsResponse.ok) {
          throw new Error(
            `Erreur lors de la récupération des enfants: ${enfantsResponse.statusText}`
          );
        }

        const parentsData: Parent[] = await parentsResponse.json();
        const enfantsData: any[] = await enfantsResponse.json();

        // Associer les enfants à leurs parents
        const parentsWithChildren = parentsData.map(parent => {
          return {
            ...parent,
            children: enfantsData.filter(enfant => enfant.parent_id === parent.id)
          };
        });
        parentsWithChildren.map((parent,index)=>{
          console.log(parent);
        })
        
        setParents(parentsWithChildren);
        setEnfants(enfantsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchParentsAndEnfants();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="text-yellow-600 font-bold text-3xl pb-8 pt-8">
        Liste des utilisateurs
      </div>
      <table className="min-w-full divide-y divide-yellow-200">
        <thead className="bg-yellow-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Parent
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Enfants
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-yellow-600">
          {parentsWithChildren.map((parent, index) => (
            <tr key={index} className="bg-white">
              <td className="px-6 py-4 whitespace-nowrap text-black">
                <div>{parent.nom}</div>
                <div className="text-sm text-gray-500">{parent.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {parent.children.map((child, childIndex) => (
                  <div key={childIndex} className="pl-4">
                    <div>{child.pseudo}</div>
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mx-2">
                  <FontAwesomeIcon icon={faEdit} title="Modifier" />
                </button>
                <button className="text-red-600 hover:text-red-900 mx-2">
                  <FontAwesomeIcon icon={faTrash} title="Supprimer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
