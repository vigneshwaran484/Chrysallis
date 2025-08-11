import { MapPin, Bus, Phone, Mail } from "lucide-react";

export default function EventInfoSection() {
  return (
    <section id="event-info" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-purple-900 mb-4">
            Event Information
          </h2>
          <p className="text-lg text-gray-600">
            Important details about the event date, venue, and transport
          </p>
        </div>

         {/* IMPORTANT DATES */}
        <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl shadow-2xl overflow-hidden mb-16">
          <div className="p-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-2">IMPORTANT DATES</h3>
            <div className="h-1 w-20 bg-cyan-400 mx-auto mb-6"></div>
            
            {/* Registration Date */}
            <div className="mb-6">
              <p className="text-xl text-cyan-300 mb-1">Last date for registration:</p>
              <p className="text-3xl font-bold text-white">
                <span className="text-cyan-400">27-08-2025</span>
              </p>
            </div>
            
            {/* Selection Intimation Date */}
            <div className="mb-6">
              <p className="text-xl text-cyan-300 mb-1">Intimation of selection:</p>
              <p className="text-3xl font-bold text-white">
                <span className="text-cyan-400">28-08-2025</span>
              </p>
              <p className="text-sm text-cyan-200 mt-1">(Only through e-mail)</p>
            </div>
            
            {/* Event Date */}
            <div className="mb-8">
              <p className="text-xl text-cyan-300 mb-1">Event Date:</p>
              <p className="text-4xl font-bold text-white">
                SATURDAY, <span className="text-cyan-400">30th</span> AUGUST 2025
              </p>
            </div>
            
            <button  onClick={() => {
              window.open('https://forms.gle/W15XosJ5qzrWvwKG8', '_blank');
            }}className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 transform hover:-translate-y-1">
              REGISTER NOW
            </button>
          </div>
        </div>


        {/* BUS ROUTES */}
        <div className="mb-16">
          <h2 className="font-playfair text-3xl text-purple-900 mb-8 text-center border-b-2 border-cyan-400 pb-2 inline-block">
            BUS ROUTES TO COLLEGE
          </h2>
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-3xl mx-auto">
            <div className="flex items-start">
              <div className="bg-cyan-100 rounded-full p-3 mr-4">
                <Bus className="text-cyan-600 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-xl text-purple-900 mb-3">MTC BUS NUMBERS</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-purple-900">From CMBT:</p>
                    <p className="text-2xl font-bold text-cyan-600">570</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-purple-900">From Adyar:</p>
                    <p className="text-2xl font-bold text-cyan-600">19B, 21H</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-purple-900">From Tambaram:</p>
                    <p className="text-2xl font-bold text-cyan-600">95, 99</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-bold text-purple-900">From Saidapet:</p>
                    <p className="text-2xl font-bold text-cyan-600">19B</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLLEGE LOCATION */}
        <div className="mb-16">
          <h2 className="font-playfair text-3xl text-purple-900 mb-8 text-center border-b-2 border-cyan-400 pb-2 inline-block">
            COLLEGE LOCATION
          </h2>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
            <div className="flex items-start mb-6">
              <div className="bg-cyan-100 rounded-full p-3 mr-4">
                <MapPin className="text-cyan-600 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-2xl text-purple-900">St Joseph's College Of Engineering</h4>
                <p className="text-gray-600 text-lg mt-3">
                  Off, Old Mahabalipuram Road,<br />
                  Kamara Nagar, Semmancheri,<br />
                  Chennai, Tamil Nadu 600119
                </p>
                <div className="mt-4 flex items-center text-gray-600">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-lg">4.2 (1,717 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT DETAILS */}
        <div>
          <h2 className="font-playfair text-3xl text-purple-900 mb-8 text-center border-b-2 border-cyan-400 pb-2 inline-block">
            CONTACT DETAILS
          </h2>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            
            {/* Organizers */}
            <div className="mb-8">
              <div className="flex items-start mb-4">
                <div className="bg-cyan-100 rounded-full p-3 mr-4">
                  <Phone className="text-cyan-600 w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-2xl text-purple-900 mb-4">Organizers</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-purple-900">Mr. B.Nithin</p>
                      <p className="text-lg text-cyan-600 font-semibold">9840353000</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-purple-900">Mr. S.Yashvanth</p>
                      <p className="text-lg text-cyan-600 font-semibold">9344480767</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-purple-900">Mr. C.Vigneshwaran</p>
                      <p className="text-lg text-cyan-600 font-semibold">7845864838</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coordinators */}
            <div className="mb-8">
              <div className="flex items-start mb-4">
                <div className="bg-cyan-100 rounded-full p-3 mr-4">
                  <Phone className="text-cyan-600 w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-2xl text-purple-900 mb-4">Coordinators</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-purple-900">Dr. U.Venkateswar</p>
                      <p className="text-lg text-cyan-600 font-semibold">9840731240</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-purple-900">Ms.A.Sathiyajothi</p>
                      <p className="text-lg text-cyan-600 font-semibold">9003298963</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-center">
                <div className="bg-cyan-100 rounded-full p-3 mr-4">
                  <Mail className="text-cyan-600 w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl text-purple-900 mb-1">e-Mail:</p>
                  <a href="mailto:josephslinguasympochrisalys@gmail.com" className="text-lg text-cyan-600 font-semibold hover:text-cyan-700 transition-colors">
                    josephslinguasympochrisalys@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
