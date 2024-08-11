// components/ParentCountCard.tsx
import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';

const ParentCountCard: React.FC = () => {
  const [parentCount, setParentCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchParentCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/parent/red_all_parents');
        const result = await response.json();

        // Compter le nombre de parents
        const count = result.length;

        setParentCount(count);
      } catch (error) {
        console.error('Error fetching parent count:', error);
      }
    };

    fetchParentCount();
  }, []);

  return (
    <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg flex flex-col items-center w-64">
      <div className="flex items-center mb-2">
        <FaUsers className="text-4xl mr-3" />
        <div className="text-xl font-bold">Effectif parents:</div>
      </div>
      <span className="text-2xl font-bold">{parentCount !== null ? parentCount : 'Loading...'}</span>
    </div>
  );
};

export default ParentCountCard;
