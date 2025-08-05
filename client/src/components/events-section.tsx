import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/event-card";
import { events, type Event } from "@/data/events";

// CountdownTimer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('September 13, 2025 00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mb-10">
      <h3 className="text-2xl font-bold text-purple-900 mb-2">Countdown to Event</h3>
      <div className="flex justify-center space-x-6 text-purple-800 text-xl font-medium">
        <div><span className="font-bold text-3xl">{timeLeft.days}</span> days</div>
        <div><span className="font-bold text-3xl">{timeLeft.hours}</span> hrs</div>
        <div><span className="font-bold text-3xl">{timeLeft.minutes}</span> mins</div>
        <div><span className="font-bold text-3xl">{timeLeft.seconds}</span> secs</div>
      </div>
    </div>
  );
}

// EventsSection Component
export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredEvents = events.filter(event => {
    if (activeFilter === "all") return true;
    return event.category === activeFilter;
  });

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-purple-900 mb-4">
            Literary Competitions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our diverse range of literary and creative competitions designed to showcase talent and foster innovation
          </p>
        </div>

        {/* Event Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            onClick={() => setActiveFilter("all")}
            variant={activeFilter === "all" ? "default" : "outline"}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeFilter === "all" 
                ? "purple-900 text-white" 
                : "border-gray-300 text-gray-700 hover:purple-900 hover:text-white"
            }`}
          >
            All Events
          </Button>
          <Button
            onClick={() => setActiveFilter("performance")}
            variant={activeFilter === "performance" ? "default" : "outline"}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeFilter === "performance" 
                ? "purple-900 text-white" 
                : "border-gray-300 text-gray-700 hover:purple-900 hover:text-white"
            }`}
          >
            Performance
          </Button>
          <Button
            onClick={() => setActiveFilter("verbal")}
            variant={activeFilter === "verbal" ? "default" : "outline"}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeFilter === "verbal" 
                ? "purple-900 text-white" 
                : "border-gray-300 text-gray-700 hover:purple-900 hover:text-white"
            }`}
          >
            Verbal Arts
          </Button>
          <Button
            onClick={() => setActiveFilter("creative")}
            variant={activeFilter === "creative" ? "default" : "outline"}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeFilter === "creative" 
                ? "purple-900 text-white" 
                : "border-gray-300 text-gray-700 hover:purple-900 hover:text-white"
            }`}
          >
            Creative
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
