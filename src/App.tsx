import React, { useState, useEffect } from 'react';
import { Brain, Bot, Mic, Monitor, Database, Globe, Cpu, Layout, Github, Linkedin, Mail, Cloud, Workflow, MessageSquare, PhoneCall, Code2, Terminal, Rocket, Layers, Sparkles, Star } from 'lucide-react';
import { Chatbot } from './chabot/chatbot';
import { VoiceAgent } from './chabot/voiceAgent';

function App() {
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Enterprise LLM Platform",
      description: "Multi-model LLM platform integrating GPT-4, Claude 2, PaLM, and Llama 2 with custom RAG pipeline using multiple vector stores.",
      icon: <Brain className="w-8 h-8 text-indigo-400" />,
      tags: ["LangChain", "Pinecone", "OpenAI", "Anthropic"]
    },
    {
      title: "Intelligent Voice Assistant",
      description: "Advanced voice AI system using Whisper, ElevenLabs, and custom STT/TTS pipelines with multi-language support.",
      icon: <Mic className="w-8 h-8 text-purple-400" />,
      tags: ["Whisper", "ElevenLabs", "VAPI", "Bland"]
    },
    {
      title: "Retail Analytics AI",
      description: "Computer vision system for retail analytics using YOLO and pose estimation for customer behavior analysis.",
      icon: <Monitor className="w-8 h-8 text-cyan-400" />,
      tags: ["TensorFlow", "OpenCV", "YOLO", "Pose Estimation"]
    },
    {
      title: "Multi-Agent AI System",
      description: "Autonomous AI agents for task automation using CrewAI and LangChain with custom orchestration.",
      icon: <Cpu className="w-8 h-8 text-pink-400" />,
      tags: ["CrewAI", "LangChain", "Autonomous Agents"]
    },
    {
      title: "Enterprise Chatbot Suite",
      description: "Omnichannel chatbot system with integration across multiple platforms and custom NLP pipeline.",
      icon: <MessageSquare className="w-8 h-8 text-indigo-400" />,
      tags: ["Rasa", "Botpress", "DialogFlow", "Custom NLP"]
    },
    {
      title: "Cloud ML Pipeline",
      description: "End-to-end ML pipeline deployed across major cloud providers with automated training and inference.",
      icon: <Cloud className="w-8 h-8 text-blue-400" />,
      tags: ["AWS SageMaker", "Azure ML", "Google Vertex AI"]
    },
    {
      title: "Automation Workflow Platform",
      description: "No-code automation platform connecting AI services with popular business tools and custom integrations.",
      icon: <Workflow className="w-8 h-8 text-green-400" />,
      tags: ["Make.com", "Zapier", "n8n", "ManyChat"]
    },
    {
      title: "Vector Search Engine",
      description: "Scalable vector search system supporting multiple vector databases with custom indexing and query optimization.",
      icon: <Database className="w-8 h-8 text-yellow-400" />,
      tags: ["Pinecone", "Weaviate", "Milvus", "Qdrant"]
    }
  ];

  const skills = [
    {
      category: "LLM & NLP",
      icon: <Brain className="w-6 h-6 mb-2 text-indigo-400" />,
      items: ["GPT-4", "Claude 2", "PaLM", "Llama 2", "LangChain", "CrewAI"]
    },
    {
      category: "Voice & Speech",
      icon: <Mic className="w-6 h-6 mb-2 text-purple-400" />,
      items: ["Whisper", "ElevenLabs", "VAPI", "Bland", "Coqui"]
    },
    {
      category: "Vector Stores",
      icon: <Database className="w-6 h-6 mb-2 text-cyan-400" />,
      items: ["Pinecone", "Weaviate", "Milvus", "Qdrant", "ChromaDB"]
    },
    {
      category: "Cloud ML",
      icon: <Cloud className="w-6 h-6 mb-2 text-blue-400" />,
      items: ["AWS SageMaker", "Azure ML", "Vertex AI", "Hugging Face"]
    },
    {
      category: "Automation",
      icon: <Workflow className="w-6 h-6 mb-2 text-green-400" />,
      items: ["Make.com", "Zapier", "n8n", "ManyChat", "GHL"]
    },
    {
      category: "Chatbot Platforms",
      icon: <MessageSquare className="w-6 h-6 mb-2 text-pink-400" />,
      items: ["Rasa", "Botpress", "DialogFlow", "Custom Solutions"]
    }
  ];

  const testimonials = [
    {
      name: "Ven B",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?fit=crop&w=100&h=100",
      rating: 5,
      project: "AI Phone Survey",
      feedback: "The AI-powered phone survey system worked incredibly well. It understood responses accurately and handled follow-up questions intelligently."
    },
    {
      name: "Vic",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=100&h=100",
      rating: 5,
      project: "Instagram AI Agent",
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
      project: "Booking Chatbot",
      feedback: "Sandip delivered excellent work on our AI Agent development project. His communication was outstanding, always clear and professional."
    },
    {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=100&h=100",
      rating: 5,
      project: "Voice AI System",
      feedback: "The voice assistant implementation exceeded our expectations. The multi-language support is flawless."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-white selection:bg-indigo-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#030014]/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-50"></div>
              <Brain className="w-8 h-8 text-indigo-400 relative z-10" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Sandip<span className="text-indigo-500">.AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 transition-all flex items-center gap-2 group"
            >
              <Bot className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
              <span>Talk to AI</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 animate-float">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-200">Available for innovative AI projects</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Building the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 text-glow">
                Intelligent Future
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Senior AI & ML Expert specializing in Large Language Models, Generative AI, and Autonomous Agents. Transforming complex data into intelligent action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#projects" className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                View Projects
              </a>
              <button 
                onClick={() => setIsVoiceAgentOpen(true)}
                className="px-8 py-4 rounded-full glass-panel hover:bg-white/10 text-white font-medium transition-all border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 group"
              >
                <PhoneCall className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                Voice Demo
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative z-10">
            <div className="relative w-[300px] h-[300px] sm:w-[300px] sm:h-[300px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 rounded-full blur-[60px] animate-pulse-glow"></div>
              <div className="relative w-full h-full rounded-full border-2 border-white/10 glass-panel p-2">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030014]/80 z-10"></div>
                   <img src="/newsan.png" alt="Sandip - AI Expert" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700" />
                </div>
                
                {/* Float Cards */}
                <div className="absolute top-12 -right-12 md:-right-24 p-4 rounded-xl glass-panel animate-float flex items-center gap-3 border-l-4 border-indigo-500 z-20">
                  <div className="p-2 rounded-lg bg-indigo-500/20">
                    <Brain className="w-6 h-6 text-indigo-300" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Specialization</div>
                    <div className="font-semibold text-white">LLM Architecture</div>
                  </div>
                </div>

                <div className="absolute bottom-10 -left-12 md:-left-24 p-4 rounded-xl glass-panel animate-float flex items-center gap-3 border-l-4 border-purple-500 z-20" style={{ animationDelay: '2s' }}>
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Code2 className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Stack</div>
                    <div className="font-semibold text-white">AI Automation Expert</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Innovations</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Exploring the frontiers of Artificial Intelligence with real-world applications and cutting-edge research.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover:-translate-y-2 group">
                <div className="mb-6 p-3 rounded-xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
                  {project.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/5 text-gray-300">
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
      <section id="skills" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/10 clip-path-slant"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Technical <span className="text-purple-400">Arsenal</span></h2>
              <p className="text-gray-400">Comprehensive toolkit for building scalable AI solutions</p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-indigo-500 rounded-full"></div>
              <div className="w-3 h-1 bg-gray-700 rounded-full"></div>
              <div className="w-3 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="glass-panel p-6 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-black/30">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-md bg-white/5 text-gray-300 border border-white/5 hover:border-indigo-500/30 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Success Stories</span></h2>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-[350px] md:min-w-[400px] glass-panel p-8 rounded-2xl snap-start relative flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <MessageSquare className="w-20 h-20 text-white" />
                </div>
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-300 mb-8 italic relative z-10">"{testimonial.feedback}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-indigo-500/30" />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-indigo-400">{testimonial.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="glass-panel max-w-4xl mx-auto p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px]"></div>
            
            <h2 className="text-4xl font-bold mb-6">Ready to <span className="text-indigo-400">Collaborate?</span></h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Open for discussions on LLM integration, Voice AI systems, and automated agentic workflows.
            </p>
            
            <div className="flex justify-center gap-6">
              <a href="mailto:ramsandeep90900@gmail.com" className="p-4 rounded-full glass-card hover:translate-y-[-5px] transition-transform group">
                <Mail className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </a>
              <a href="https://github.com" className="p-4 rounded-full glass-card hover:translate-y-[-5px] transition-transform group">
                <Github className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </a>
              <a href="www.linkedin.com/in/ram-sandeep-834325247" className="p-4 rounded-full glass-card hover:translate-y-[-5px] transition-transform group">
                <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <p>© 2026 Sandip.AI</p>
          <div className="flex gap-4">
             <span>Terms</span>
             <span>Privacy</span>
          </div>
        </div>
      </footer>

      {/* Interactive Agents */}
      <Chatbot openbyparent={isChatOpen} setClose={() => setIsChatOpen(false)} />
      <VoiceAgent isOpen={isVoiceAgentOpen} onClose={() => setIsVoiceAgentOpen(false)} />
    </div>
  );
}

export default App;
