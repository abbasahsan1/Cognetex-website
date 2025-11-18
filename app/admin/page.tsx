"use client";

import React from 'react';
import Link from 'next/link';
import { BarChart3, Users, FileText, FolderKanban, Eye, Activity } from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard';

export default function MockAdminPanel() {
  const stats = [
    { label: 'Total Visitors', value: '24.5K', change: '+12.5%', icon: <Eye className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Projects', value: '18', change: '+3', icon: <FolderKanban className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
    { label: 'Team Members', value: '12', change: '+2', icon: <Users className="w-6 h-6" />, color: 'from-orange-500 to-red-500' },
    { label: 'Published Blogs', value: '47', change: '+5', icon: <FileText className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' }
  ];

  const recentActivity = [
    { action: 'New blog post published', time: '2 hours ago', status: 'success' },
    { action: 'Project "AI Dashboard" updated', time: '5 hours ago', status: 'info' },
    { action: 'New team member added', time: '1 day ago', status: 'success' },
    { action: 'Contact form submission', time: '2 days ago', status: 'warning' }
  ];

  return (
    <div className="min-h-screen bg-[#0d0c10] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#1a1925]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-[#3b82f6] to-orange-500 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-gray-400 mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
            </div>
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 via-[#3b82f6] to-orange-600 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              View Website
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <SpotlightCard
              key={index}
              className="!bg-[#1a1925] !border-orange-500/20"
              spotlightColor="rgba(59, 130, 246, 0.25)"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-green-400 text-sm">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SpotlightCard
            className="!bg-[#1a1925] !border-[#3b82f6]/20"
            spotlightColor="rgba(255, 138, 0, 0.25)"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Traffic Overview</h3>
              <BarChart3 className="w-6 h-6 text-[#3b82f6]" />
            </div>
            <div className="h-48 flex items-end justify-between gap-2">
              {[65, 45, 78, 52, 85, 70, 90].map((height, idx) => (
                <div key={idx} className="flex-1 bg-gradient-to-t from-orange-500 to-[#3b82f6] rounded-t-lg opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${height}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-4">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </SpotlightCard>

          <SpotlightCard
            className="!bg-[#1a1925] !border-orange-500/20"
            spotlightColor="rgba(59, 130, 246, 0.25)"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Performance</h3>
              <Activity className="w-6 h-6 text-orange-500" />
            </div>
            <div className="space-y-4">
              {[
                { label: 'Page Load Time', value: 85, color: 'from-green-500 to-emerald-500' },
                { label: 'SEO Score', value: 92, color: 'from-blue-500 to-cyan-500' },
                { label: 'Accessibility', value: 78, color: 'from-orange-500 to-red-500' },
                { label: 'Best Practices', value: 88, color: 'from-purple-500 to-pink-500' }
              ].map((metric, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">{metric.label}</span>
                    <span className="text-white font-semibold">{metric.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-500`} style={{ width: `${metric.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* Recent Activity */}
        <SpotlightCard
          className="!bg-[#1a1925] !border-orange-500/20"
          spotlightColor="rgba(255, 138, 0, 0.25)"
        >
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-orange-500' :
                    'bg-[#3b82f6]'
                  }`}></div>
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Notice */}
        <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 via-[#3b82f6]/10 to-orange-500/10 backdrop-blur-xl border border-orange-500/30 rounded-3xl">
          <p className="text-center text-gray-300">
            🎭 This is a <span className="text-orange-500 font-semibold">mock admin panel</span> for demonstration purposes. 
            For full admin functionality, please visit <Link href="/ghq" className="text-[#3b82f6] hover:underline font-semibold">/ghq</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
