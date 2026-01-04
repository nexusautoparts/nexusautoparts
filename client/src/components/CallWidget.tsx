import { useState, useEffect } from "react";
import { Phone, MessageSquare, X } from "lucide-react";

export default function CallWidget() {
  const [isOpen, setIsOpen] = useState(true); // Default open on page load

  return (
    <>
      <style>{`
        @keyframes rotateShake {
          0% { transform: rotate(0deg); }
          3% { transform: rotate(15deg); }
          6% { transform: rotate(-15deg); }
          9% { transform: rotate(15deg); }
          12% { transform: rotate(-15deg); }
          15% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .shake-animation {
          animation: rotateShake 3s ease-in-out infinite;
        }
        .shake-animation:hover {
          animation: none;
        }
      `}</style>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed bottom-28 left-6 bg-zinc-900 rounded-2xl p-5 shadow-2xl z-50 w-72 border border-green-500/30 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <h3 className="text-xl font-bold text-white mb-1">Call Us Now!</h3>
          <p className="text-zinc-400 text-sm mb-4">Get Free Shipping</p>

          <a
            href="tel:12345678900"
            className="flex items-center gap-2 text-green-500 font-semibold text-lg mb-5 hover:text-green-400 transition-colors"
          >
            <Phone className="w-5 h-5" />
            +1 234-567-8900
          </a>

          <div className="flex gap-3">
            <a
              href="tel:12345678900"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md border border-green-500 text-green-500 font-medium hover:bg-green-500 hover:text-white transition-all"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <a
              href="sms:12345678900"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Message
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-[34px] left-[29px] w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg z-40 transition-all duration-300 hover:scale-110 hover:bg-green-700 border-4 border-white/20 ${!isOpen ? 'shake-animation' : ''}`}
        title="Call us: (234) 567-8900"
      >
        {isOpen ? <X className="w-7 h-7" /> : <Phone className="w-7 h-7" />}
      </button>
    </>
  );
}
