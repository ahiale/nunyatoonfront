// components/PieChart.tsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions
} from 'chart.js';

// Enregistrez les modules nécessaires
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart: React.FC = () => {
  const [data, setData] = useState<ChartData<'pie'>>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/video/videos/most_viewed');
        const result = await response.json();

        // Filtrer les vidéos avec des vues nulles
        const filteredResult = result.filter((item: { views: number | null }) => item.views !== null);

        const labels = filteredResult.map((item: { titre: string }) => item.titre);
        const values = filteredResult.map((item: { views: number }) => item.views);

        setData({
          labels: labels,
          datasets: [{
            label: 'Vidéos les Plus Regardées',
            data: values,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#E7E9AC',
              '#4BC0C0',
              '#FF9F40',
              '#FFCD56',
              '#C9EBB9',
              '#FF9F9F',
              '#FF6B6B'
            ],
            borderColor: '#fff',
            borderWidth: 1
          }]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} vues`;
          }
        }
      }
    }
  };

  return (
    <div>
      <h2>Vidéos les Plus Regardées</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
