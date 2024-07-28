"use client";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-blue-900 bg-opacity-75 text-white font-Grandstander">
      <div className="bg-white bg-opacity-25">
        <div className="w-full mx-auto max-w-screen-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Informations de Contact */}
            <div>
              <h2 className="text-black font-semibold mb-1">Contact</h2>
              <p className="text-sm mb-1">© 2024 Nunyatoon™</p>
              <p className="text-sm mb-1">Nunyatoon@gmail.com</p>
              <p className="text-sm">Adidogome-Togo</p>
            </div>

            {/* Activités */}
            <div>
              <h2 className="text-black font-semibold mb-1">Activités</h2>
              <ul className="text-sm">
                <li><a href="#" className="hover:underline">Divertissement</a></li>
                <li><a href="#" className="hover:underline">Éducation</a></li>
                <li><a href="#" className="hover:underline">Histoires</a></li>
              </ul>
            </div>

            {/* Réseaux Sociaux */}
            <div>
              <h2 className="text-black font-semibold mb-1">Suivez-nous</h2>
              <div className="flex space-x-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="w-5 h-5 hover:text-gray-300" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="w-5 h-5 hover:text-gray-300" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="w-5 h-5 hover:text-gray-300" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="w-5 h-5 hover:text-gray-300" />
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <span className="block text-xs">
              All Rights Reserved | Nunyatoon™
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
