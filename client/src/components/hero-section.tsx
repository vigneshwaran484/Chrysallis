import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 relative min-h-screen flex items-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(66, 44, 123, 0.85), rgba(66, 44, 123, 0.85)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="mb-8">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 text-cyan-400">
            CRISALYS
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-gray-200">
            A National Level Technical Symposium
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Where Innovation Meets Literary Excellence - A Celebration of Creative Expression and Intellectual Discourse
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Calendar className="text-cyan-400 text-2xl mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Date</h3>
            <p className="text-gray-200">March 15-16, 2024</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <MapPin className="text-cyan-400 text-2xl mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Venue</h3>
            <p className="text-gray-200">St. Joseph's College</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Users className="text-cyan-400 text-2xl mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Format</h3>
            <p className="text-gray-200">Individual & Team</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => scrollToSection('registration')}
            className="cyan-400 hover:cyan-500 text-purple-900 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            Register Now
          </Button>
          <Button 
            onClick={() => scrollToSection('events')}
            variant="outline"
            className="border-2 border-cyan-400 text-cyan-400 hover:cyan-400 hover:text-purple-900 px-8 py-4 text-lg font-semibold transition-all duration-300"
            size="lg"
          >
            View Events
          </Button>
        </div>
      </div>
    </section>
  );
}
