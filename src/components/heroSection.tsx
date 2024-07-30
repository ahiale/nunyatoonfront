import Image from 'next/image';
import { FaPlay, FaSearch } from 'react-icons/fa';

const HeroSectionContainer = () => {
  return (
    <div className="px-2"> {/* Add horizontal padding */}
      <div className="p-8 flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex justify-between items-center w-full max-w-screen-lg">
          <div className="flex items-center space-x-4">
            <div className="text-black text-2xl font-bold">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="relative">
              <input
                type="text"
                placeholder=" film ou une serie"
                className="px-4 py-2 rounded-full bg-purple-600 bg-opacity-25 focus:outline-none"
              />
              <FaSearch className="absolute top-3 right-3 text-black-500" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-black text-lg font-semibold">nom de l'enfant</div>
              <Image
                src="/path-to-profile-image.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex ml-10  mr-10 mt-12 gap-6">
          <div className="w-1/3 relative rounded-xl shadow-lg">
            <div className="overflow-hidden h-60">
              <Image
                src="/images/cartoon2.jpeg"
                alt="The Adventure of Blue Sword"
                width={400}
                height={180}
                layout="responsive"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-center p-4 bg-black bg-opacity-50">
                <div className="flex items-center text-white text-lg font-bold">
                  <FaPlay className="mr-2" />
                  <span>Let Play Movie</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 relative rounded-xl shadow-lg ">
            <div className="overflow-hidden h-60">
              <Image
                src="/images/cartoon1.jpeg"
                alt="Recalling the Journey of Dol"
                width={700}
                height={150}
                layout="responsive"
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 flex items-end justify-center p-4 bg-black bg-opacity-50">
                <div className="flex items-center text-white text-lg font-bold">
                  <FaPlay className="mr-2" />
                  <span>Let Play Movie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionContainer;
