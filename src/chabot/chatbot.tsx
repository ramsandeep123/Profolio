import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
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
  console.log("VITE_GEMINI_API_KEY",genAI)
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
    
  }, [messages]);

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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && !openbyparent ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 ease-in-out"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-gray-900 rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col">
          <div className="p-4 bg-indigo-600 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <button
              onClick={async()=> {await setClose() ; await setIsOpen(false) ; setMessages([]) }}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-3">
                  <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}