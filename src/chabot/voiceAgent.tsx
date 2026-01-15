import React, { useMemo, useState, useEffect } from 'react';
import { Mic, X, Wand2, Volume2, Globe, Sparkles } from 'lucide-react';
import Vapi from "@vapi-ai/web";

export function VoiceAgent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isListening, setIsListening] = useState(false);
  const [talk , setTalk] = React.useState(false);
  const [pending , setPending] = React.useState(false);
  const [volume, setVolume] = useState([10, 20, 30, 40, 30, 20, 10]);

  const vapi = useMemo(()=>{
   return new Vapi(import.meta.env.VITE_VAPI_API_KEY);
  },[]) 

  // Simulation of audio visualizer
  useEffect(() => {
    let interval: any;
    if (isListening) {
      interval = setInterval(() => {
        setVolume(prev => prev.map(() => Math.floor(Math.random() * 50) + 15));
      }, 80);
    } else {
        setVolume([15, 25, 40, 50, 40, 25, 15]);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleVapi = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsListening(!isListening)
    setPending(true);
    vapi.start("57a2f3fd-1d12-40bf-b490-45c159782c7f").then(() => {setPending(false)});
    console.log("calling")
    setTalk(true)
};

const handleStop = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
        vapi.removeAllListeners()
        await vapi.stop();
        console.log("Stopped voice agent");
        setTalk(false);
        setIsListening(!isListening)
    } catch (error) {
        console.error("Error stopping VAPI:", error);
    } finally {
        setPending(false);
    }
};

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#030014]/90 backdrop-blur-2xl flex items-center justify-center z-[60] animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md mx-6" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Halo Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/20 to-transparent rounded-full blur-[100px] animate-pulse-glow pointer-events-none"></div>

        {/* Main Interface */}
        <div className="relative bg-[#0a0a16] border border-white/10 rounded-[3rem] p-12 flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_70px_rgba(79,70,229,0.2)]">
          
          {/* Internal Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-12 flex flex-col items-center">
             <div className="relative mb-6">
               <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-30 animate-pulse"></div>
               <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1a1a2e] to-[#16213e] flex items-center justify-center border border-white/10 shadow-inner">
                  <Sparkles className="w-8 h-8 text-indigo-400 animate-spin-slow" />
               </div>
             </div>
             <h2 className="text-3xl font-light tracking-wide text-white">Neural<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Voice</span></h2>
          </div>

          {/* Futuristic Visualizer */}
          <div className="h-32 flex items-center justify-center gap-1.5 mb-14 w-full max-w-[240px]">
            {volume.map((h, i) => (
              <div 
                key={i}
                className={`w-1.5 rounded-full transition-all duration-150 ease-out ${
                    isListening 
                    ? 'bg-gradient-to-t from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_20px_rgba(139,92,246,0.6)]' 
                    : 'bg-white/5'
                }`}
                style={{ height: `${h}px` }}
              ></div>
            ))}
          </div>

          {/* Controls */}
          <div className="relative group cursor-pointer" onClick={(e:any) => { talk ? handleStop(e) : handleVapi(e)}}>
            {isListening && (
               <>
                 <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-[ping_2s_ease-in-out_infinite] opacity-40 scale-150"></div>
                 <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-[ping_2s_ease-in-out_infinite_0.5s] opacity-40 opacity-30 scale-125"></div>
                 <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
               </>
            )}
            
            <button
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl border border-white/10 z-10 ${
                isListening 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-700 shadow-[0_0_50px_rgba(79,70,229,0.5)] scale-110' 
                  : 'bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:shadow-indigo-500/20'
              }`}
            >
              <Mic className={`w-8 h-8 transition-all duration-300 ${isListening ? 'text-white' : 'text-gray-400 group-hover:text-indigo-400'}`} />
            </button>
          </div>

          {/* Status Text */}
          <div className="mt-12 h-6 flex items-center justify-center">
             <p className="font-light tracking-[0.2em] uppercase text-[10px] text-center">
               {isListening 
                 ? pending 
                    ? <span className="animate-pulse text-indigo-300">Establishing Connection...</span> 
                    : <span className="flex items-center gap-2 text-indigo-200"><span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></span> Online & Listening</span> 
                 : <span className="text-gray-600 transition-colors group-hover:text-gray-400">Initialize System</span>}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
