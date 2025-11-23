import React, { useMemo } from 'react';
import { Brain, Bot, Mic, Code, Database, Eye, Cpu, Sparkles, Github, Linkedin, Mail, Cloud, Workflow, Box, MessageSquare, Layers, Network, Boxes, Star,PhoneCallIcon } from 'lucide-react';
import { Chatbot } from './chabot/chatbot';

import { VoiceAgent } from './chabot/voiceAgent';

function App() {
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = React.useState(false);
  const [open,setOpen] = React.useState(false);
 
  const projects = [
    {
      title: "Enterprise LLM Platform",
      description: "Multi-model LLM platform integrating GPT-4, Claude 2, PaLM, and Llama 2 with custom RAG pipeline using multiple vector stores.",
      icon: <Brain className="w-8 h-8 text-indigo-500" />,
      tags: ["LangChain", "Pinecone", "OpenAI", "Anthropic", "RAG"]
    },
    {
      title: "Intelligent Voice Assistant",
      description: "Advanced voice AI system using Whisper, ElevenLabs, and custom STT/TTS pipelines with multi-language support.",
      icon: <Mic className="w-8 h-8 text-indigo-500" />,
      tags: ["Whisper", "ElevenLabs", "VAPI", "Bland"]
    },
    {
      title: "Retail Analytics AI",
      description: "Computer vision system for retail analytics using YOLO and pose estimation for customer behavior analysis.",
      icon: <Eye className="w-8 h-8 text-indigo-500" />,
      tags: ["TensorFlow", "OpenCV", "YOLO", "Pose Estimation"]
    },
    {
      title: "Multi-Agent AI System",
      description: "Autonomous AI agents for task automation using CrewAI and LangChain with custom orchestration.",
      icon: <Network className="w-8 h-8 text-indigo-500" />,
      tags: ["CrewAI", "LangChain", "Autonomous Agents"]
    },
    {
      title: "Enterprise Chatbot Suite",
      description: "Omnichannel chatbot system with integration across multiple platforms and custom NLP pipeline.",
      icon: <MessageSquare className="w-8 h-8 text-indigo-500" />,
      tags: ["Rasa", "Botpress", "DialogFlow", "Custom NLP"]
    },
    {
      title: "Cloud ML Pipeline",
      description: "End-to-end ML pipeline deployed across major cloud providers with automated training and inference.",
      icon: <Cloud className="w-8 h-8 text-indigo-500" />,
      tags: ["AWS SageMaker", "Azure ML", "Google Vertex AI"]
    },
    {
      title: "Automation Workflow Platform",
      description: "No-code automation platform connecting AI services with popular business tools and custom integrations.",
      icon: <Workflow className="w-8 h-8 text-indigo-500" />,
      tags: ["Make.com", "Zapier", "n8n", "ManyChat"]
    },
    {
      title: "Vector Search Engine",
      description: "Scalable vector search system supporting multiple vector databases with custom indexing and query optimization.",
      icon: <Database className="w-8 h-8 text-indigo-500" />,
      tags: ["Pinecone", "Weaviate", "Milvus", "Qdrant"]
    }
  ];

  const skills = [
    {
      category: "LLM & NLP",
      icon: <Brain className="w-6 h-6 mb-2" />,
      items: ["GPT-4", "Claude 2", "PaLM", "Llama 2", "LangChain", "CrewAI", "LlamaIndex", "Semantic Kernel"]
    },
    {
      category: "Voice & Speech",
      icon: <Mic className="w-6 h-6 mb-2" />,
      items: ["Whisper", "ElevenLabs", "VAPI", "Bland", "Coqui", "Mozilla TTS"]
    },
    {
      category: "Vector Stores",
      icon: <Database className="w-6 h-6 mb-2" />,
      items: ["Pinecone", "Weaviate", "Milvus", "Qdrant", "ChromaDB", "FAISS"]
    },
    {
      category: "Cloud ML",
      icon: <Cloud className="w-6 h-6 mb-2" />,
      items: ["AWS SageMaker", "Azure ML", "Vertex AI", "Hugging Face"]
    },
    {
      category: "Automation",
      icon: <Workflow className="w-6 h-6 mb-2" />,
      items: ["Make.com", "Zapier", "n8n", "ManyChat", "GHL", "Power Automate"]
    },
    {
      category: "Chatbot Platforms",
      icon: <MessageSquare className="w-6 h-6 mb-2" />,
      items: ["Rasa", "Botpress", "DialogFlow", "Custom Solutions"]
    }
  ];

  const testimonials = [
    {
  name: "Ven B",
  image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?fit=crop&w=100&h=100",
  rating: 5,
  project: "Artificial Intelligence / Natural Language - Phone Survey",
  feedback: "The AI-powered phone survey system worked incredibly well. It understood responses accurately, handled follow-up questions intelligently, and made the entire survey process fully automated and efficient."
}
,
    {
  name: "Vic",
  image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=100&h=100",
  rating: 5,
  project: "AI Agent Development for Instagram",
  feedback: "The Instagram AI agent automated our DMs perfectly and increased engagement significantly."
},

    {
      name: "John Smith",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=100&h=100",
      rating: 5,
      project: "Enterprise LLM Platform",
      feedback: "Exceptional work on our LLM integration. The custom RAG pipeline significantly improved our document processing efficiency."
    },
    {
      name: "Kornelia Fedrich",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100",
      rating: 5,
      project: "Guest House AI-booking Chatbot",
      feedback: "Sandip delivered excellent work on our AI Agent development project, and it was a pleasure working with him. His communication was outstanding, always clear and professional, and he consistently met all milestones on time. Sandip demonstrated great patience and politeness throughout the project, which made collaborating with him seamless and enjoyable"
    },
    {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=100&h=100",
      rating: 5,
      project: "Voice AI System",
      feedback: "The voice assistant implementation exceeded our expectations. The multi-language support is flawless."
    },
    {
  name: "Ethan Brooks",
  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=100&h=100",
  rating: 5,
  project: "WhatsApp Reservation Automation for Restaurant",
  feedback: "The WhatsApp reservation automation worked perfectly. It handled bookings smoothly, reduced manual workload, and improved our customer experience instantly."
}
,
{
  name: "James Walker",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100",
  rating: 5,
  project: "Build AI Chatbot MVP with Sheet",
  feedback: "The AI chatbot MVP connected to Google Sheets worked seamlessly. It automated data handling, delivered accurate responses, and gave us a solid foundation to scale the product."
}

  ];

  const testimonialRef = React.useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left">
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur opacity-75"></div>
            <Brain className="w-20 h-20 relative text-white" />
          </div>
          <h1 className="mt-8 text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Sr. AI & ML Expert
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl">
            Specialized in LLMs, Voice AI, and Enterprise AI Solutions
          </p>
          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            {/* <a href="#contact" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full transition">
              Contact Me
            </a> */}
            <a href="#projects" className="px-6 py-3 border border-indigo-600 rounded-full hover:bg-indigo-600/10 transition">
              View Projects
            </a>
            <div onClick={()=>setOpen(!open)} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full transition cursor-pointer">
            <Bot className="w-5 h-5" /> Chat With AI Agent
            </div>
            <div onClick={ (e:any)=> { 
              setIsVoiceAgentOpen(true)
              }} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full transition flex items-center gap-2 cursor-pointer">
              <PhoneCallIcon className="w-5 h-5" />  Talk With Voice Agent
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0">
          <div className="relative w-64 h-64 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur opacity-75"></div>
            <img
              src="\sandip.jpeg"
              alt="Profile"
              className="relative rounded-full w-full h-full object-cover border-4 border-indigo-600"
            />
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto text-gray-300 space-y-4">
            <p>
              With 3 years of specialized experience in AI and Machine Learning, I create intelligent solutions that drive business value. My expertise spans across LLMs, chatbots, voice agents, and generative AI applications.
            </p>
            <p>
              I specialize in building scalable AI systems using cutting-edge technologies like LangChain, CrewAI, and various LLM providers. My experience includes working with major cloud ML platforms and implementing sophisticated RAG systems with multiple vector stores.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-800/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Global Client Reviews</h2>
          <div 
            ref={testimonialRef}
            className="flex space-x-6 overflow-x-auto pb-4 snap-x"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-none w-[350px] bg-gray-900/50 p-6 rounded-xl snap-start"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    {/* <p className="text-sm text-gray-400">{testimonial.company}</p> */}
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-2">Project: {testimonial.project}</p>
                <p className="text-gray-400 italic">&quot;{testimonial.feedback}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800/70 transition group">
                <div className="mb-4 transform group-hover:scale-110 transition-transform">
                  {project.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-xl hover:bg-gray-900/70 transition">
                <div className="flex items-center justify-center mb-4">
                  {skillGroup.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Let's Work Together</h2>
          <div className="flex justify-center gap-6">

          <a href="mailto:ramsandeep00000@gmail.com" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition">
              <Mail className="w-6 h-6" />
          </a>
            <a href="https://github.com" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition">
              <Linkedin className="w-6 h-6" />
            </a>
            
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-400">
        <p>© 2025-26 AI & ML Expert. All rights reserved.</p>
      </footer>
      <Chatbot openbyparent={open} setClose={() => setOpen(!open)} />
      <VoiceAgent isOpen={isVoiceAgentOpen} onClose={() => setIsVoiceAgentOpen(false)} />
    </div>
    
  );
}

export default App;