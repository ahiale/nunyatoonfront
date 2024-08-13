import { updateSearchState } from "@/store/slice";
import { RootState, store } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaHistory, FaPlay, FaSearch, FaUser } from "react-icons/fa";
import { Provider, useDispatch, useSelector } from "react-redux";

const HeroSectionContainer = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const searchData = useSelector(
    (state: RootState) => state.AppStates.searchState
  );

  const searchInput = async (e:any) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    dispatch(updateSearchState(newSearch));
    console.log(newSearch)
    console.log(searchData)
    setTimeout(() => {
      console.log(store.getState().AppStates.searchState);
    }, 0);
  };

  const enfantData = useSelector(
    (state: RootState) => state.AppStates.enfantState
  );

  const parentData = useSelector(
    (state: RootState) => state.AppStates.parentState
  );

  useEffect(() => {
    setIsMounted(true);
    if (enfantData) {
      console.log(enfantData);
      console.log(parentData);
    }
  }, [enfantData, parentData]);

  return (
    <Provider store={store}>
      <div className="px-4">
        <div className="p-8 flex flex-col items-center font-Grandstander">
          
          {/* Hero Section */}
          <div className="flex justify-between items-center w-full max-w-screen-lg mt-4">
            <div className="flex items-center space-x-8">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={150}
                className="rounded-full"
              />
              {/* Ajout de la marge à droite pour espacer les éléments */}
              <div className="mr-8"></div>
            </div>

            {/* Navbar pour Profils, Historique et barre de recherche */}
            <div className="flex items-center space-x-6 px-4 py-2 rounded-full shadow-lg">

              {/* Enfant Data en dehors de la navbar */}
            {isMounted && enfantData && (
              <div className="flex items-center space-x-2 ml-4">
                <div className="text-white text-xl ">
                hey,  {enfantData.pseudo} <span>😎🎉</span>
                </div>
              </div>
            )}
              {/* Bouton Profils */}
              <Link
                href="/profil"
                className="flex items-center text-white hover:text-white transition-colors duration-300 text-xl"
              >
                <FaUser className="mr-1 h-4 w-4 text-white transform transition-transform duration-300 hover:scale-110" />
                Profils
              </Link>

              {/* Bouton Historique */}
              <Link
                href="/historique"
                className="flex items-center text-white hover:text-white transition-colors duration-300 text-xl"
              >
                <FaHistory className="mr-1 h-4 w-4 text-xl transform transition-transform duration-300 hover:scale-110" />
                Historique
              </Link>

              {/* Barre de recherche */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="choisis ta video"
                  className="w-full px-3 py-2 rounded-full bg-blue-600 bg-opacity-25 focus:outline-none text-sm"
                  value={search}
                  onChange={searchInput}
                />
                <FaSearch className="absolute top-2 right-3 text-gray-500" />
              </div>
            </div>

          </div>

          {/* Vidéo en bannière */}
          <div className="w-full mt-12 pl-12 pr-12 relative rounded-lg">
            <video
              src="/images/videoBanner2.mp4"
              autoPlay
              loop
              playsInline
              className="object-cover w-full h-[450px] rounded-lg" // Ajustez la hauteur selon vos besoins
            >
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </div>
    </Provider>
  );
};

export default HeroSectionContainer;
