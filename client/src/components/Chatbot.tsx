import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Phone, MessageSquare, ChevronRight, Send } from "lucide-react";

// Mock Data from Reference
const mockData = {
  years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
  makes: {
    '2024': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'BMW', 'Tesla', 'RAM'],
    '2023': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'BMW'],
    '2022': ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan']
  } as Record<string, string[]>,
  models: {
    Ford: ['F-150', 'Mustang', 'Explorer', 'Ranger', 'Edge'],
    Chevrolet: ['Silverado', 'Corvette', 'Equinox', 'Colorado', 'Blazer'],
    Toyota: ['Camry', 'Corolla', 'Highlander', 'Tacoma', 'Tundra'],
    Honda: ['Accord', 'Civic', 'CR-V', 'Pilot', 'Ridgeline']
  } as Record<string, string[]>,
  parts: ['Engine', 'Transmission', 'Steering Column', 'Instrument Cluster', 'ABS Module', 'Transfer Case', 'Turbo Charger', 'Airbag', 'Differential', 'Axle Shaft']
};

type Step = 'year' | 'make' | 'model' | 'part' | 'summary';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: number;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('year');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selections, setSelections] = useState({ year: '', make: '', model: '', part: '' });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initChat();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initChat = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: 'What year is your vehicle?',
        timestamp: Date.now()
      }
    ]);
    setCurrentStep('year');
    setSelections({ year: '', make: '', model: '', part: '' });
  };

  const getNextQuestion = (step: Step) => {
    switch (step) {
      case 'year': return 'What year is your vehicle?';
      case 'make': return 'What is the make of your vehicle?';
      case 'model': return 'What is the model of your vehicle?';
      case 'part': return 'What part do you need?';
      default: return '';
    }
  };

  const getAvailableOptions = (step: Step) => {
    switch (step) {
      case 'year': return mockData.years;
      case 'make': return mockData.makes[selections.year] || mockData.makes['2024']; // Fallback
      case 'model': return mockData.models[selections.make] || mockData.models['Ford']; // Fallback
      case 'part': return mockData.parts;
      default: return [];
    }
  };

  const handleOptionClick = (option: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: option,
      timestamp: Date.now()
    };

    const newSelections = { ...selections, [currentStep]: option };
    setSelections(newSelections);

    // Calculate new messages array to update state once
    const updatedMessages = [...messages, newMessage];

    let nextStep: Step = 'summary';
    if (currentStep === 'year') nextStep = 'make';
    else if (currentStep === 'make') nextStep = 'model';
    else if (currentStep === 'model') nextStep = 'part';

    if (nextStep === 'summary') {
      updatedMessages.push({
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Perfect! Here's a summary of your selection. How would you like to proceed?",
        timestamp: Date.now() + 1
      });
      setCurrentStep('summary');
    } else {
      updatedMessages.push({
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getNextQuestion(nextStep),
        timestamp: Date.now() + 1
      });
      setCurrentStep(nextStep);
    }

    setMessages(updatedMessages);
  };

  return (
    <>
      <style>{`
        @keyframes pulseGlow {
            0% { box-shadow: 0 10px 25px rgba(160, 24, 34, 0.5); transform: scale(1); }
            50% { box-shadow: 0 15px 40px rgba(160, 24, 34, 0.95); transform: scale(1.08); }
            100% { box-shadow: 0 10px 25px rgba(160, 24, 34, 0.5); transform: scale(1); }
        }
        .chat-btn-pulse {
            animation: pulseGlow 1.5s ease-in-out infinite;
        }
        .chat-btn-pulse:hover {
            animation: none;
        }
      `}</style>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[4px] z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full h-full md:max-w-[384px] md:max-h-[512px] md:bottom-24 md:right-8 bg-[linear-gradient(to_bottom,rgba(20,20,20,0.95),rgba(30,10,10,0.95))] border border-[#A01822]/40 md:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col z-[51] backdrop-blur-md overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 text-slate-100 font-sans ring-1 ring-[#A01822]/20">

          {/* Header */}
          <div className="bg-[linear-gradient(to_right,#7f1d1d,#A01822)] p-4 flex items-center justify-between shrink-0 shadow-lg">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 opacity-90" />
              Find Your Part
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Chat Container */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.2))]">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-md leading-relaxed
                    ${msg.type === 'user'
                        ? 'bg-[linear-gradient(135deg,#A01822,#7f1d1d)] text-white rounded-tr-sm shadow-[0_4px_12px_rgba(160,24,34,0.3)]'
                        : 'bg-zinc-800 text-zinc-200 rounded-tl-sm shadow-sm border border-white/5'}`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Options Area */}
            {currentStep !== 'summary' ? (
              <div className="shrink-0 border-t border-white/10 bg-black/40 backdrop-blur-md p-4 max-h-60 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {getAvailableOptions(currentStep).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      className="w-full p-3 text-left text-sm border border-white/10 rounded-xl bg-white/5 text-zinc-300 hover:bg-[#A01822] hover:text-white hover:border-[#A01822] transition-all duration-200 font-medium flex items-center justify-between group"
                    >
                      {opt}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 border-t border-[#A01822]/30 bg-black/60 backdrop-blur-md">
                <p className="text-[11px] font-bold uppercase text-[#A01822] mb-3 tracking-wider">Your Selection</p>
                <div className="space-y-2 mb-4">
                  {Object.entries(selections).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2.5 rounded-lg bg-white/5 border border-white/10 text-[13px]">
                      <span className="capitalize text-zinc-400 font-medium">{key}</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => alert("Live chat started!")}
                    className="w-full p-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-[linear-gradient(to_right,#A01822,#7f1d1d)] text-white hover:shadow-[0_8px_20px_rgba(160,24,34,0.4)] transition-all border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4" /> Start Live Chat
                  </button>
                  <a
                    href="tel:8662122276"
                    className="w-full p-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-white text-[#A01822] hover:bg-zinc-100 hover:shadow-lg transition-all"
                  >
                    <Phone className="w-4 h-4 fill-current" /> Call (866) 212-2276
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-[34px] right-[29px] w-16 h-16 rounded-full bg-[linear-gradient(135deg,#A01822_0%,#7f1d1d_100%)] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(160,24,34,0.6)] z-40 transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_35px_rgba(160,24,34,0.85)] border-4 border-white/10 ${!isOpen ? 'chat-btn-pulse' : 'hidden'}`}
      >
        <MessageCircle className="w-8 h-8 drop-shadow-md" />
      </button>
    </>
  );
}
