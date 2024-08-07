import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MostViewedVideosChart = () => {
  const [videoData, setVideoData] = useState<{ id: string; titre: string; views: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/video/videos/most_viewed");
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: videoData.map((video) => video.titre),
    datasets: [
      {
        label: 'Nombre de Vues',
        data: videoData.map((video) => video.views),
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
      },
      title: {
        display: true,
        text: 'Vidéos les Plus Regardées',
      },
    },
  };

  return (
    <div className="space-y-4 p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-bold">Vidéos les Plus Regardées</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MostViewedVideosChart;
