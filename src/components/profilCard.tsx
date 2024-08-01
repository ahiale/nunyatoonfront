import { useState } from 'react';
import { FaEllipsisV, FaEdit, FaTrash, FaHistory } from 'react-icons/fa';

type ProfileCardProps = {
  pseudo: string;
  image: string;
  onEdit: () => void;
  onDelete: () => void;
  onHistory: () => void;
  readProfile: () => void;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  pseudo = 'Pseudo Inconnu',
  image = '/path/to/default/image.jpg',
  onEdit,
  onDelete,
  onHistory,
  readProfile
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-4" onClick={() => setShowOptions(!showOptions)}>
        <img src={image} alt={`${pseudo} Profile`} className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h3 className="text-black text-lg">{pseudo}</h3>
        </div>
        <FaEllipsisV className="text-black cursor-pointer ml-auto" />
      </div>
      {showOptions && (
        <div className="mt-2 rounded-md p-2 bg-gray-100 shadow-lg absolute top-full left-5 w-48">
          <button
            onClick={readProfile}
            className="block px-4 py-2 text-black hover:bg-purple-700 w-full text-left flex items-center"
          >
            <FaHistory className="mr-2" /> Voir le profil
          </button>
          <button
            onClick={onEdit}
            className="block px-4 py-2 text-black hover:bg-purple-700 w-full text-left flex items-center"
          >
            <FaEdit className="mr-2" /> Modifier
          </button>
          <button
            onClick={onDelete}
            className="block px-4 py-2 text-black hover:bg-purple-700 w-full text-left flex items-center"
          >
            <FaTrash className="mr-2" /> Supprimer
          </button>
          <button
            onClick={onHistory}
            className="block px-4 py-2 text-black hover:bg-purple-700 w-full text-left flex items-center"
          >
            <FaHistory className="mr-2" /> Historique
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
