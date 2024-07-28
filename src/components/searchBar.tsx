import Image from 'next/image';

export default function SearchBar() {
  return (
    <div className="flex items-center w-full max-w-2xl h-16 rounded-full mx-auto mt-30 font-Grandstander">
      
      
      {/* Search Input and Icon */}
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Choisissez un film ou une serie"
          className="w-full pl-12 pr-4 py-2 text-black placeholder-black rounded-full outline-none bg-gradient-to-l from-yellow-200 to-yellow-100"
        />
        <button
          type="submit"
          className="absolute left-0 top-0 bottom-0 px-4 flex items-center justify-center text-gray-600"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      
    </div>
  );
}
