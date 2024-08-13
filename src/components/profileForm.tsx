import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaKey, FaClock } from 'react-icons/fa';
import { Profile } from '../../type';

const ProfileForm = ({ onClose, onSubmit, initialProfile, loggedParentId }: { onClose: () => void; onSubmit: (profile: Profile) => void; initialProfile?: Profile, loggedParentId?: string }) => {
    const [pseudo, setPseudo] = useState(initialProfile?.pseudo || '');
    const [age, setAge] = useState('');
    const [pin, setPin] = useState('');
    const [days, setDays] = useState<string[]>([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleDaysChange = (day: string) => {
        setDays((prevDays) => (prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]));
    };

    const generateTimeOptions = (isStart: boolean) => {
        const times = [];
        for (let hour = 6; hour <= 22; hour++) {
            for (let minute = 0; minute < 60; minute++) {
                const time = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
                const disabled = isStart ? false : time <= startTime; // Disable earlier times for end time
                times.push(
                    <option key={time} value={time} disabled={disabled}>
                        {time}
                    </option>
                );
            }
        }
        return times;
    };

    const handleSubmit = async () => {
        onClose();
        try {
            const enfantResponse = await fetch('http://localhost:8000/enfant/createEnfant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pseudo,
                    age,
                    image_profil: '',
                    code_pin: pin,
                    parent_id: loggedParentId,
                }),
            });

            if (!enfantResponse.ok) {
                throw new Error('Erreur lors de la création de l\'enfant');
            }

            const enfant = await enfantResponse.json();
            const enfant_id = enfant[0].id;

            const tempsEcranResponse = await fetch('http://localhost:8000/tempsEcran/CreateTempsEcran', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    heuresD: startTime,
                    heuresF: endTime,
                    joursA: days,
                    enfant_id: enfant_id,
                }),
            });

            if (!tempsEcranResponse.ok) {
                throw new Error('Erreur lors de la création du temps d\'écran');
            }

            console.log('Enfant et temps d\'écran créés avec succès');
            onSubmit({ pseudo, image: '' });
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const handleAgeChange = (e: { target: { value: any; }; }) => {
        const newAge = e.target.value;
        if (newAge < 5 || newAge > 14) {
            setErrorMessage('Un enfant doit avoir entre 5 et 14 ans.');
        } else {
            setErrorMessage('');
        }
        setAge(newAge);
    };

    const handleStartTimeChange = (e: { target: { value: string } }) => {
        const selectedStartTime = e.target.value;
        setStartTime(selectedStartTime);

        if (endTime && selectedStartTime > endTime) {
            setEndTime('');
        }
    };

    const handleEndTimeChange = (e: { target: { value: string } }) => {
        const selectedEndTime = e.target.value;
        if (selectedEndTime >= startTime) {
            setEndTime(selectedEndTime);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
                {errorMessage && (
                    <div className="text-red-600 mb-4">
                        {errorMessage}
                    </div>
                )}
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            className="w-full p-2 border rounded focus:border-purple-500 focus:ring-0 pl-10"
                            placeholder="Pseudo"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                        />
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            className="w-full p-2 border rounded focus:border-purple-500 focus:ring-0 pl-10"
                            placeholder="Âge"
                            value={age}
                            onChange={handleAgeChange}
                        />
                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            className="w-full p-2 border rounded focus:border-purple-500 focus:ring-0 pl-10"
                            placeholder="Code PIN"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                        />
                        <FaKey className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <div>
                        <label className="block text-sm">Jours de connexion</label>
                        <div className="flex flex-wrap gap-2">
                            {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map((day) => (
                                <button
                                    key={day}
                                    className={`p-2 border rounded ${days.includes(day) ? 'bg-purple-700 text-white' : 'bg-white'}`}
                                    onClick={() => handleDaysChange(day)}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <select
                                className="w-full p-2 border rounded focus:border-purple-500 focus:ring-0 pl-10"
                                value={startTime}
                                onChange={handleStartTimeChange}
                            >
                                <option value="" disabled>Sélectionnez l'heure de début</option>
                                {generateTimeOptions(true)}
                            </select>
                            <FaClock className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <div className="relative">
                            <select
                                className="w-full p-2 border rounded focus:border-purple-500 focus:ring-0 pl-10"
                                value={endTime}
                                onChange={handleEndTimeChange}
                                disabled={!startTime}
                            >
                                <option value="" disabled>Sélectionnez l'heure de fin</option>
                                {generateTimeOptions(false)}
                            </select>
                            <FaClock className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4 mt-4">
                    <button onClick={handleSubmit} className="p-2 bg-purple-700 text-white rounded">Enregistrer</button>
                    <button onClick={onClose} className="p-2 bg-gray-400 text-white rounded">Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
