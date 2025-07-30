export default function ScheduleSection() {
  const day1Events = [
    { time: "9:00 AM", title: "Registration & Welcome", description: "Participant check-in and opening ceremony" },
    { time: "10:00 AM", title: "Dramatics Competition", description: "Performance-based literary expression" },
    { time: "2:00 PM", title: "Debate Competition", description: "Intellectual discourse and argumentation" },
    { time: "5:00 PM", title: "Day 1 Closing", description: "Summary and Day 2 preview" }
  ];

  const day2Events = [
    { time: "10:00 AM", title: "Verbal Correlations", description: "Quick thinking and word association" },
    { time: "2:00 PM", title: "AdSap Competition", description: "Creative advertisement making" },
    { time: "4:00 PM", title: "Decode Challenge", description: "Puzzle solving and analytical thinking" },
    { time: "6:00 PM", title: "Closing Ceremony", description: "Award presentation and closing remarks" }
  ];

  return (
    <section id="schedule" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-purple-900 mb-4">
            Event Schedule
          </h2>
          <p className="text-lg text-gray-600">
            Complete timeline of all symposium activities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Day 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="cyan-400 text-purple-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                15
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-bold text-purple-900">March 15, 2024</h3>
                <p className="text-gray-600">Day 1 Events</p>
              </div>
            </div>
            <div className="space-y-4">
              {day1Events.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="purple-900 text-white rounded-lg px-3 py-1 text-sm font-medium mr-4 mt-1">
                    {event.time}
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900">{event.title}</h4>
                    <p className="text-gray-600 text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Day 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="cyan-400 text-purple-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                16
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-bold text-purple-900">March 16, 2024</h3>
                <p className="text-gray-600">Day 2 Events</p>
              </div>
            </div>
            <div className="space-y-4">
              {day2Events.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="purple-900 text-white rounded-lg px-3 py-1 text-sm font-medium mr-4 mt-1">
                    {event.time}
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900">{event.title}</h4>
                    <p className="text-gray-600 text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
