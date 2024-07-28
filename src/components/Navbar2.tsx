'use client';  // Assurez-vous que ce fichier est traité comme un composant côté client

import Link from 'next/link';
import Image from "next/image";

export default function Navbar2() {
  return (
    <div className="flex p-2 justify-between font-medium text-lg w-full max-w-5xl h-16 items-center rounded-full bg-yellow-700 mx-auto font-Grandstander"> 
      <div className="flex-shrink-0 mr-3 pl-2 mb-2">
        <Image 
          src="/images/logo.png"
          width={120}
          height={90}
          alt="Picture of the author"
        />
      </div>
      <div className="flex space-x-4 items-center"> 
        <a href="/home" className="hover:text-black">Accueil</a>
        <a href="/parent" className="hover:text-black">Contenus</a>
        <a href="/espaceParental" className="hover:text-black">Espace Parentale</a>
        <Link href="#" className="ml-4 mr-4 hover:text-black">Créer un profil</Link>
      </div>
    </div>
  );
}
