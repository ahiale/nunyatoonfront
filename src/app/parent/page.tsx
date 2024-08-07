"use client";
import Footer from "@/components/Footer";
import HeroSectionContainer from "@/components/heroSection";
import ListeVideo from "@/components/ListeVideo";
import MovieCard from "@/components/movieCard";
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
        <MovieCard></MovieCard>
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
