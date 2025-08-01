import { useState } from "react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/event-card";
import { events, type Event } from "@/data/events";

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredEvents = events.filter(event => {
    if (activeFilter === "all") return true;
    return event.category === activeFilter;
  });

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-purple-900 mb-4">
            Literary Competitions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our diverse range of literary and creative competitions designed to showcase talent and foster innovation
          </p>
        </div>

        {/* Event Filter */}
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
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
