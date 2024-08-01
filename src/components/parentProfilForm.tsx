"use client";
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaLock, FaKey } from 'react-icons/fa';
import { Profile } from '../../type';

type ParentProfileFormProps = {
  onClose: () => void;
  onSubmit: (profile: Profile) => void;
  parentData: any
};

const ParentProfileForm: React.FC<ParentProfileFormProps> = ({ onClose, onSubmit, parentData }) => {
  const [pseudo, setPseudo] = useState(parentData.nom);
  const [age, setAge] = useState(parentData.age);
  const [email, setEmail] = useState(parentData.email);
  const [contact, setContact] = useState(parentData.contact);
  const [country, setCountry] = useState(parentData.pays);
  const [password, setPassword] = useState(parentData.motDePasse);
  const [parentalCode, setParentalCode] = useState(parentData.codeParental);

 

  const handleSubmit = async () => {
    const profileData = {
      nom:pseudo,
      age:age,
      email:email,
      contact:contact,
      pays:country,
      motDePasse:password,
      codeParental:parentalCode,
    };
    console.log(profileData)
    try {
      const response = await fetch(`http://127.0.0.1:8000/parent/updateParent/${parentData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        onSubmit(updatedProfile);
        onClose();
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl mb-4">Modifier Profil Parent</h2>
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaUser className="text-gray-500" />
            </span>
            <input
              className="w-full pl-10 p-2 border rounded focus:border-purple-500"
              placeholder="Nom"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="text-gray-500" />
              </span>
              <input
                type="number"
                className="w-full pl-10 p-2 border rounded focus:border-purple-500"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="relative w-1/2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-500" />
              </span>
              <input
                type="email"
                className="w-full pl-10 p-2 border rounded focus:border-purple-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaPhone className="text-gray-500" />
              </span>
              <input
                type="text"
                className="w-full pl-10 p-2 border rounded focus:border-purple-500"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="relative w-1/2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaGlobe className="text-gray-500" />
              </span>
              <select
                className="w-full pl-10 p-2 border rounded focus:border-purple-500"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Sélectionner un pays</option>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Canada">Canada</option>
                {/* Ajouter d'autres pays au besoin */}
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-500" />
              </span>
              <input
                type="password"
                className="w-full pl-10 p-2 border rounded focus:border-purple-500"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="relative w-1/2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaKey className="text-gray-500" />
              </span>
              <input
                type="password"
                className="w-full pl-10 p-2 border rounded focus:border-purple-500"
                placeholder="Code Parental"
                value={parentalCode}
                onChange={(e) => setParentalCode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button onClick={handleSubmit} className="p-2 bg-purple-700 rounded text-white">Enregistrer</button>
          <button onClick={onClose} className="p-2 bg-gray-400 rounded text-white">Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default ParentProfileForm;
