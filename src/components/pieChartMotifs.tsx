import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

Chart.register(...registerables);

interface Motif {
  parent_id: string;
  video_id: string;
  nom: string;
  titre: string;
  motif: string;
}

interface MotifCount {
  [key: string]: number;
}

interface VideoCount {
  [key: string]: number;
}

const PieChartMotifs: React.FC = () => {
  const [motifs, setMotifs] = useState<Motif[]>([]);
  const [motifData, setMotifData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
  const [videoData, setVideoData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/video/get-all-motifs/");
        const data: Motif[] = await response.json();
        setMotifs(data);

        // Compter la fréquence des motifs
        const motifCount: MotifCount = data.reduce((acc: MotifCount, item: Motif) => {
          acc[item.motif] = (acc[item.motif] || 0) + 1;
          return acc;
        }, {});

        // Compter la fréquence des vidéos
        const videoCount: VideoCount = data.reduce((acc: VideoCount, item: Motif) => {
          acc[item.titre] = (acc[item.titre] || 0) + 1;
          return acc;
        }, {});

        setMotifData({
          labels: Object.keys(motifCount),
          data: Object.values(motifCount),
        });

        setVideoData({
          labels: Object.keys(videoCount),
          data: Object.values(videoCount),
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 auto', width: '90%', alignItems: 'center' }}>
      <div style={{ width: '45%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '300px' }}> {/* Uniformiser la hauteur des deux graphiques */}
          <Pie
            data={{
              labels: motifData.labels,
              datasets: [{
                data: motifData.data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57'],
                borderColor: '#fff',
                borderWidth: 1,
              }],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false, // Masquer la légende si vous le souhaitez
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                  },
                },
                title: {
                  display: true,
                  text: 'Motifs de Signalement',
                  position: 'bottom',
                  font: {
                    size: 12, // Taille de police pour le titre
                  },
                },
              },
              maintainAspectRatio: false, // Permet au graphique de s'adapter à la taille du conteneur
            }}
            height={300} // Uniformiser la hauteur
            width={300}  // Uniformiser la largeur
          />
        </div>
      </div>
      
      <div style={{ width: '45%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '300px' }}> {/* Uniformiser la hauteur des deux graphiques */}
          <Bar
            data={{
              labels: videoData.labels,
              datasets: [{
                label: 'Vidéos Signalées',
                data: videoData.data,
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                borderWidth: 1,
              }],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false, // Masquer la légende si vous le souhaitez
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                  },
                },
                title: {
                  display: true,
                  text: 'Vidéos Signalées',
                  position: 'bottom',
                  font: {
                    size: 12, // Taille de police pour le titre
                  },
                },
              },
              maintainAspectRatio: false, // Permet au graphique de s'adapter à la taille du conteneur
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1, // Taille des pas pour l'axe Y
                  },
                },
              },
            }}
            height={300} // Uniformiser la hauteur
            width={300}  // Uniformiser la largeur
          />
        </div>
      </div>
    </div>
  );
};

export default PieChartMotifs;
