"use client";
import Footer from "@/components/Footer";
import HeroSectionContainer from "@/components/heroSection";
import ListeVideo from "@/components/ListeVideo";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Enfant() {
  return (
    <Provider store={store}>
      <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/fondBleuNuit.jpg)' }}
    >
      <HeroSectionContainer />

      <div className="">
        <ListeVideo />
      </div>

      <Footer />
    </div>
    </Provider>
  );
}
