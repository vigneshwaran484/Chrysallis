import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/event-card";
import { events, type Event } from "@/data/events";

// Countdown Timer styled like reference image
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
    <div className="bg-[#0f172a] text-center py-10 rounded-xl mb-10 shadow-lg">
      <h3 className="text-3xl font-bold text-white mb-8">Event Countdown</h3>
      <div className="flex justify-center flex-wrap gap-6">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((unit) => (
          <div
            key={unit.label}
            className="bg-gradient-to-br from-slate-800 to-slate-700 px-8 py-6 rounded-lg w-36 text-white"
          >
            <p className="text-4xl font-extrabold text-yellow-400">{unit.value}</p>
            <p className="text-lg mt-2 text-gray-300">{unit.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Events Section
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
