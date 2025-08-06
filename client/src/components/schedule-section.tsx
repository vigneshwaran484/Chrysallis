import { Phone } from "lucide-react";

export default function ScheduleSection() {
  return (
    <div id="contact"> {/* This is the scroll target */}
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
      </div>
    </div>
  );
}
