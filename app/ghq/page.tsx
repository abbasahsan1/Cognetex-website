"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, FolderKanban, FileText, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    blogs: 0,
    publishedBlogs: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [services, projects, blogs] = await Promise.all([
        fetch('/api/services').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/blogs').then(r => r.json()),
      ]);

      setStats({
        services: services.length || 0,
        projects: projects.length || 0,
        blogs: blogs.length || 0,
        publishedBlogs: blogs.filter((b: { published: boolean }) => b.published).length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Services',
      value: stats.services,
      icon: Briefcase,
      color: 'from-[#E08A20] to-[#F0A040]',
      href: '/ghq/services'
    },
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'from-[#F0A040] to-[#E08A20]',
      href: '/ghq/projects'
    },
    {
      title: 'Total Blogs',
      value: stats.blogs,
      icon: FileText,
      color: 'from-[#E08A20] to-[#F0A040]',
      href: '/ghq/blogs'
    },
    {
      title: 'Published Blogs',
      value: stats.publishedBlogs,
      icon: TrendingUp,
      color: 'from-[#F0A040] to-[#E08A20]',
      href: '/ghq/blogs'
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to Cognetex Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <a
            key={index}
            href={stat.href}
            className="glass-morphism p-6 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">{stat.value}</span>
            </div>
            <h3 className="text-gray-300 group-hover:text-white transition-colors">
              {stat.title}
            </h3>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-morphism p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/ghq/services"
            className="px-6 py-4 rounded-xl bg-[#1A181F] hover:bg-[#2C2A33] text-white transition-colors text-center"
          >
            + Add Service
          </Link>
          <Link
            href="/ghq/projects"
            className="px-6 py-4 rounded-xl bg-[#1A181F] hover:bg-[#2C2A33] text-white transition-colors text-center"
          >
            + Add Project
          </Link>
          <Link
            href="/ghq/blogs"
            className="px-6 py-4 rounded-xl bg-[#1A181F] hover:bg-[#2C2A33] text-white transition-colors text-center"
          >
            + Add Blog Post
          </Link>
          <Link
            href="/ghq/team"
            className="px-6 py-4 rounded-xl bg-[#1A181F] hover:bg-[#2C2A33] text-white transition-colors text-center"
          >
            + Add Team Member
          </Link>
          <Link
            href="/ghq/contact"
            className="px-6 py-4 rounded-xl bg-[#1A181F] hover:bg-[#2C2A33] text-white transition-colors text-center"
          >
            Edit Contact Info
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 glass-morphism p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">Admin Panel Information</h2>
        <div className="space-y-3 text-gray-300">
          <p>• Manage all website content from this centralized dashboard</p>
          <p>• Changes are saved immediately and reflect on the live website</p>
          <p>• Use drag-and-drop to reorder items</p>
          <p>• All content is stored in JSON files for easy backup</p>
        </div>
      </div>
    </div>
  );
}
