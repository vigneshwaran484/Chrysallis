import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="purple-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <div className="text-cyan-400 font-playfair font-bold text-2xl">CHRYSALIS 2024</div>
              <div className="text-gray-300">A National Level Technical Symposium</div>
            </div>
            <p className="text-gray-400 mb-4">
              A premier literary symposium celebrating creativity, innovation, and intellectual excellence in academic discourse.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('events')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Events
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">CONTACT US</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Department of English</li>
              <li>St. Joseph's College of Engineering</li>
              <li>OMR, Chennai-119</li>
              <li>Email: josephslinguasympochrisalys@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 St. Joseph's College. All rights reserved. | 
            <a href="#" className="hover:text-gold-400 transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-gold-400 transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
