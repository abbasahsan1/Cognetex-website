"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Briefcase, FolderKanban, FileText, Mail, LogOut, Loader2, Users, Code, Wrench, Link2, Menu, X } from 'lucide-react';
import PillNav from '@/components/PillNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      setError('Authentication failed');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0C10] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#E08A20] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0C10] flex items-center justify-center p-4">
        <div className="glass-morphism p-8 rounded-3xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Cognetex GHQ</h1>
            <p className="text-gray-400">Admin Panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none transition-colors"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              className="w-full liquid-button px-6 py-3 rounded-xl font-semibold text-white"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0C10] flex relative">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full glass-morphism border border-primary/30 text-white"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 glass-morphism border-r border-[#2C2A33] p-6 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="mb-8 mt-8 md:mt-0">
          <h1 className="text-2xl font-bold text-white">Cognetex</h1>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>
        
        <nav className="space-y-2">
          <Link
            href="/ghq"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          
          <Link
            href="/ghq/services"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Briefcase className="w-5 h-5" />
            <span>Services</span>
          </Link>
          
          <Link
            href="/ghq/projects"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FolderKanban className="w-5 h-5" />
            <span>Projects</span>
          </Link>
          
          <Link
            href="/ghq/blogs"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FileText className="w-5 h-5" />
            <span>Blogs</span>
          </Link>

          <Link
            href="/ghq/team"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Users className="w-5 h-5" />
            <span>Team</span>
          </Link>
          
          <Link
            href="/ghq/tools"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Wrench className="w-5 h-5" />
            <span>Tools</span>
          </Link>
          
          <Link
            href="/ghq/links"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Link2 className="w-5 h-5" />
            <span>Links & Buttons</span>
          </Link>
          
          <Link
            href="/ghq/contact"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Mail className="w-5 h-5" />
            <span>Contact</span>
          </Link>
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        {/* Pill Navigation - Hidden on mobile since we have sidebar */}
        <div className="hidden md:block">
            <PillNav
            logo={<Code className="w-6 h-6 text-[#3b82f6]" />}
            logoAlt="Cognetex Admin"
            items={[
                {
                icon: <LayoutDashboard size={16} />,
                label: 'Dashboard',
                href: '/ghq'
                },
                {
                icon: <Briefcase size={16} />,
                label: 'Services',
                href: '/ghq/services'
                },
                {
                icon: <FolderKanban size={16} />,
                label: 'Projects',
                href: '/ghq/projects'
                },
                {
                icon: <FileText size={16} />,
                label: 'Blogs',
                href: '/ghq/blogs'
                },
                {
                icon: <Users size={16} />,
                label: 'Team',
                href: '/ghq/team'
                },
                {
                icon: <Wrench size={16} />,
                label: 'Tools',
                href: '/ghq/tools'
                },
                {
                icon: <Link2 size={16} />,
                label: 'Links',
                href: '/ghq/links'
                },
                {
                icon: <Mail size={16} />,
                label: 'Contact',
                href: '/ghq/contact'
                }
            ]}
            onItemClick={(href) => router.push(href)}
            />
        </div>
        
        <div className="mt-16 md:mt-24">
          {children}
        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
