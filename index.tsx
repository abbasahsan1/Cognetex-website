import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Code, Brain, Cpu, Globe, Database, Cloud, Users, Mail, Phone, MessageSquare, ArrowRight, Sparkles, Bot, Languages, Layers, Link2, Zap, Github, Linkedin, Twitter, Menu, X, CheckCircle, TrendingUp, Award, Hexagon, Activity, Terminal, Braces, Server, GitBranch, Workflow, Binary } from 'lucide-react';

export default function CognetexWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Check visible sections for animations
      const sections = ['services', 'projects', 'expertise', 'team', 'blog', 'why', 'contact'];
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.75) {
            setVisibleSections(prev => new Set([...prev, sectionId]));
          }
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const services = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Agentic AI",
      description: "We design autonomous AI agents that can reason, plan, and take action — driving smarter workflows, adaptive decision-making, and continuous optimization.",
      gradient: "from-orange-400 to-red-500",
      delay: 0
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Generative AI",
      description: "From text and images to code and audio, our Generative AI solutions unleash creativity and automation at scale, empowering businesses to build new products.",
      gradient: "from-orange-500 to-pink-500",
      delay: 100
    },
    {
      icon: <Languages className="w-8 h-8" />,
      title: "Natural Language Processing",
      description: "We build NLP solutions such as chatbots, sentiment analysis, summarization, and translation — enabling more natural, meaningful interactions.",
      gradient: "from-orange-400 to-amber-500",
      delay: 200
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI & Machine Learning",
      description: "Transform raw data into insights. Our custom AI/ML models power predictive analytics, recommendation systems, and smart automation.",
      gradient: "from-orange-500 to-red-600",
      delay: 300
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Full Stack Development",
      description: "From frontend to backend, we craft scalable web and mobile applications using React.js, Next.js, Node.js, Flutter, and Python.",
      gradient: "from-orange-400 to-yellow-500",
      delay: 400
    },
    {
      icon: <Link2 className="w-8 h-8" />,
      title: "Integration & Automation",
      description: "We connect systems, automate workflows, and streamline operations to make businesses faster, smarter, and more efficient.",
      gradient: "from-orange-500 to-red-500",
      delay: 500
    }
  ];

  const techStack = [
    { 
      category: "AI/ML", 
      tools: ["Python", "TensorFlow", "PyTorch", "HuggingFace"],
      icon: <Brain className="w-6 h-6" />,
      color: "from-orange-400 to-red-500"
    },
    { 
      category: "Web & Mobile", 
      tools: ["Next.js", "React.js", "Node.js", "Flutter", "Firebase", "Supabase"],
      icon: <Globe className="w-6 h-6" />,
      color: "from-orange-500 to-pink-500"
    },
    { 
      category: "Data & Infrastructure", 
      tools: ["MongoDB", "PostgreSQL", "Docker", "AWS", "Kubernetes", "Terraform"],
      icon: <Server className="w-6 h-6" />,
      color: "from-orange-400 to-amber-500"
    }
  ];

  const blogPosts = [
    {
      title: "The Future of Agentic AI",
      description: "How autonomous AI agents are reshaping business workflows.",
      readTime: "3 min read",
      category: "AI Research",
      date: "Dec 2024"
    },
    {
      title: "Generative AI in Action",
      description: "Real-world use cases of GenAI transforming industries.",
      readTime: "2 min read",
      category: "Case Study",
      date: "Dec 2024"
    },
    {
      title: "Scaling with Full Stack Development",
      description: "Best practices for building apps that grow with your business.",
      readTime: "4 min read",
      category: "Engineering",
      date: "Nov 2024"
    }
  ];

  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      description: "Real-time data processing with predictive insights for enterprise clients.",
      tags: ["TensorFlow", "React", "AWS"],
      metrics: { users: "10K+", accuracy: "99.2%", uptime: "99.9%" }
    },
    {
      title: "Autonomous Customer Service Agent",
      description: "NLP-driven chatbot handling 80% of support queries autonomously.",
      tags: ["GPT-4", "Node.js", "MongoDB"],
      metrics: { queries: "1M+", satisfaction: "4.8/5", response: "<2s" }
    },
    {
      title: "Generative Content Platform",
      description: "AI-powered content generation for marketing teams at scale.",
      tags: ["Stable Diffusion", "Next.js", "PostgreSQL"],
      metrics: { generated: "500K+", teams: "200+", efficiency: "10x" }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse"
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 rounded-full filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(251,146,60,0.03)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-2xl bg-slate-900/80 border-b border-orange-500/20 shadow-2xl shadow-orange-500/5' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <Code className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">Cognetex</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-10">
              {['Services', 'Projects', 'Expertise', 'Team', 'Blog'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 hover:text-orange-400 transition-colors duration-300">{item}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <a href="#contact" className="relative group px-6 py-3 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-transform duration-300 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 font-semibold flex items-center">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden relative w-10 h-10 focus:outline-none">
              <span className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
              <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-20 left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-b border-orange-500/20 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <div className="px-6 py-8 space-y-4">
            {['Services', 'Projects', 'Expertise', 'Team', 'Blog'].map((item, index) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="block py-3 text-lg hover:text-orange-400 transition-all duration-300 transform hover:translate-x-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="block py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-center font-semibold">
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full filter blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-xl border border-orange-500/30 rounded-full animate-fade-in-up">
            <Zap className="w-5 h-5 text-orange-400 mr-3 animate-pulse" />
            <span className="text-orange-400 font-medium">Engineering tomorrow's technology, today</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in-up animation-delay-200">
            <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent inline-block transform hover:scale-105 transition-transform duration-300">
              Cognetex
            </span>
          </h1>
          
          <div className="flex items-center justify-center space-x-4 mb-8 animate-fade-in-up animation-delay-400">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-500"></div>
            <p className="text-2xl md:text-4xl font-bold text-orange-400">
              Code It. Scale It. Nail It.
            </p>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-orange-500"></div>
          </div>
          
          <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
            We deliver intelligent, scalable, and future-ready software solutions powered by AI, automation, and modern development stacks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-800">
            <a href="#services" className="group relative px-10 py-5 overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center justify-center font-semibold text-lg">
                Explore Our Services
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </a>
            <a href="#contact" className="group px-10 py-5 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-2xl hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 flex items-center justify-center font-semibold text-lg">
              Start a Project
              <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
            </a>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400/20 to-orange-600/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-orange-500/20">
              <Terminal className="w-10 h-10 text-orange-400" />
            </div>
          </div>
          <div className="absolute bottom-20 right-10 animate-float-delayed">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-orange-500/20">
              <Braces className="w-12 h-12 text-orange-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-32 px-4 relative transition-all duration-1000 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 font-medium mb-6">
              What We Do
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              We deliver intelligent, scalable, and future-ready software solutions powered by AI, automation, and modern development stacks.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group relative"
                style={{ animationDelay: `${service.delay}ms` }}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-orange-500/40 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
                  
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-orange-400 group-hover:text-orange-300 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className={`mt-6 flex items-center text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0`}>
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-32 px-4 relative transition-all duration-1000 ${visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 font-medium mb-6">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Our Projects
            </h2>
            <p className="text-gray-400 text-xl">Some of the solutions we've delivered</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-orange-500/20 rounded-3xl overflow-hidden hover:border-orange-500/40 transition-all duration-500 hover:scale-105">
                  <div className="relative h-56 bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    <div className="grid grid-cols-3 gap-2 p-8">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-orange-500/20 rounded-lg animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-orange-400 group-hover:text-orange-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 text-orange-400 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-orange-500/20">
                      {Object.entries(project.metrics).map(([key, value], i) => (
                        <div key={i} className="text-center">
                          <div className="text-xl font-bold text-orange-400">{value}</div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a href="#" className="inline-flex items-center px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 group">
              <span className="text-orange-400 font-semibold">View All Projects</span>
              <ArrowRight className="w-5 h-5 ml-3 text-orange-400 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className={`py-32 px-4 relative transition-all duration-1000 ${visibleSections.has('expertise') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 font-medium mb-6">
              Tech Stack
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Our Expertise & Toolkit
            </h2>
            <p className="text-gray-400 text-xl">We leverage a proven tech stack to build robust and future-ready solutions</p>
          </div>
          
          <div className="space-y-8">
            {techStack.map((stack, index) => (
              <div 
                key={index} 
                className="group relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 hover:border-orange-500/40 transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${stack.color} rounded-2xl flex items-center justify-center mr-4`}>
                      {stack.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-orange-400">{stack.category}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {stack.tools.map((tool, toolIndex) => (
                      <div 
                        key={toolIndex} 
                        className="group/tool relative px-4 py-3 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl hover:border-orange-500/50 hover:from-orange-500/20 hover:to-orange-600/20 transition-all duration-300 text-center cursor-pointer transform hover:scale-105"
                        style={{ animationDelay: `${toolIndex * 50}ms` }}
                      >
                        <span className="font-medium text-orange-300 group-hover/tool:text-orange-200 transition-colors">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className={`py-32 px-4 relative transition-all duration-1000 ${visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 font-medium mb-6">
              Our People
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Behind every solution is a team of engineers, designers, and innovators dedicated to pushing the boundaries of technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { role: "AI Specialists", desc: "Experts in Agentic AI, ML models, and Generative systems", icon: <Brain className="w-8 h-8" /> },
              { role: "Full Stack Developers", desc: "Skilled in React, Next.js, Node.js, and scalable cloud systems", icon: <Code className="w-8 h-8" /> },
              { role: "Data Engineers", desc: "Building pipelines and architectures that turn raw data into intelligence", icon: <Database className="w-8 h-8" /> },
              { role: "UX & Product Designers", desc: "Crafting intuitive, user-first digital experiences", icon: <Layers className="w-8 h-8" /> }
            ].map((member, index) => (
              <div 
                key={index} 
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 hover:bg-white/10 hover:border-orange-500/40 transition-all duration-500 hover:scale-105 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {member.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-orange-400 group-hover:text-orange-300 transition-colors">
                    {member.role}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center bg-gradient-to-r from-orange-500/10 via-orange-600/10 to-orange-500/10 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-12">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We believe in <span className="text-orange-400 font-semibold">collaboration</span>, <span className="text-orange-400 font-semibold">innovation</span>, and <span className="text-orange-400 font-semibold">craftsmanship</span> — values that drive us to deliver technology with impact.
            </p>
            <a href="#" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 group">
              <span className="font-semibold">Meet the Team</span>
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className={`py-32 px-4 relative transition-all duration-1000 ${visibleSections.has('blog') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 font-medium mb-6">
              Insights
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Our Blog
            </h2>
            <p className="text-gray-400 text-xl">Explore insights, trends, and ideas from our team of experts</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <div 
                key={index} 
                className="group relative cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 hover:bg-white/10 hover:border-orange-500/40 transition-all duration-500 hover:scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-orange-400 group-hover:text-orange-300 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <ArrowRight className="w-5 h-5 text-orange-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a href="#" className="inline-flex items-center px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 group">
              <span className="text-orange-400 font-semibold">Read All Blogs</span>
              <ArrowRight className="w-5 h-5 ml-3 text-orange-400 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why" className={`py-32 px-4 relative transition-all duration-1000 ${visibleSections.has('why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 font-medium mb-6">
              Why Us
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Why Axxiom Software
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <TrendingUp className="w-8 h-8" />, title: "Scalable Solutions", desc: "Built to grow with your business", gradient: "from-orange-400 to-red-500" },
              { icon: <Brain className="w-8 h-8" />, title: "AI-First Mindset", desc: "Harnessing Agentic AI, ML, and automation", gradient: "from-orange-500 to-pink-500" },
              { icon: <Layers className="w-8 h-8" />, title: "End-to-End Expertise", desc: "From product design to deployment", gradient: "from-orange-400 to-amber-500" },
              { icon: <Award className="w-8 h-8" />, title: "Proven Impact", desc: "Delivering real results across industries", gradient: "from-orange-500 to-red-600" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative inline-block mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-3xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-400 group-hover:text-orange-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-32 px-4 relative transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-red-500/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/20 rounded-full filter blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/40 rounded-full text-orange-400 font-medium mb-6">
                  Let's Connect
                </span>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="text-gray-300 text-xl">Ready to transform your ideas into reality? Let's talk.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  { label: "General Inquiries", email: "axixomsoftware+info@gmail.com", icon: <Mail className="w-6 h-6" /> },
                  { label: "Support", email: "axixomsoftware+support@gmail.com", icon: <MessageSquare className="w-6 h-6" /> },
                  { label: "Projects", email: "axixomsoftware+projects@gmail.com", icon: <Workflow className="w-6 h-6" /> }
                ].map((contact, index) => (
                  <a 
                    key={index}
                    href={`mailto:${contact.email}`} 
                    className="group flex items-center space-x-4 p-6 bg-white/5 backdrop-blur-xl border border-orange-500/30 rounded-2xl hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      {contact.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{contact.label}</p>
                      <p className="text-orange-400 group-hover:text-orange-300 transition-colors break-all">
                        {contact.email}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="flex justify-center">
                <a 
                  href="https://wa.me/923288521430" 
                  className="group flex items-center space-x-4 px-8 py-6 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-xl border border-green-500/30 rounded-2xl hover:from-green-500/30 hover:to-green-600/30 hover:border-green-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">WhatsApp</p>
                    <p className="text-green-400 group-hover:text-green-300 transition-colors font-semibold">
                      +92 328 8521430
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-orange-500/20 bg-gradient-to-b from-transparent to-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center space-x-3 mb-6 md:mb-0 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <Code className="w-7 h-7 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold">Axxiom Software</span>
            </div>
            
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Zap className="w-5 h-5 text-orange-400" />
              <p className="text-orange-400 font-bold text-lg">Code It. Scale It. Nail It.</p>
            </div>
            
            <div className="flex space-x-4">
              {[
                { icon: <Github className="w-5 h-5" />, href: "#" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                { icon: <Twitter className="w-5 h-5" />, href: "#" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="group w-12 h-12 bg-white/5 backdrop-blur-xl border border-orange-500/30 rounded-xl flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2024 Axxiom Software. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-800 {
          animation-delay: 800ms;
        }
      `}</style>
    </div>
  );
}