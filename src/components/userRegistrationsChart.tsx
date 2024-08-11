// components/UserRegistrationsChart.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface RegistrationData {
  date: string;
  count: number;
}

const UserRegistrationsChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Nombre d\'inscriptions',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/parent/stats/registrations-per-day');
        const result = await response.json();

        // Préparer les données pour Chart.js
        const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const dataMap: Record<string, number> = {};

        result.registrations_per_day.forEach((item: RegistrationData) => {
          const date = new Date(item.date);
          const dayName = daysOfWeek[date.getDay()];  // Récupère le nom du jour de la semaine
          dataMap[dayName] = (dataMap[dayName] || 0) + item.count;
        });

        const labels = Object.keys(dataMap).sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b));
        const data = labels.map(day => dataMap[day]);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Nombre d\'inscriptions',
              data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching registration data:', error);
      }
    };

    fetchRegistrationData();
  }, []);

  return (
    <div className=" p-4 rounded-lg">
      <div className="relative">
        <Line data={chartData} />
        <h2 className="text-xs text-black font-semibold absolute  left-1/2 transform -translate-x-1/2 mb-6">
          Statistiques des Inscription par mois
        </h2>
      </div>
    </div>
  );
};

export default UserRegistrationsChart;
