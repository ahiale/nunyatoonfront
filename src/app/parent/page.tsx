import Footer from "@/components/Footer";
import ListeVideo from "@/components/ListeVideo";
import Navbar2 from "@/components/Navbar2";

export default function Parent() {
  return (
    <>
      <div className="relative p-6 z-10 bg-gradient-to-l from-yellow-200 to-yellow-100">
        <Navbar2 />
      </div>
      <div className="relative z-10">
        <ListeVideo />
      </div>
      <Footer />
    </>
  );
}
