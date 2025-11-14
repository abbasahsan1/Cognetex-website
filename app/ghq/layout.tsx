"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Briefcase, FolderKanban, FileText, Mail, LogOut, Loader2, Users } from 'lucide-react';
import Dock from '@/components/Dock';

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
    <div className="min-h-screen bg-[#0D0C10] flex">
      {/* Sidebar */}
      <aside className="w-64 glass-morphism border-r border-[#2C2A33] p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Cognetex</h1>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>
        
        <nav className="space-y-2">
          <a
            href="/ghq"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          
          <a
            href="/ghq/services"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
          >
            <Briefcase className="w-5 h-5" />
            <span>Services</span>
          </a>
          
          <a
            href="/ghq/projects"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
          >
            <FolderKanban className="w-5 h-5" />
            <span>Projects</span>
          </a>
          
          <a
            href="/ghq/blogs"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Blogs</span>
          </a>

          <a
            href="/ghq/team"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>Team</span>
          </a>
          
          <a
            href="/ghq/contact"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1A181F] hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>Contact</span>
          </a>
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
      <main className="flex-1 p-8 overflow-y-auto pb-32">
        {children}
        
        {/* Dock Navigation */}
        <Dock
          items={[
            {
              icon: <LayoutDashboard />,
              label: 'Dashboard',
              onClick: () => router.push('/ghq')
            },
            {
              icon: <Briefcase />,
              label: 'Services',
              onClick: () => router.push('/ghq/services')
            },
            {
              icon: <FolderKanban />,
              label: 'Projects',
              onClick: () => router.push('/ghq/projects')
            },
            {
              icon: <FileText />,
              label: 'Blogs',
              onClick: () => router.push('/ghq/blogs')
            },
            {
              icon: <Users />,
              label: 'Team',
              onClick: () => router.push('/ghq/team')
            },
            {
              icon: <Mail />,
              label: 'Contact',
              onClick: () => router.push('/ghq/contact')
            }
          ]}
          magnification={70}
          distance={200}
        />
      </main>
    </div>
  );
}
