import Banner from "@/components/Banner";
import Contenu from "@/components/Contenu";
import Navbar from "@/components/Navbar";
import Contenusecond from "@/components/Contenusecond";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <><>
      <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/background.jpg)' }}>
        <div className="p-6 ">
          <Navbar />
        </div>
        <Banner />
      </div>

      <Contenu />
    </>

      <div>
        <Contenusecond />
      </div>
      <div>
        <Footer/>
      </div>

    </>

  );
}

