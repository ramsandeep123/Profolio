import React, { useMemo, useState } from 'react';
import { Mic, X, Wand2 } from 'lucide-react';
import Vapi from "@vapi-ai/web";

export function VoiceAgent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isListening, setIsListening] = useState(false);
  const [talk , setTalk] = React.useState(false);
  const [pending , setPending] = React.useState(false);
  const vapi = useMemo(()=>{
   return new Vapi(import.meta.env.VITE_VAPI_API_KEY);
  },[]) 

  const handleVapi = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsListening(!isListening)
    setPending(true);
    vapi.start("57a2f3fd-1d12-40bf-b490-45c159782c7f").then(() => {setPending(false)});
    console.log("calling")
    setTalk(true)
};

const handleStop = async (e: React.MouseEvent<HTMLButtonElement>) => {
e.preventDefault();
try {
     // Optionally show a loading state
    vapi.removeAllListeners()
    await vapi.stop();
    
    console.log("Stopped voice agent");
    setTalk(false); // Update state after stopping
    setIsListening(!isListening)
} catch (error) {
    console.error("Error stopping VAPI:", error);
} finally {
    setPending(false); // Ensure pending state is cleared
}
};




  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Main circular container */}
        <div className="w-[300px] h-[300px] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center relative overflow-hidden">
          {/* Animated rings */}
          <div className={`absolute inset-0 ${isListening ? 'animate-pulse' : ''}`}>
            <div className="absolute inset-4 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-8 border-4 border-white/15 rounded-full"></div>
            <div className="absolute inset-12 border-4 border-white/10 rounded-full"></div>
          </div>

          {/* Center content */}
          <div className="relative z-10 text-center">
            <button
              onClick={(e:React.MouseEvent<HTMLButtonElement>) => { talk ? handleStop(e) : handleVapi(e)}}
              className={`w-20 h-20 mt-9 ml-1 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <Mic className={`w-8 h-8 ${isListening ? 'text-white' : 'text-indigo-600'}`} />
            </button>
            <p className="text-white mt-4 font-medium">
              {isListening ? pending ? "Connecting..." : 'Listening...' : 'Tap to speak'}
            </p>
          </div>

          {/* Animated wave effect */}
          {isListening && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full absolute">
                <div className="absolute inset-0 animate-ping opacity-25 bg-white rounded-full scale-50"></div>
                <div className="absolute inset-0 animate-ping opacity-25 bg-white rounded-full scale-75 delay-75"></div>
                <div className="absolute inset-0 animate-ping opacity-25 bg-white rounded-full scale-90 delay-150"></div>
              </div>
            </div>
          )}
        </div>

        {/* AI Status indicator */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white">
          <Wand2 className="w-5 h-5" />
          <span>AI Voice Agent Ready</span>
        </div>
      </div>
    </div>
  );
}