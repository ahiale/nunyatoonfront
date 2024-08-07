"use client";
import Banner from "@/components/Banner";
import Contenu from "@/components/Contenu";
import Navbar from "@/components/Navbar";
import Contenusecond from "@/components/Contenusecond";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <><>
      <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/fondEtoile.jpg)' }}>
        <div className="p-6 ">
          <Navbar />
        </div>
        <Banner />
      </div>

      <Contenu />
    </>

      <div >
        <Contenusecond />
      </div>
      <div >
        <Footer/>
      </div>

    </>
    </Provider>

  );
}

