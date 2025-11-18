"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Brain, Globe, Database, Mail, MessageSquare, ArrowRight, Sparkles, Bot, Languages, Layers, Link2, Zap, Github, Linkedin, Twitter, TrendingUp, Award, Server, Workflow, Loader2, Home, Briefcase, Users, FileText, Phone, FolderKanban } from 'lucide-react';
import * as Icons from 'lucide-react';
import ProfileCard from './ProfileCard';
import BlurText from './BlurText';
import GradientText from './GradientText';
import ScrollReveal from './ScrollReveal';
import RotatingText from './RotatingText';
import ScrollVelocity from './ScrollVelocity';
import MagnetLines from './MagnetLines';
import ChromaGrid from './ChromaGrid';
import SpotlightCard from './SpotlightCard';

// Type definitions
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  order: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metrics: Record<string, string>;
  order: number;
}

interface Blog {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  date: string;
  content: string;
  author: string;
  published: boolean;
  order: number;
}

interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  socialMedia: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

interface TeamMember {
  id: string;
  name: string;
  title: string;
  handle: string;
  status: string;
  avatarUrl: string;
  contactText: string;
  order: number;
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
  return IconComponent ? <IconComponent className="w-8 h-8" /> : <Code className="w-8 h-8" />;
};

export default function CognetexWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Dynamic data state
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState({
    services: true,
    projects: true,
    blogs: true,
    contact: true,
    team: true
  });

  // Fetch all data on component mount
  useEffect(() => {
    console.log('🚀 CognetexWebsite component mounted, fetching data...');
    console.log('Window object exists:', typeof window !== 'undefined');
    console.log('Browser environment check');
    fetchServices();
    fetchProjects();
    fetchBlogs();
    fetchContact();
    fetchTeam();
  }, []);

  // Debug log to show current state
  useEffect(() => {
    console.log('📊 Current state:', {
      services: services.length,
      projects: projects.length,
      blogs: blogs.length,
      team: team.length,
      contact: contactInfo ? 'loaded' : 'null',
      loading
    });
    
    // Also log to alert if nothing in console
    if (typeof window !== 'undefined' && services.length === 0 && !loading.services) {
      console.warn('⚠️ Services loaded but array is empty!');
    }
  }, [services, projects, blogs, team, contactInfo, loading]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Services loaded:', data.length, 'items');
        setServices(data.sort((a: Service, b: Service) => a.order - b.order));
      } else {
        console.error('❌ Services API failed:', response.status);
      }
    } catch (error) {
      console.error('❌ Failed to fetch services:', error);
    } finally {
      setLoading(prev => ({ ...prev, services: false }));
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Projects loaded:', data.length, 'items');
        setProjects(data.sort((a: Project, b: Project) => a.order - b.order));
      } else {
        console.error('❌ Projects API failed:', response.status);
      }
    } catch (error) {
      console.error('❌ Failed to fetch projects:', error);
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        const publishedBlogs = data
          .filter((blog: Blog) => blog.published)
          .sort((a: Blog, b: Blog) => a.order - b.order)
          .slice(0, 3);
        console.log('✅ Blogs loaded:', publishedBlogs.length, 'published items');
        setBlogs(publishedBlogs);
      } else {
        console.error('❌ Blogs API failed:', response.status);
      }
    } catch (error) {
      console.error('❌ Failed to fetch blogs:', error);
    } finally {
      setLoading(prev => ({ ...prev, blogs: false }));
    }
  };

  const fetchContact = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Contact info loaded:', data);
        setContactInfo(data);
      } else {
        console.error('❌ Contact API failed:', response.status);
      }
    } catch (error) {
      console.error('❌ Failed to fetch contact info:', error);
    } finally {
      setLoading(prev => ({ ...prev, contact: false }));
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await fetch('/api/team');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Team loaded:', data.length, 'members');
        setTeam(data.sort((a: TeamMember, b: TeamMember) => a.order - b.order));
      } else {
        console.error('❌ Team API failed:', response.status);
      }
    } catch (error) {
      console.error('❌ Failed to fetch team:', error);
    } finally {
      setLoading(prev => ({ ...prev, team: false }));
    }
  };


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

  return (
    <div className="min-h-screen text-white liquid-gradient-bg font-['Space_Grotesk',_sans-serif]" style={{ backgroundColor: 'rgb(13, 12, 16)' }}>
      {/* Static Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Glass Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 glass-morphism rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/20 group-hover:from-[#3b82f6]/30 group-hover:to-[#3b82f6]/30 transition-all duration-300"></div>
                <Code className="w-7 h-7 text-[#3b82f6] relative z-10" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-[#3b82f6] bg-clip-text text-transparent">Cognetex</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              {['Services', 'Projects', 'Expertise', 'Team', 'Blog'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 relative group"
                >
                  <span className="relative z-10">{item}</span>
                </a>
              ))}
              <a href="#contact" className="ml-2 px-6 py-2 bg-gradient-to-r from-orange-500 via-[#3b82f6] to-orange-600 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
                Contact
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
        {/* Animated gradient orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-[#3b82f6]/20 to-[#60a5fa]/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-flex items-center px-8 py-4 glass-morphism rounded-full animate-fade-in-up relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-[#3b82f6]/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <Sparkles className="w-5 h-5 text-orange-500 mr-3 relative z-10 animate-pulse" />
            <span className="text-gray-200 font-medium relative z-10">Engineering tomorrow&apos;s technology, today</span>
          </div>
          
          <div className="mb-8">
            <GradientText
              colors={["#3b82f6", "#ff8a00", "#3b82f6", "#ff8a00", "#3b82f6"]}
              animationSpeed={4}
              showBorder={false}
              className="text-6xl md:text-8xl font-bold"
            >
              Cognetex
            </GradientText>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mb-8 animate-fade-in-up animate-delay-300">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"></div>
            <div className="glass-morphism px-8 py-4 rounded-2xl border border-orange-500/20 min-w-[450px] flex justify-center bg-black/30">
              <RotatingText
                texts={['Code It. Nail It. Scale It.', 'AI-Powered Solutions', 'Future-Ready Technology', 'Innovation at Scale']}
                mainClassName="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-[#3b82f6] whitespace-nowrap"
                staggerFrom="center"
                staggerDuration={0.02}
                rotationInterval={3000}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              />
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent via-orange-500/70 to-transparent"></div>
          </div>
          
          <div className="glass-morphism p-8 rounded-3xl mb-16 animate-fade-in-up animate-delay-400 max-w-4xl mx-auto border border-orange-500/10">
            <BlurText
              text="We deliver intelligent, scalable, and future-ready software solutions powered by AI, automation, and modern development stacks."
              delay={50}
              animateBy="words"
              direction="top"
              className="text-lg md:text-xl text-gray-200 leading-relaxed justify-center"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animate-delay-500">
            <a href="#services" className="group relative px-12 py-5 rounded-2xl font-bold text-lg flex items-center justify-center text-white overflow-hidden transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-[#3b82f6] to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-[#3b82f6] to-orange-600 blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <span className="relative z-10">Explore Our Services</span>
              <ChevronRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a href="#contact" className="glass-card-hover px-12 py-5 glass-morphism rounded-2xl flex items-center justify-center font-bold text-lg text-white group border border-orange-500/30">
              Start a Project
              <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section - DYNAMIC */}
      <section id="services" className="py-16 px-4 relative fade-in-section">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/10 to-[#3b82f6]/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-500 font-medium mb-6">
              What We Do
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <GradientText
                colors={["#ffffff", "#ff8a00", "#3b82f6", "#ff8a00", "#ffffff"]}
                animationSpeed={5}
                showBorder={false}
              >
                Our Services
              </GradientText>
            </h2>
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={true}
              baseRotation={2}
              blurStrength={6}
              textClassName="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
            >
              We deliver intelligent, scalable, and future-ready software solutions powered by AI, automation, and modern development stacks.
            </ScrollReveal>
          </div>
          
          {loading.services ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No services available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const useSpotlight = service.title.toLowerCase().includes('agentic') || 
                                     service.title.toLowerCase().includes('ai') || 
                                     service.title.toLowerCase().includes('integration') || 
                                     service.title.toLowerCase().includes('automation');
                
                const content = (
                  <>
                    <div className={`w-16 h-16 glass-morphism rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden border border-orange-500/20 group-hover:border-orange-500/40`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-80 group-hover:opacity-100`}></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 text-white">
                        {getIconComponent(service.icon)}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-[#3b82f6] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {service.description}
                    </p>
                    
                    <div className="mt-6 flex items-center text-orange-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </>
                );

                return (
                  <div 
                    key={service.id} 
                    className="group relative fade-in-section"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {useSpotlight ? (
                      <SpotlightCard 
                        className="!bg-transparent glass-morphism glass-card-hover !border-orange-500/30"
                        spotlightColor="rgba(255, 138, 0, 0.3)"
                      >
                        {content}
                      </SpotlightCard>
                    ) : (
                      <div className="glass-morphism glass-card-hover rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
                        {content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section - DYNAMIC */}
      <section id="projects" className="py-16 px-4 relative fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#3b82f6]/10 to-orange-500/10 backdrop-blur-sm border border-[#3b82f6]/30 rounded-full text-[#3b82f6] font-medium mb-6">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <GradientText
                colors={["#3b82f6", "#ff8a00", "#ffffff", "#ff8a00", "#3b82f6"]}
                animationSpeed={5}
                showBorder={false}
              >
                Our Projects
              </GradientText>
            </h2>
            <BlurText
              text="Some of the solutions we've delivered"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-gray-400 text-xl justify-center"
            />
          </div>
          
          {loading.projects ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin" />
            </div>
          ) : projects.length > 0 ? (
            <>
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {projects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className="group fade-in-section"
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="glass-morphism glass-card-hover rounded-3xl overflow-hidden relative">
                      {/* Glass reflection effects */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
                      
                      <div className="h-48 glass-morphism flex items-center justify-center relative overflow-hidden border-b border-orange-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 via-orange-500/5 to-[#3b82f6]/10 group-hover:from-[#3b82f6]/20 group-hover:via-orange-500/10 group-hover:to-[#3b82f6]/20 transition-all duration-300"></div>
                        <div className="grid grid-cols-3 gap-3 p-6 relative z-10">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-6 h-6 glass-morphism rounded group-hover:scale-110 transition-all duration-300 border border-orange-500/10" style={{ transitionDelay: `${i * 50}ms` }}>
                              <div className="w-full h-full bg-gradient-to-br from-[#3b82f6]/30 via-orange-500/20 to-[#3b82f6]/30 rounded group-hover:from-orange-500/40 group-hover:to-[#3b82f6]/40 transition-all duration-300"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-[#3b82f6] group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-3 py-1 glass-morphism text-[#60a5fa] rounded-full text-sm font-medium hover:scale-105 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-[#3b82f6]/20 hover:text-orange-500 transition-all duration-200 border border-orange-500/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                          {Object.entries(project.metrics).map(([key, value], i) => (
                            <div key={i} className="text-center group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
                              <div className="text-xl font-bold bg-gradient-to-r from-[#3b82f6] to-orange-500 bg-clip-text text-transparent">{value}</div>
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
                <a href="#" className="cursor-target inline-flex items-center px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-[#3b82f6]/10 hover:border-orange-500/50 transition-all duration-300 group">
                  <span className="text-orange-500 font-semibold">View All Projects</span>
                  <ArrowRight className="w-5 h-5 ml-3 text-orange-500 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No projects available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Expertise Section with Scroll Velocity */}
      <section id="expertise" className="py-16 px-4 relative fade-in-section overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent"></div>
        
        {/* Decorative Magnet Lines */}
        <div className="absolute top-20 right-10 opacity-20">
          <MagnetLines
            rows={7}
            columns={7}
            containerSize="30vmin"
            lineColor="#ff8a00"
            lineWidth="0.6vmin"
            lineHeight="4vmin"
            baseAngle={0}
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/10 to-[#3b82f6]/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-500 font-medium mb-6">
              Tech Stack
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <GradientText
                colors={["#ff8a00", "#3b82f6", "#ff8a00", "#3b82f6", "#ff8a00"]}
                animationSpeed={4}
                showBorder={false}
              >
                Our Expertise & Toolkit
              </GradientText>
            </h2>
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={true}
              baseRotation={2}
              blurStrength={6}
              textClassName="text-gray-400 text-xl"
            >
              We leverage a proven tech stack to build robust and future-ready solutions
            </ScrollReveal>
          </div>
          
          <div className="grid gap-6">
            {techStack.map((stack, index) => (
              <SpotlightCard
                key={index}
                className="!bg-transparent glass-morphism glass-card-hover !border-orange-500/20 fade-in-section"
                spotlightColor="rgba(59, 130, 246, 0.25)"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stack.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                    {stack.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-[#3b82f6] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{stack.category}</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {stack.tools.map((tool, toolIndex) => (
                    <div 
                      key={toolIndex} 
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-orange-500/30 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-[#3b82f6]/10 hover:scale-105 hover:shadow-lg transition-all duration-200 text-center"
                      style={{ transitionDelay: `${toolIndex * 50}ms` }}
                    >
                      <span className="font-medium text-gray-300 hover:text-orange-400 transition-colors duration-200">{tool}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - DYNAMIC */}
      <section id="team" className="py-16 px-4 relative fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#3b82f6]/10 to-orange-500/10 backdrop-blur-sm border border-[#3b82f6]/30 rounded-full text-[#3b82f6] font-medium mb-6">
              Our People
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <GradientText
                colors={["#3b82f6", "#ffffff", "#ff8a00", "#ffffff", "#3b82f6"]}
                animationSpeed={5}
                showBorder={false}
              >
                Our Team
              </GradientText>
            </h2>
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={true}
              baseRotation={2}
              blurStrength={6}
              textClassName="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Behind every solution is a team of engineers, designers, and innovators dedicated to pushing the boundaries of technology.
            </ScrollReveal>
          </div>
          
          {loading.team ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin" />
            </div>
          ) : team.length > 0 ? (
            <div className="min-h-[600px] relative">
              <ChromaGrid
                items={team.map((member) => ({
                  image: member.avatarUrl,
                  title: member.name,
                  subtitle: member.title,
                  handle: member.handle,
                  borderColor: '#ff8a00',
                  gradient: 'linear-gradient(145deg, rgba(255, 138, 0, 0.15), rgba(59, 130, 246, 0.15), rgba(13, 12, 16, 0.8))',
                  url: '#'
                }))}
                radius={350}
                damping={0.5}
                fadeOut={0.7}
                ease="power3.out"
              />
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No team members available yet. Check back soon!</p>
            </div>
          )}
          
          <div className="text-center bg-gradient-to-r from-orange-500/10 via-[#3b82f6]/10 to-orange-500/10 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-12">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We believe in <span className="text-orange-500 font-semibold">collaboration</span>, <span className="text-[#3b82f6] font-semibold">innovation</span>, and <span className="text-orange-500 font-semibold">craftsmanship</span> — values that drive us to deliver technology with impact.
            </p>
            <a href="#contact" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 via-[#3b82f6] to-orange-600 rounded-2xl hover:scale-105 transition-all duration-300 group shadow-lg shadow-orange-500/20">
              <span className="font-semibold text-white">Get in Touch</span>
              <ArrowRight className="w-5 h-5 ml-3 text-white group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section - DYNAMIC */}
      <section id="blog" className="py-16 px-4 relative fade-in-section">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/10 to-[#3b82f6]/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-500 font-medium mb-6">
              Insights
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <GradientText
                colors={["#ff8a00", "#3b82f6", "#ffffff", "#3b82f6", "#ff8a00"]}
                animationSpeed={5}
                showBorder={false}
              >
                Our Blog
              </GradientText>
            </h2>
            <BlurText
              text="Explore insights, trends, and ideas from our team of experts"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-gray-400 text-xl justify-center"
            />
          </div>
          
          {loading.blogs ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin" />
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {blogs.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="group relative cursor-pointer fade-in-section"
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-orange-500/10 hover:to-[#3b82f6]/10 hover:border-orange-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-[#3b82f6]/20 text-orange-500 rounded-full text-xs font-medium uppercase tracking-wider border border-orange-500/20">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm">{post.date}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-[#3b82f6] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                        <ArrowRight className="w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <a href="#" className="cursor-target inline-flex items-center px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-[#3b82f6]/10 hover:border-orange-500/50 transition-all duration-300 group">
                  <span className="text-orange-500 font-semibold">Read All Blogs</span>
                  <ArrowRight className="w-5 h-5 ml-3 text-orange-500 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No blog posts published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why" className="py-16 px-4 relative fade-in-section overflow-hidden">
        {/* Decorative Magnet Lines */}
        <div className="absolute bottom-20 left-10 opacity-10">
          <MagnetLines
            rows={6}
            columns={6}
            containerSize="25vmin"
            lineColor="#3b82f6"
            lineWidth="0.5vmin"
            lineHeight="3.5vmin"
            baseAngle={45}
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/10 to-[#3b82f6]/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-500 font-medium mb-6">
              Why Us
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <GradientText
                colors={["#ff8a00", "#ffffff", "#3b82f6", "#ffffff", "#ff8a00"]}
                animationSpeed={5}
                showBorder={false}
              >
                Why Cognetex
              </GradientText>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <TrendingUp className="w-8 h-8" />, title: "Scalable Solutions", desc: "Built to grow with your business", gradient: "from-orange-500 to-[#3b82f6]" },
              { icon: <Brain className="w-8 h-8" />, title: "AI-First Mindset", desc: "Harnessing Agentic AI, ML, and automation", gradient: "from-[#3b82f6] to-orange-500" },
              { icon: <Layers className="w-8 h-8" />, title: "End-to-End Expertise", desc: "From product design to deployment", gradient: "from-orange-500 to-[#60a5fa]" },
              { icon: <Award className="w-8 h-8" />, title: "Proven Impact", desc: "Delivering real results across industries", gradient: "from-[#60a5fa] to-orange-500" }
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
                <h3 className="text-xl font-bold mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-[#3b82f6] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
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

      {/* Contact Section - DYNAMIC */}
      <section id="contact" className="py-16 px-4 relative fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="relative glass-morphism rounded-3xl p-12 md:p-16 overflow-hidden border border-orange-500/20">
            {/* Liquid glass background orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/15 to-[#3b82f6]/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-[#3b82f6]/15 to-orange-500/10 rounded-full filter blur-3xl"></div>
            
            {/* Glass reflection effects */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <span className="inline-block px-6 py-3 glass-morphism rounded-full text-orange-500 font-medium mb-6 border border-orange-500/30">
                  Let&apos;s Connect
                </span>
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  <GradientText
                    colors={["#ff8a00", "#3b82f6", "#ffffff", "#3b82f6", "#ff8a00"]}
                    animationSpeed={5}
                    showBorder={false}
                  >
                    Get in Touch
                  </GradientText>
                </h2>
                <BlurText
                  text="Ready to transform your ideas into reality? Let's talk."
                  delay={100}
                  animateBy="words"
                  direction="top"
                  className="text-gray-200 text-xl justify-center"
                />
              </div>
              
              {loading.contact ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin" />
                </div>
              ) : contactInfo && (
                <>
                  <div className="grid md:grid-cols-1 gap-6 mb-12">
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className="group glass-morphism glass-card-hover flex items-center space-x-4 p-6 rounded-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <div className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/80 to-[#60a5fa]/80"></div>
                        <Mail className="w-6 h-6 text-white relative z-10" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 mb-1">Email</p>
                        <p className="text-[#3b82f6] group-hover:text-[#60a5fa] transition-colors break-all">
                          {contactInfo.email}
                        </p>
                      </div>
                    </a>
                  </div>
                  
                  <div className="flex justify-center mb-8">
                    <a 
                      href={contactInfo.whatsapp} 
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
                          {contactInfo.phone}
                        </p>
                      </div>
                    </a>
                  </div>

                  {contactInfo.socialMedia && (
                    <div className="flex justify-center space-x-4 pt-8 border-t border-white/10">
                      {contactInfo.socialMedia.github && (
                        <a 
                          href={contactInfo.socialMedia.github} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 text-gray-300 hover:text-[#3b82f6] relative overflow-hidden group"
                        >
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {contactInfo.socialMedia.linkedin && (
                        <a 
                          href={contactInfo.socialMedia.linkedin} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 text-gray-300 hover:text-[#3b82f6] relative overflow-hidden group"
                        >
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {contactInfo.socialMedia.twitter && (
                        <a 
                          href={contactInfo.socialMedia.twitter} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 text-gray-300 hover:text-[#3b82f6] relative overflow-hidden group"
                        >
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </>
              )}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/80 to-[#60a5fa]/80"></div>
                  <Code className="w-7 h-7 text-white relative z-10" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-[#3b82f6] bg-clip-text text-transparent">Cognetex</span>
              </div>
              
              <div className="flex items-center space-x-3 mb-6 md:mb-0 glass-morphism px-4 py-2 rounded-2xl">
                <Zap className="w-5 h-5 text-[#3b82f6]" />
                <p className="text-[#3b82f6] font-semibold">Code It. Scale It. Nail It.</p>
              </div>
              
              {contactInfo?.socialMedia && (
                <div className="flex space-x-4">
                  {contactInfo.socialMedia.github && (
                    <a 
                      href={contactInfo.socialMedia.github} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 text-gray-300 hover:text-[#3b82f6] relative overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {contactInfo.socialMedia.linkedin && (
                    <a 
                      href={contactInfo.socialMedia.linkedin} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 text-gray-300 hover:text-[#3b82f6] relative overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {contactInfo.socialMedia.twitter && (
                    <a 
                      href={contactInfo.socialMedia.twitter} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 text-gray-300 hover:text-[#3b82f6] relative overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
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
