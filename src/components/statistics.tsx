const Statistics = () => {
    return (
      <div className="space-y-4 bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold">Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-yellow-200 p-4 rounded-lg">
            <p className="text-lg font-medium">83%</p>
            <p className="text-sm text-gray-600">Complet</p>
          </div>
          <div className="bg-purple-200 p-4 rounded-lg">
            <p className="text-lg font-medium">77%</p>
            <p className="text-sm text-gray-600">Complété</p>
          </div>
          <div className="bg-pink-200 p-4 rounded-lg">
            <p className="text-lg font-medium">91</p>
            <p className="text-sm text-gray-600">Vues uniques</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg">
            <p className="text-lg font-medium">126</p>
            <p className="text-sm text-gray-600">Nouveaux utilisateurs</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Statistics;
  