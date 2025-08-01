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
    <section id="home" className="pt-16 relative min-h-screen flex items-center overflow-hidden">
      
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: `url('attached_assets/college.jpg')`,
        }}
      />

      {/* Overlay for slight dark tint (optional) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="mb-8">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 text-gray-2000">
            CHRYSALIS
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-gray-200">
            National Symposium Where Language Leads, Innovation Follows
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Where Innovation Meets Literary Excellence - A Celebration of Creative Expression and Intellectual Discourse
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Calendar className="text-cyan-400 text-2xl mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Date</h3>
            <p className="text-gray-200">August 30, 2025</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <MapPin className="text-cyan-400 text-2xl mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Venue</h3>
            <p className="text-gray-200">St. Joseph's College Of Engineering</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Users className="text-cyan-400 text-2xl mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Format</h3>
            <p className="text-gray-200">Individual & Team</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => {
              scrollToSection('registration');
              window.open('https://forms.gle/8z5N32ZfnqpbKF5v6', '_blank');
            }}
            className="bg-cyan-400 hover:bg-cyan-500 text-purple-900 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            Register Now
          </Button>
          <Button 
            onClick={() => scrollToSection('events')}
            variant="outline"
            className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-purple-900 px-8 py-4 text-lg font-semibold transition-all duration-300"
            size="lg"
          >
            View Events
          </Button>
        </div>
      </div>
    </section>
  );
}
