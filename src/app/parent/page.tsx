"use client";
import Footer from "@/components/Footer";
import HeroSectionContainer from "@/components/heroSection";
import ListeVideo from "@/components/ListeVideo";
import Navbar from "@/components/Navbar";
import { store } from "@/store/store";
import Image from 'next/image';
import { FaPlay, FaSearch } from 'react-icons/fa';
import { Provider } from "react-redux";

export default function Parent() {
  return (
  <Provider store={store}>
      <>
    <div
      className=" bg-gradient-to-r from-purple-700 to-blue-900 bg-opacity-75"
     
    >
      <div className="bg-black bg-opacity-25">
      <div className="pt-5">
      <Navbar></Navbar>
      </div>
      <div>
         
            {/* Cards Section */}
        <div className="flex pl-10 pr-10 mt-12 gap-6 mx-10">
          <div className="w-1/3 relative">
            <div className="rounded-xl shadow-md overflow-hidden h-60">
              <Image
                src="/images/cartoon2.jpeg"
                alt="The Adventure of Blue Sword"
                width={300}
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
          <div className="w-2/3 relative">
            <div className="rounded-xl shadow-md overflow-hidden h-60">
              <Image
                src="/images/cartoon1.jpeg"
                alt="Recalling the Journey of Dol"
                width={600}
                height={150}
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
        </div>
      </div>
      <div className="">
        <ListeVideo />
      </div>
      </div>
      </div>
      <Footer />
    </>
  </Provider>
  );
}
