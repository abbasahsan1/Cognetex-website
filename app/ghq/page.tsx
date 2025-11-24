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
      color: 'from-orange-500 to-amber-500',
      href: '/ghq/services'
    },
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'from-amber-500 to-orange-500',
      href: '/ghq/projects'
    },
    {
      title: 'Total Blogs',
      value: stats.blogs,
      icon: FileText,
      color: 'from-orange-500 to-amber-500',
      href: '/ghq/blogs'
    },
    {
      title: 'Published Blogs',
      value: stats.publishedBlogs,
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-500',
      href: '/ghq/blogs'
    },
  ];

  return (
    <div className="pb-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Welcome to Cognetex Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        {statCards.map((stat, index) => (
          <a
            key={index}
            href={stat.href}
            className="glass-morphism p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer group touch-manipulation"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4 gap-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
            </div>
            <h3 className="text-xs sm:text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
              {stat.title}
            </h3>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-morphism p-4 sm:p-6 rounded-xl sm:rounded-2xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <Link
            href="/ghq/services"
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-card hover:bg-secondary text-foreground transition-colors text-center border border-border text-sm sm:text-base touch-manipulation"
          >
            + Add Service
          </Link>
          <Link
            href="/ghq/projects"
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-card hover:bg-secondary text-foreground transition-colors text-center border border-border text-sm sm:text-base touch-manipulation"
          >
            + Add Project
          </Link>
          <Link
            href="/ghq/blogs"
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-card hover:bg-secondary text-foreground transition-colors text-center border border-border text-sm sm:text-base touch-manipulation"
          >
            + Add Blog Post
          </Link>
          <Link
            href="/ghq/team"
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-card hover:bg-secondary text-foreground transition-colors text-center border border-border text-sm sm:text-base touch-manipulation"
          >
            + Add Team Member
          </Link>
          <Link
            href="/ghq/contact"
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-card hover:bg-secondary text-foreground transition-colors text-center border border-border text-sm sm:text-base touch-manipulation sm:col-span-2 lg:col-span-1"
          >
            Edit Contact Info
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 sm:mt-8 glass-morphism p-4 sm:p-6 rounded-xl sm:rounded-2xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4">Admin Panel Information</h2>
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
          <p>• Manage all website content from this centralized dashboard</p>
          <p>• Changes are saved immediately and reflect on the live website</p>
          <p>• Use drag-and-drop to reorder items</p>
          <p>• All content is stored in JSON files for easy backup</p>
        </div>
      </div>
    </div>
  );
}
