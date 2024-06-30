
import Image from "next/image";

export default function Navbar(){

    return(
        <div className="flex p-2 justify-between font-medium text-lg w-full max-w-5xl h-16 items-center rounded-full bg-yellow-700 mx-auto"> 
  <div className="flex-shrink-0 mr-3 pl-2 mb-2"> {/* Ajout de mr-2 pour réduire la marge à droite */}
    <Image 
      src="/images/logo.png"
      width={120}
      height={90}
      alt="Picture of the author"
    />
  </div>

  <div className="flex space-x-4 items-center"> 
    <a href="#" className="hover:text-black" >Accueil</a>
    <a href="#" className="hover:text-black">Contenus</a>
    <a href="#" className="hover:text-black">Control Parental</a>
    <a href="#" className="ml-4 mr-4 p-2 bg-red-600 rounded-full hover:bg-white hover:text-black">Nous joindre</a>
  </div>
</div>

    )
}
    
