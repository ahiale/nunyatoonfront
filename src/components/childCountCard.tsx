// components/ChildCountCard.tsx
import React, { useEffect, useState } from 'react';
import { FaChild } from 'react-icons/fa';

const ChildCountCard: React.FC = () => {
  const [childCount, setChildCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchChildCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/enfant/read_all_enfants');
        const result = await response.json();

        // Compter le nombre d'enfants
        const count = result.length;

        setChildCount(count);
      } catch (error) {
        console.error('Error fetching child count:', error);
      }
    };

    fetchChildCount();
  }, []);

  return (
    <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg flex flex-col items-center w-64">
      <div className="flex items-center mb-2">
        <FaChild className="text-4xl mr-3" />
        <div className="text-xl font-bold">Effectif enfants :</div>
      </div>
      <span className="text-2xl font-bold">{childCount !== null ? childCount : 'Loading...'}</span>
    </div>
  );
};

export default ChildCountCard;
