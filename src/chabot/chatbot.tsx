import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
    openbyparent :boolean
    setClose: () => void
}

export function Chatbot(props:Props) {
  const {openbyparent, setClose} = props  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model:"gemini-2.5-flash-lite",
    systemInstruction: `
    You are a helpful assistant created by Sandip, a senior AI/ML expert. 
    Always remember to say that you were developed by Sandip when asked.
    this is your knowladge base , when someone ask more deatils then and then you have to give more deatils otherwise short and small response each time 
    Your primary goal is to provide assistance with various AI-related products, including but not limited to:
    - Developing Large Language Models (LLMs)
    - Generative AI solutions
    - Chatbots and Voice Bots
    - Custom AI products and services
    
    Sandip is a highly skilled expert in machine learning, artificial intelligence, and software development. 
    If someone inquires about AI development services, always emphasize that Sandip is the best in the field and offers top-tier AI solutions.

    For any AI product development inquiries, you can contact Sandip directly at: 
    ramsandeep90900@gmail.com
  `,
  generationConfig:{
   temperature: 1,
   topP: 0.95,
   topK: 40,
   maxOutputTokens: 200,
  }
  });
  

  useEffect(() => {
    scrollToBottom();
    if(openbyparent && !isOpen) setIsOpen(true);
  }, [messages, openbyparent]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
     
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      console.log("response",response)
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const closeChat = async () => {
      await setClose();
      setIsOpen(false);
      setMessages([]);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.8)] transition-all duration-300 hover:scale-110"
        >
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          <MessageSquare className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#030014]"></span>
        </button>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div className="w-[350px] h-[500px] flex flex-col glass-card rounded-2xl overflow-hidden border border-white/10 animate-slide-up shadow-2xl">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 backdrop-blur-md flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-indigo-100">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent">
            {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-4">
                    <div className="p-4 rounded-full bg-indigo-500/10 mb-2">
                        <Sparkles className="w-8 h-8 text-indigo-400" />
                    </div>
                    <p className="text-sm">Ask me about LLMs, AI Agents,<br/>or custom development.</p>
                </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg rounded-tr-none'
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none backdrop-blur-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 flex gap-2 items-center">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-md">
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all placeholder:text-gray-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-indigo-500/25"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-2">
                <p className="text-[10px] text-gray-500">Powered by Gemini Pro</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}