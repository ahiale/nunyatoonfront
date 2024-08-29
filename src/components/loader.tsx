import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="w-16 h-16 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
