import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-Mauve-900 text-white shadow-lg bg-[rgba(203, 203, 191, 0.93)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-500 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/attached_assets/final.png" 
              alt="CHRYSALIS Logo" 
              className="h-16 w-auto mr-3"
            />
            <div className="flex-shrink-0">
              <div className="text-grey-800 font-playfair font-bold text-xl">
                CHRYSALIS
              </div>
              <div className="text-sm text-grey-800">Literary Symposium</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors text-yellow-800">Home</button>
              <button 
                onClick={() => scrollToSection('events')}
                className="hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors text-yellow-800"
              >
                Events
              </button>
             
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors text-yellow-800"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-cyan-400 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('events')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-cyan-400 transition-colors"
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('schedule')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-cyan-400 transition-colors"
            >
              Schedule
            </button>
            <button 
              onClick={() => scrollToSection('registration')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-cyan-400 transition-colors"
            >
              Register
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-base font-medium hover:text-cyan-400 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
