import { useEffect, useState } from "react";

const MotifsTable = () => {
  const [motifs, setMotifs] = useState<any[]>([]);

  useEffect(() => {
    // Fonction pour récupérer les données depuis l'API
    const fetchMotifs = async () => {
      try {
        const response = await fetch("http://localhost:8000/video/get-all-motifs/");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        setMotifs(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchMotifs();
  }, []);

  return (
    <div className="container mx-auto p-2 font-Grandstander">
        <div className="text-black font-bold text-3xl pb-8 pt-4">
        Liste des videos signalées
      </div>
      <table className="min-w-full">
        <thead className="bg-purple-400">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Parent</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Video</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Motifss</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-600">
          {motifs.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-6 border-b text-black">{item.nom}</td>
              <td className="py-2 px-6 border-b text-black">{item.titre}</td>
              <td className="py-2 px-6 border-b text-black">{item.motif}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MotifsTable;
