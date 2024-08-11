import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

interface Categorie {
  id: string;
  titre: string;
  videos: Array<Video>;
}
interface Video {
  id: string;
  titre: string;
  description: string;
  url: string;
  duree: string;
  couverture: string;
  type_source: number;
  nbre_like: number;
}

const CategoryTable: React.FC = () => {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [editingCategory, setEditingCategory] = useState<Categorie | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await fetch("http://127.0.0.1:8000/categorie/allCategories", { method: "GET" });

        if (!categoriesResponse.ok) {
          throw new Error(`Erreur lors de la récupération des categories: ${categoriesResponse.statusText}`);
        }

        const categorieData: Categorie[] = await categoriesResponse.json();
        setCategories(categorieData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchCategories();
  }, []);

 const handleAddCategory = async () => {
    if (editingCategory) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/categorie/editCategorie/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ titre: newTitle })
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de la mise à jour de la catégorie: ${response.statusText}`);
        }

        // Mettre à jour la catégorie dans l'état local
        setCategories(categories.map(cat => cat.id === editingCategory.id ? { ...cat, titre: newTitle } : cat));
        setEditingCategory(null);
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la catégorie', error);
      }
    } else {
      try {
        const response = await fetch('http://127.0.0.1:8000/categorie/createCategorie', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ titre: newTitle })
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de l'ajout de la catégorie: ${response.statusText}`);
        }

        const newCategory: Categorie = await response.json();
        // Ajouter la nouvelle catégorie à l'état local
        setCategories(prevCategories => [...prevCategories, newCategory]);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie", error);
      }
    }
    setNewTitle('');
    setShowForm(false);
};



  const handleEditCategory = (category: Categorie) => {
    setEditingCategory(category);
    setNewTitle(category.titre);
    setShowForm(true);
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      const category = categories.find(cat => cat.id === categoryToDelete);

      if (category && category.videos.length > 0) {
        setDeleteError("Vous devez d'abord vider la catégorie avant de la supprimer.");
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/categorie/deleteCategorie/${categoryToDelete}`, { method: 'DELETE' });

        if (!response.ok) {
          throw new Error(`Erreur lors de la suppression de la catégorie: ${response.statusText}`);
        }

        // Filtrer la catégorie supprimée de l'état local
        setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryToDelete));
        setDeleteError(null);
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie", error);
      }
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
    }
  };

  const openDeleteConfirm = (id: string) => {
    setCategoryToDelete(id);
    setShowDeleteConfirm(true);
    setDeleteError(null);
  };

  const closeDeleteConfirm = () => {
    setCategoryToDelete(null);
    setShowDeleteConfirm(false);
    setDeleteError(null);
  };

  return (
    <div className="relative font-Grandstander">

      <div className="text-black font-bold text-3xl pb-8 pt-8">
        Liste des Categories
      </div>
      <button
        className="mb-4 px-4 py-2 bg-purple-500 bg-opacity-25 text-black rounded"
        onClick={() => setShowForm(true)}
      >
        Ajouter une catégorie
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md text-black max-w-xs w-full">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Titre de la catégorie"
              className="border px-2 py-1 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 bg-purple-500 text-black rounded"
                onClick={handleAddCategory}
              >
                {editingCategory ? 'Modifier' : 'Ajouter'}
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-black rounded"
                onClick={() => { setShowForm(false); setEditingCategory(null); setNewTitle(''); }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md text-black max-w-xs w-full">
            <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
            {deleteError && (
              <p className="text-red-500 text-sm">{deleteError}</p>
            )}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-3 py-1 bg-red-500 text-black rounded"
                onClick={handleDeleteCategory}
              >
                Oui
              </button>
              <button
                className="px-3 py-1 bg-gray-500 text-black rounded"
                onClick={closeDeleteConfirm}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full mx-auto">
          <thead className='bg-purple-400'>
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-white ">Titre</th>
              <th className="px-3 py-2 text-center text-xs font-medium text-white ">Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-purple-600'>
            {categories.map(category => (
              <tr key={category.id}>
                <td className="py-2 px-3 border-b text-black">{category.titre}</td>
                <td className="py-2 px-3 border-b text-black text-center space-x-2">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEditCategory(category)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => openDeleteConfirm(category.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;
