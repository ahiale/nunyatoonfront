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
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 text-black">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-black">Nom</th>
            <th className="py-2 px-4 border-b text-black">Titre</th>
            <th className="py-2 px-4 border-b text-black">Motif</th>
          </tr>
        </thead>
        <tbody>
          {motifs.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-black">{item.nom}</td>
              <td className="py-2 px-4 border-b text-black">{item.titre}</td>
              <td className="py-2 px-4 border-b text-black">{item.motif}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MotifsTable;
