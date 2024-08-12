import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Enregistrement des composants nécessaires dans Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Video {
  titre: string;
  nbre_like: number;
}

const TopLikedVideosChart = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Nombre de Likes",
        data: [] as number[],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:8000/video/allVideo"); 
        if (!response.ok) {
          throw new Error("Erreur de réseau");
        }
        const allVideos: Video[] = await response.json();

        // Trier les vidéos par nombre de likes, en ordre décroissant
        const sortedVideos = allVideos.sort((a, b) => b.nbre_like - a.nbre_like);

        // Obtenir les 10 vidéos les plus aimées
        const topVideos = sortedVideos.slice(0, 10);

        // Préparer les données pour le graphique
        const labels = topVideos.map((video: Video) => video.titre);
        const data = topVideos.map((video: Video) => video.nbre_like);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Nombre de Likes",
              data: data,
              backgroundColor: "rgba(25, 124, 225, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="pt-8">
      
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw}`,
              },
            },
            // Ajouter le titre en bas
            title: {
              display: true,
              text: 'Les vidéos les plus tendances',
              position: 'bottom' as const,
              font: {
                size: 12, // Taille du texte
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default TopLikedVideosChart;
