import { useEffect, useState } from 'react';
import { FaUser, FaCalendarAlt, FaKey, FaClock } from 'react-icons/fa';
import { Profile } from '../../type';

type ProfileEditFormProps = {
  onClose: () => void;
  onSubmit: (profile: Profile) => void;
  initialProfile?: Profile;
};

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ onClose, onSubmit, initialProfile }) => {
  const [editPseudo, setEditPseudo] = useState(initialProfile?.pseudo || '');
  const [editImage, setEditImage] = useState(initialProfile?.image || '');
  const [editAge, setEditAge] = useState(initialProfile?.age || 0);
  const [editPin, setEditPin] = useState(initialProfile?.code_pin || '');
  const [editDays, setEditDays] = useState<string[]>([]);
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [tempsEcranId, setTempsEcranId] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const handleDaysChange = (day: string) => {
    setEditDays((prevDays) => (prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]));
  };

  useEffect(() => {
    const fetchTempsEcran = async () => {
      try {
        const tempsEcranResponse = await fetch(
          `http://127.0.0.1:8000/enfant/${initialProfile?.id}/temps_ecran`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );

        if (!tempsEcranResponse.ok) {
          throw new Error(`Erreur lors de la récupération du temps d'écran de ${initialProfile?.pseudo}`);
        }

        const data = await tempsEcranResponse.json();
        setTempsEcranId(data[0].id);
        setEditStartTime(data[0].heuresD);
        setEditEndTime(data[0].heuresF);
        setEditDays(data[0].joursA);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Erreur:', error.message);
        } else {
          console.error('Erreur inconnue', error);
        }
      }
    };
    fetchTempsEcran();
  }, [initialProfile?.id, initialProfile?.pseudo]);

  const handleSubmit = async () => {
    onSubmit({ ...initialProfile!, pseudo: editPseudo, image: editImage, age: editAge, code_pin: editPin });
    onClose();
    console.log(editPseudo);
    console.log(editAge);
    console.log(editImage);
    console.log(editPin);

    try {
      const enfantUpdateResponse = await fetch(`http://localhost:8000/enfant/${initialProfile?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pseudo: editPseudo,
          age: editAge.toString(),
          image_profil: editImage,
          code_pin: editPin,
        }),
      });

      if (!enfantUpdateResponse.ok) {
        throw new Error("Erreur lors de l'update de l'enfant");
      }

      const tempsUpdateEcranResponse = await fetch(`http://localhost:8000/tempsEcran/${tempsEcranId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heuresD: editStartTime,
          heuresF: editEndTime,
          joursA: editDays,
        }),
      });
      console.log(editDays);
      console.log(editEndTime);
      console.log(editStartTime);
      if (!tempsUpdateEcranResponse.ok) {
        throw new Error("Erreur lors de l'update du temps d'écran");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Erreur inconnue', error);
      }
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? 0 : Number(value); 

    if (numericValue < 5 || numericValue > 15) {
      setErrorMessage('Un enfant doit avoir entre 5 et 15 ans.');
    } else {
      setErrorMessage('');
    }

    setEditAge(numericValue);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const formattedHour = hour < 10 ? `0${hour}` : hour.toString();
        const formattedMinute = minute < 10 ? `0${minute}` : minute.toString();
        options.push(`${formattedHour}h${formattedMinute}`);
      }
    }
    return options;
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setEditStartTime(value);
    setEditEndTime(''); // Reset end time when start time changes
  };

  const isEndTimeDisabled = editStartTime === '';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
        {errorMessage && (
          <div className="text-red-600 mb-4">
            {errorMessage}
          </div>
        )}
        <h2 className="text-xl mb-4">Modifier le Profil</h2>
        <div className="space-y-4">
          <div className="relative">
            <input
              className="w-full p-2 border rounded focus:border-purple-500 focus:ring-0 pl-10"
              placeholder="Pseudo"
              value={editPseudo}
              onChange={(e) => setEditPseudo(e.target.value)}
            />
            <FaUser className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type="number"
              className="w-full p-2 border rounded focus:border-purple-500 focus:ring-0 pl-10"
              placeholder="Âge"
              value={editAge}
              onChange={handleAgeChange}
            />
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type="password"
              className="w-full p-2 border rounded focus:border-purple-500 focus:ring-0 pl-10"
              placeholder="Code PIN"
              value={editPin}
              onChange={(e) => setEditPin(e.target.value)}
            />
            <FaKey className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div>
            <label className="block text-sm">Jours de connexion</label>
            <div className="flex flex-wrap gap-2">
              {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map((editDay) => (
                <button
                  key={editDay}
                  className={`p-2 border rounded ${editDays.includes(editDay) ? 'bg-purple-700 text-white' : 'bg-white'}`}
                  onClick={() => handleDaysChange(editDay)}
                >
                  {editDay}
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="relative w-full">
              <select
                className="w-full p-2 border rounded focus:border-purple-500 focus:ring-0 pl-10"
                value={editStartTime}
                onChange={handleStartTimeChange}
              >
                <option value="">Heure de début</option>
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <FaClock className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="relative w-full">
              <select
                className="w-full p-2 border rounded focus:border-purple-500 focus:ring-0 pl-10"
                value={editEndTime}
                onChange={(e) => setEditEndTime(e.target.value)}
                disabled={isEndTimeDisabled}
              >
                <option value="">Heure de fin</option>
                {generateTimeOptions().map((time) => (
                  <option
                    key={time}
                    value={time}
                    className={time <= editStartTime ? 'text-gray-400' : ''}
                  >
                    {time}
                  </option>
                ))}
              </select>
              <FaClock className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={handleSubmit} className="p-2 bg-purple-700 text-white rounded">Enregistrer</button>
          <button onClick={onClose} className="p-2 bg-gray-400 text-white rounded">Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditForm;
