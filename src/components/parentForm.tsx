"use client";
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaPhone, FaUser, FaKey, FaGlobe } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ParentFormProps {
  parent: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ParentForm: React.FC<ParentFormProps> = ({ parent, onClose, onSubmit }) => {
  const [nom, setNom] = useState(parent.nom);
  const [age, setAge] = useState(parent.age);
  const [email, setEmail] = useState(parent.email);
  const [contact, setContact] = useState(parent.contact);
  const [pays, setPays] = useState(parent.pays);
  const [motDePasse, setMotDePasse] = useState(parent.motDePasse);
  const [codeParental, setCodeParental] = useState(parent.codeParental);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: parent.id, nom, age, email, contact, pays, motDePasse, codeParental });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-lg text-black font-semibold mb-4">Modifier Parent</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2 relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="nom"
                name="nom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2 pl-2 relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                id="age"
                name="age"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                placeholder="Âge"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2 pl-2 relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="contact"
                name="contact"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              id="pays"
              name="pays"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
              value={pays}
              onChange={(e) => setPays(e.target.value)}
              required
            >
              <option value=""></option>
              <option value="Togo">Togo</option>
              <option value="Benin">Benin</option>
              <option value="Ghana">Ghana</option>
            </select>
          </div>
          <div className="mb-4 relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="codeParental"
              name="codeParental"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-8"
              placeholder="Code Parental"
              value={codeParental}
              onChange={(e) => setCodeParental(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="submit" className="bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-md py-2 px-4">
              Enregistrer
            </button>
            <button type="button" className="bg-red-600 hover:bg-red-800 text-white font-semibold rounded-md py-2 px-4" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParentForm;
