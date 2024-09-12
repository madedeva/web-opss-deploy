import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold mb-4">Online Paper Submission System</h2>
            <p className="flex items-center justify-center md:justify-start mb-2">
              <FaMapMarkerAlt className="mr-2" />
              <a href="https://maps.app.goo.gl/GCfseoP4URdy9e4c7" className="hover:underline">
                Jl. Udayana No. 11, Banjar Tegal, Singaraja, Bali
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start mb-2">
              <FaEnvelope className="mr-2" />
              <a href="mailto:deva.kerti@undiksha.ac.id" className="hover:underline">
                deva.kerti@undiksha.ac.id
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-2" />
              <a href="tel:+6281529974101" className="hover:underline">
                +62 8152 9974 101
              </a>
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/undiksha.bali" className="text-xl hover:text-gray-300">
              <FaFacebook />
            </a>
            <a href="https://x.com/undikshabali" className="text-xl hover:text-gray-300">
              <FaTwitter />
            </a>
            <a href="https://www.youtube.com/universitaspendidikanganesha" className="text-xl hover:text-gray-300">
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com/undiksha.bali" className="text-xl hover:text-gray-300">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Online Paper Submission System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
