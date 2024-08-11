import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type AgeGroup = '5-7' | '8-10' | '11-15'; // Mise à jour du groupe d'âge

interface AgeData {
  ageGroup: AgeGroup;
  count: number;
}

const AgeDistributionPieChart: React.FC = () => {
  const [ageData, setAgeData] = useState<AgeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/enfant/read_all_enfants');
        const data = await response.json();
        const enfants = data;

        const ageGroups: Record<AgeGroup, number> = {
          '5-7': 0,
          '8-10': 0,
          '11-15': 0, // Mise à jour du groupe d'âge
        };

        enfants.forEach((enfant: { age: number }) => {
          if (enfant.age >= 5 && enfant.age <= 7) ageGroups['5-7']++;
          else if (enfant.age >= 8 && enfant.age <= 10) ageGroups['8-10']++;
          else if (enfant.age >= 11 && enfant.age <= 15) ageGroups['11-15']++;
        });

        const formattedData = (Object.keys(ageGroups) as AgeGroup[]).map(ageGroup => ({
          ageGroup,
          count: ageGroups[ageGroup],
        }));

        setAgeData(formattedData);
      } catch (error) {
        console.error('Error fetching age data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ageData.map((item) => item.ageGroup),
    datasets: [
      {
        data: ageData.map((item) => item.count),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left' as const, // Positionner la légende à gauche
        labels: {
          font: {
            size: 10,
          },
          boxWidth: 20, // Largeur du carré de couleur
          padding: 10,  // Espacement entre les labels
        },
      },
      title: {
        display: false, // Ne pas afficher le titre en haut
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} utilisateurs`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-1/2 h-1/2">
        <Pie data={chartData} options={options} />
        <h4 className="absolute bottom-0 left-0 right-0 text-xs text-center text-black mt-1">
          Répartition des Utilisateurs par Âge
        </h4>
      </div>
    </div>
  );
};

export default AgeDistributionPieChart;
