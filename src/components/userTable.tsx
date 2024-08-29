import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import ParentProfileForm from "./parentProfilForm";
import ParentDetails from "./parentDetails";
import Loader from "./loader";


interface Parent {
  pays: string;
  contact: string;
  id: string;
  nom: string;
  email: string;
  children: any[];
  date_inscription: string;
}

const UserTable: React.FC = () => {
  const [parentsWithChildren, setParents] = useState<Parent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [parentToDelete, setParentToDelete] = useState<string | null>(null);
  const [currentParent, setCurrentParent] = useState<Parent | null>(null);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true); // État de chargement

  // Fonction pour fermer tous les modals
  const closeAllModals = () => {
    setIsEditFormOpen(false); // Fermeture du modal de modification
    setIsDetailsOpen(false);  // Fermeture du modal des détails
  };

  // Fonction pour gérer l'affichage du modal ParentDetails
  const handleView = (parent: Parent) => {
    closeAllModals(); // Ferme tous les modals ouverts
    setSelectedParent(parent); // Sélectionne le parent à afficher
    setIsDetailsOpen(true); // Ouvre le modal ParentDetails
  };

  // Fonction pour fermer le modal ParentDetails
  const handleCloseDetails = () => {
    setIsDetailsOpen(false); // Ferme le modal
    setSelectedParent(null); // Réinitialise le parent sélectionné
  };

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

        // Trier les parents par date d'inscription, de la plus récente à la plus ancienne
        const sortedParents = parentsWithChildren.sort((a, b) =>
          new Date(b.date_inscription).getTime() - new Date(a.date_inscription).getTime()
        );

        setParents(sortedParents);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchParentsAndEnfants();
  }, []);

  const handleEdit = (parent: Parent) => {
    closeAllModals(); // Ferme tous les modals ouverts
    setCurrentParent(parent);
    setIsEditFormOpen(true); // Ouvre le modal d'édition
  };

  const handleDelete = async () => {
    if (parentToDelete) {
      try {
        const deleteResponse = await fetch(`http://127.0.0.1:8000/parent/${parentToDelete}`, {
          method: "DELETE"
        });
  
        if (!deleteResponse.ok) {
          throw new Error(`Erreur lors de la suppression du parent: ${deleteResponse.statusText}`);
        }
  
        // Met à jour l'état en retirant le parent supprimé
        setParents(prevParents => prevParents.filter(parent => parent.id !== parentToDelete));
        setParentToDelete(null);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Erreur lors de la suppression du parent:", error);
      }
    }
  };

  const openConfirmationDialog = (id: string) => {
    closeAllModals(); // Ferme tous les modals ouverts
    setParentToDelete(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setParentToDelete(null);
  };

  const handleSubmit = async () => {
    if (currentParent) {
      // Mise à jour optimiste de l'état
      setParents(prevParents =>
        prevParents.map(parent =>
          parent.id === currentParent.id ? { ...parent, ...currentParent } : parent
        )
      );
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/parent/${currentParent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(currentParent)
        });
  
        if (!response.ok) {
          throw new Error(`Erreur lors de la mise à jour du parent: ${response.statusText}`);
        }
  
        // Confirmation de la mise à jour réussie
        setIsEditFormOpen(false);
        setCurrentParent(null);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du parent:", error);
        // Revenir à l'état précédent si une erreur se produit
        setParents(prevParents =>
          prevParents.map(parent =>
            parent.id === currentParent.id ? { ...parent, ...prevParents.find(p => p.id === currentParent.id) } : parent
          )
        );
      }
    }
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    setCurrentParent(null);
  };

  return (
    <div className="overflow-x-auto font-Grandstander">
      {loading && <Loader />} {/* Affichage du loader pendant le chargement */}

      <div className="text-black font-bold text-3xl pb-8 pt-8">
        Liste des utilisateurs
      </div>
      <table className="min-w-full divide-y divide-purple-400">
        <thead className="bg-purple-400">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Parent
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white-0 uppercase tracking-wider">
              email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white-0 uppercase tracking-wider">
              contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white-0 uppercase tracking-wider">
              date d'inscription
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-white-0 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {parentsWithChildren.map(parent => (
            <tr key={parent.id}>
              <td className="px-6 py-4 whitespace-nowrap  font-medium text-black">
                {parent.nom}
              </td>
              <td className="px-6 py-4 whitespace-nowrap  text-black">
                {parent.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap  text-black">
                {parent.contact}
              </td>
              <td className="px-6 py-4 whitespace-nowrap  text-black">
                {new Date(parent.date_inscription).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                <button
                  onClick={() => handleView(parent)}
                  className="text-green-600 hover:text-green-900 mr-4"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  onClick={() => handleEdit(parent)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => openConfirmationDialog(parent.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditFormOpen && currentParent && (
        <ParentProfileForm
          parentData={currentParent}
          onClose={handleCloseEditForm}
          onSubmit={handleSubmit}
        />
      )}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce parent ?</p>
            <div className="mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
              >
                Supprimer
              </button>
              <button
                onClick={handleCloseDialog}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      {isDetailsOpen && selectedParent && (
        <ParentDetails parent={selectedParent} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default UserTable;
