"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Brain, Cpu, Globe, Database, Cloud, Users, Mail, Phone, MessageSquare, ArrowRight, Sparkles, Bot, Languages, Layers, Link2, Zap, Github, Linkedin, Twitter, Menu, X, CheckCircle, TrendingUp, Award, Hexagon, Activity, Terminal, Braces, Server, GitBranch, Workflow, Binary } from 'lucide-react';

export default function CognetexWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in sections
    const fadeInElements = document.querySelectorAll('.fade-in-section');
    fadeInElements.forEach((el) => observer.observe(el));

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
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
    <div className="min-h-screen text-white liquid-gradient-bg">
      {/* Liquid Glass Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black"></div>
        {/* Floating Glass Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-orange-400/15 to-red-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-orange-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        {/* Glass Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 glass-morphism rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20 group-hover:from-orange-400/30 group-hover:to-orange-600/30 transition-all duration-300"></div>
                <Code className="w-7 h-7 text-orange-400 relative z-10" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">Cognetex</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Projects', 'Expertise', 'Team', 'Blog'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium group"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 rounded-lg glass-morphism opacity-0 group-hover:opacity-100 transition-all duration-300 -m-2"></div>
                </a>
              ))}
              <a href="#contact" className="liquid-button px-6 py-3 rounded-2xl font-semibold text-white relative z-10">
                Get in Touch
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
        <div className={`md:hidden absolute top-20 left-4 right-4 glass-morphism rounded-3xl transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95 pointer-events-none'}`}>
          <div className="p-6 space-y-4">
            {['Services', 'Projects', 'Expertise', 'Team', 'Blog'].map((item, index) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="block py-3 px-4 text-gray-300 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5 relative group"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute inset-0 rounded-xl glass-morphism opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </a>
            ))}
            <a href="#contact" className="block liquid-button py-3 px-6 rounded-2xl text-center font-semibold mt-6 text-white" onClick={() => setIsMenuOpen(false)}>
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-flex items-center px-8 py-4 glass-morphism rounded-full animate-fade-in-up relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <Zap className="w-5 h-5 text-orange-400 mr-3 relative z-10" />
            <span className="text-gray-200 font-medium relative z-10">Engineering tomorrow's technology, today</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in-up animate-delay-200">
            <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block cursor-default">
              Cognetex
            </span>
          </h1>
          
          <div className="flex items-center justify-center space-x-6 mb-8 animate-fade-in-up animate-delay-300">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"></div>
            <div className="glass-morphism px-6 py-2 rounded-2xl">
              <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Code It. Scale It. Nail It.
              </p>
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent via-orange-500/70 to-transparent"></div>
          </div>
          
          <div className="glass-morphism p-8 rounded-3xl mb-16 animate-fade-in-up animate-delay-400 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              We deliver intelligent, scalable, and future-ready software solutions powered by AI, automation, and modern development stacks.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animate-delay-500">
            <a href="#services" className="liquid-button px-12 py-5 rounded-2xl font-bold text-lg flex items-center justify-center text-white group">
              Explore Our Services
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a href="#contact" className="glass-card-hover px-12 py-5 glass-morphism rounded-2xl flex items-center justify-center font-bold text-lg text-white group">
              Start a Project
              <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-4 relative fade-in-section">
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
                className="group relative fade-in-section"
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="glass-morphism glass-card-hover rounded-3xl p-8 relative overflow-hidden">
                  {/* Glass reflection effect */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
                  
                  <div className={`w-16 h-16 glass-morphism rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-80`}></div>
                    <div className="relative z-10 text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-100 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-orange-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 relative fade-in-section">
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
                className="group fade-in-section"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="glass-morphism glass-card-hover rounded-3xl overflow-hidden relative">
                  {/* Glass reflection effects */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
                  
                  <div className="h-48 glass-morphism flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10 group-hover:from-orange-500/20 group-hover:to-orange-600/20 transition-all duration-300"></div>
                    <div className="grid grid-cols-3 gap-3 p-6 relative z-10">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-6 h-6 glass-morphism rounded group-hover:scale-110 transition-all duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                          <div className="w-full h-full bg-gradient-to-br from-orange-400/30 to-orange-600/30 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-100 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 glass-morphism text-orange-300 rounded-full text-sm font-medium hover:scale-105 transition-all duration-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      {Object.entries(project.metrics).map(([key, value], i) => (
                        <div key={i} className="text-center group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
                          <div className="text-xl font-bold text-orange-400">{value}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider">{key}</div>
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
      <section id="expertise" className="py-32 px-4 relative fade-in-section">
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
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-300 fade-in-section"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stack.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                    {stack.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-100 transition-colors duration-300">{stack.category}</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {stack.tools.map((tool, toolIndex) => (
                    <div 
                      key={toolIndex} 
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-orange-500/30 hover:bg-white/10 hover:scale-105 hover:shadow-lg transition-all duration-200 text-center"
                      style={{ transitionDelay: `${toolIndex * 50}ms` }}
                    >
                      <span className="font-medium text-gray-300 hover:text-gray-200 transition-colors duration-200">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-4 relative fade-in-section">
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
                className="group glass-morphism glass-card-hover rounded-3xl p-8 text-center fade-in-section relative overflow-hidden"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Glass reflection effects */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
                
                <div className="w-18 h-18 glass-morphism rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/80 to-orange-600/80"></div>
                  <div className="relative z-10 text-white">
                    {member.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-100 transition-colors duration-300">
                  {member.role}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {member.desc}
                </p>
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
      <section id="blog" className="py-32 px-4 relative fade-in-section">
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
                className="group relative cursor-pointer fade-in-section"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-orange-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-100 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
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
      <section id="why" className="py-32 px-4 relative fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 font-medium mb-6">
              Why Us
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              Why Cognetex
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
                className="group text-center fade-in-section"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative inline-block mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 relative fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="relative glass-morphism rounded-3xl p-12 md:p-16 overflow-hidden">
            {/* Liquid glass background orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/15 to-orange-600/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-red-500/15 to-pink-500/10 rounded-full filter blur-3xl"></div>
            
            {/* Glass reflection effects */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <span className="inline-block px-6 py-3 glass-morphism rounded-full text-orange-400 font-medium mb-6">
                  Let's Connect
                </span>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="text-gray-200 text-xl">Ready to transform your ideas into reality? Let's talk.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  { label: "General Inquiries", email: "cognetex+info@gmail.com", icon: <Mail className="w-6 h-6" /> },
                  { label: "Support", email: "cognetex+support@gmail.com", icon: <MessageSquare className="w-6 h-6" /> },
                  { label: "Projects", email: "cognetex+projects@gmail.com", icon: <Workflow className="w-6 h-6" /> }
                ].map((contact, index) => (
                  <a 
                    key={index}
                    href={`mailto:${contact.email}`} 
                    className="group glass-morphism glass-card-hover flex items-center space-x-4 p-6 rounded-2xl relative overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <div className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/80 to-orange-600/80"></div>
                      <div className="relative z-10 text-white">
                        {contact.icon}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 mb-1">{contact.label}</p>
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
                  className="group glass-morphism glass-card-hover flex items-center space-x-4 px-8 py-6 rounded-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all duration-300"></div>
                  <div className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/80 to-green-600/80"></div>
                    <MessageSquare className="w-6 h-6 text-white relative z-10" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-sm text-gray-300 mb-1">WhatsApp</p>
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
      <footer className="py-16 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="glass-morphism rounded-3xl p-8 relative overflow-hidden">
            {/* Glass reflection effects */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative z-10">
              <div className="flex items-center space-x-3 mb-6 md:mb-0">
                <div className="w-12 h-12 glass-morphism rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/80 to-orange-600/80"></div>
                  <Code className="w-7 h-7 text-white relative z-10" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">Cognetex</span>
              </div>
              
              <div className="flex items-center space-x-3 mb-6 md:mb-0 glass-morphism px-4 py-2 rounded-2xl">
                <Zap className="w-5 h-5 text-orange-400" />
                <p className="text-orange-400 font-semibold">Code It. Scale It. Nail It.</p>
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
                    className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 text-gray-300 hover:text-orange-400 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/10 text-center relative z-10">
              <p className="text-gray-300">&copy; 2024 Cognetex. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}
