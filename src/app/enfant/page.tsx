import Footer from "@/components/Footer";
import HeroSectionContainer from "@/components/heroSection";
import ListeVideo from "@/components/ListeVideo";

export default function Enfant() {
  return (
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
  );
}
