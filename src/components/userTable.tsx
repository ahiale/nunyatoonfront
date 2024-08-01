import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaLock, FaKey } from "react-icons/fa";
import ParentProfileForm from "./parentProfilForm";
import { Profile } from "../../type";

interface Parent {
  country: string;
  contact: string;
  id: string;
  nom: string;
  email: string;
  children: any[];
}

const UserTable: React.FC = () => {
  const [parentsWithChildren, setParents] = useState<Parent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [parentToDelete, setParentToDelete] = useState<string | null>(null);
  const [currentParent, setCurrentParent] = useState<Parent | null>(null);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    contact: "",
    country: "",
    password: "",
    parentalCode: ""
  });

  // ID et email spécifiques du parent à retirer
  const specificParentId = "389a775f-b784-4b19-8f32-2133c4"; // Remplacez par l'ID réel
  const specificParentEmail = "lieben@gmail.com"; // Remplacez par l'email réel

  useEffect(() => {
    const fetchParentsAndEnfants = async () => {
      try {
        const parentsResponse = await fetch(
          "http://127.0.0.1:8000/parent/red_all_parents",
          { method: "GET" }
        );
        const enfantsResponse = await fetch(
          "http://127.0.0.1:8000/enfant/read_all_enfants",
          { method: "GET" }
        );

        if (!parentsResponse.ok) {
          throw new Error(`Erreur lors de la récupération des parents: ${parentsResponse.statusText}`);
        }

        if (!enfantsResponse.ok) {
          throw new Error(`Erreur lors de la récupération des enfants: ${enfantsResponse.statusText}`);
        }

        const parentsData: Parent[] = await parentsResponse.json();
        const enfantsData: any[] = await enfantsResponse.json();

        const parentsWithChildren = parentsData.map(parent => ({
          ...parent,
          children: enfantsData.filter(enfant => enfant.parent_id === parent.id)
        }));

        setParents(parentsWithChildren);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchParentsAndEnfants();
  }, []);

  const handleEdit = (parent: Parent) => {
    setCurrentParent(parent);
    setFormData({
      nom: parent.nom,
      email: parent.email,
      contact: parent.contact || "",
      country: parent.country || "",
      password: "",
      parentalCode: ""
    });
    // setIsEditFormOpen(true);
  };

  const handleDelete = async () => {
    if (parentToDelete) {
      try {
        // Suppression du parent spécifique en backend
        const deleteResponse = await fetch(`http://127.0.0.1:8000/parent/${parentToDelete}`, {
          method: "DELETE"
        });

        if (!deleteResponse.ok) {
          throw new Error(`Erreur lors de la suppression du parent: ${deleteResponse.statusText}`);
        }

        // Retirer le parent de la liste
        setParents(parentsWithChildren.filter(parent => parent.id !== parentToDelete));
        setParentToDelete(null);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Erreur lors de la suppression du parent:", error);
      }
    }
  };

  const openConfirmationDialog = (id: string) => {
    setParentToDelete(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setParentToDelete(null);
  };

  function closeForm() {
    setIsEditFormOpen(false);
  }

  const handleSubmit = async () => {
    if (currentParent) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/parent/${currentParent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de la mise à jour du parent: ${response.statusText}`);
        }

        const updatedParent = { ...currentParent, ...formData };
        setParents(parentsWithChildren.map(parent => (parent.id === currentParent.id ? updatedParent : parent)));
        setIsEditFormOpen(false);
        setCurrentParent(null);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du parent:", error);
      }
    }
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    setCurrentParent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };  

  return (
    <div className="overflow-x-auto">
      <div className="text-black font-bold text-3xl pb-8 pt-8">
        Liste des utilisateurs
      </div>
      <table className="min-w-full divide-y divide-blue-200">
        <thead className="bg-blue-100">
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
        <tbody className="divide-y divide-blue-600">
          {parentsWithChildren.map((parent, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-black">
                <div>{parent.nom}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {parent.children.map((child, childIndex) => (
                  <div key={childIndex} className="pl-4">
                    <div>{child.pseudo}</div>
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="text-indigo-600 hover:text-indigo-900 mx-2"
                  onClick={() => {
                    handleEdit(parent); 
                    setIsEditFormOpen(true); 
                    setSelectedParent(parent)
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} title="Modifier" />
                  
                </button>
                <button
                  className="text-red-600 hover:text-red-900 mx-2"
                  onClick={() => openConfirmationDialog(parent.id)}
                >
                  <FontAwesomeIcon icon={faTrash} title="Supprimer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg text-black font-semibold mb-4">Êtes-vous sûr de vouloir supprimer ce parent ?</h3>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                onClick={handleDelete}
              >
                Oui
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={handleCloseDialog}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditFormOpen && (
        <ParentProfileForm onClose={closeForm} onSubmit={handleSubmit} parentData={selectedParent} />
      )}

    
    </div>


  );
};

export default UserTable;
