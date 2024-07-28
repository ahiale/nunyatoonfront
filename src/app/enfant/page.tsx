import Footer from "@/components/Footer";
import ListeVideo from "@/components/ListeVideo";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/searchBar";


export default function Enfant() {
  return (
    <>
      <div className="relative h-[80vh]"> {/* Adjust the height as needed */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="/images/videoBanner2.mp4"
        >
          Your browser does not support the video tag.
        </video>

        <div className="relative p-6 z-10">


          
          <SearchBar/>
        </div>
      </div>

      {/* ListVideo component below the video */}
      <div className="relative z-10">
        <ListeVideo/>
      </div>
      <Footer/>
    </>
  );
}

