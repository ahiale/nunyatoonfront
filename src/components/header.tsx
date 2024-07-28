const Header = () => {
    return (
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-600">Bienvenue, Admin</p>
        </div>
        <div className="flex items-center">
          <p className="mr-4">Admin</p>
          <img
            src="/path/to/admin-avatar.jpg"
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>
    );
  };
  
  export default Header;
  