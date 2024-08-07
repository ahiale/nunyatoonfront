import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type AgeGroup = '5-7' | '8-10' | '11-14';

interface AgeData {
  ageGroup: AgeGroup;
  count: number;
}

const AgeDistributionChart = () => {
  const [ageData, setAgeData] = useState<AgeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/enfant/read_all_enfants");
        const data = await response.json();
        const enfants = data;

        const ageGroups: Record<AgeGroup, number> = {
          '5-7': 0,
          '8-10': 0,
          '11-14': 0,
        };

        enfants.forEach((enfant: { age: number }) => {
          if (enfant.age >= 5 && enfant.age <= 7) ageGroups['5-7']++;
          else if (enfant.age >= 8 && enfant.age <= 10) ageGroups['8-10']++;
          else if (enfant.age >= 11 && enfant.age <= 14) ageGroups['11-14']++;
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
        label: 'Nombre d\'utilisateurs',
        data: ageData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Répartition des Utilisateurs par Âge',
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || '';
            return `${label}: ${context.raw} utilisateurs`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Groupes d\'âge',
          font: {
            size: 16,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Nombre d\'utilisateurs',
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default AgeDistributionChart;
