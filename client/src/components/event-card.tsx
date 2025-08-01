import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import type { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
}

const categoryColors = {
  performance: "bg-cyan-400 text-purple-900",
  verbal: "bg-blue-100 text-blue-800",
  creative: "bg-purple-100 text-purple-800"
};

const eventImages = {
  dramatics: "/attached_assets/dramatics.jpg",
  debate: "/attached_assets/debate.avif",
  verbal: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
  adzap: "/attached_assets/adzap.jpg",
  decode: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
};

export default function EventCard({ event }: EventCardProps) {
  const [showRules, setShowRules] = useState(false);

  const scrollToRegistration = () => {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      <img
        src={eventImages[event.id as keyof typeof eventImages]} 
        alt={event.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-playfair text-xl font-bold text-purple-900">{event.name}</h3>
          <Badge className={categoryColors[event.category]}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Badge>
        </div>
        
        <p className="text-gray-600 mb-4">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            <span>{event.teamSize}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.duration}</span>
          </div>
          
        </div>
        
        <div className="flex gap-2 mb-4">
          <Button 
            onClick={() => {
            scrollToRegistration();
            window.open('https://forms.gle/8z5N32ZfnqpbKF5v6', '_blank');
  }}
            className="purple-900 text-white hover:purple-800 flex-1"
          >
            Register
          </Button>
          <Button
            onClick={() => setShowRules(!showRules)}
            variant="outline"
            className="border-purple-900 text-purple-900 hover:purple-900 hover:text-white"
          >
            {showRules ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Rules
          </Button>
        </div>
        
        {/* Expandable Rules */}
        {showRules && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Competition Rules:</h4>
            <ul className="text-sm text-gray-600 space-y-1 mb-3">
              {event.rules.map((rule, index) => (
                <li key={index}>• {rule}</li>
              ))}
            </ul>
            
            <h4 className="font-semibold mb-2">Judging Criteria:</h4>
            <ul className="text-sm text-gray-600 space-y-1 mb-3">
              {event.judgingCriteria.map((criteria, index) => (
                <li key={index}>• {criteria}</li>
              ))}
            </ul>
            
            <h4 className="font-semibold mb-2">Disqualification Rules:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {event.disqualificationRules.map((rule, index) => (
                <li key={index}>• {rule}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
