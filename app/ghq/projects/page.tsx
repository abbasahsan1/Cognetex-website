"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metrics: {
    [key: string]: string;
  };
  order: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.sort((a: Project, b: Project) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleAdd = () => {
    setEditingProject({
      id: '',
      title: '',
      description: '',
      tags: [],
      metrics: { metric1: '', metric2: '', metric3: '' },
      order: projects.length,
    });
    setIsEditing(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingProject) return;
    
    setLoading(true);
    try {
      const method = editingProject.id ? 'PUT' : 'POST';
      const response = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      if (response.ok) {
        await fetchProjects();
        setIsEditing(false);
        setEditingProject(null);
      }
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProjects();
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <button
          onClick={handleAdd}
          className="liquid-button px-6 py-3 rounded-xl font-semibold text-white flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass-morphism p-6 rounded-2xl group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm text-gray-400">#{project.order + 1}</span>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 rounded-lg bg-[#1A181F] hover:bg-[#E08A20] text-gray-300 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-lg bg-[#1A181F] hover:bg-red-500 text-gray-300 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[#1A181F] text-[#E08A20] text-xs">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              {Object.entries(project.metrics).map(([key, value], i) => (
                <div key={i}>
                  <div className="text-lg font-bold text-[#E08A20]">{value}</div>
                  <div className="text-xs text-gray-400">{key}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && editingProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-morphism p-8 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingProject.id ? 'Edit Project' : 'Add Project'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-lg hover:bg-[#1A181F] transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingProject.tags.join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(t => t.trim()) })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Metrics (key:value, one per line)</label>
                <textarea
                  value={Object.entries(editingProject.metrics).map(([k, v]) => `${k}:${v}`).join('\n')}
                  onChange={(e) => {
                    const metrics: Record<string, string> = {};
                    e.target.value.split('\n').forEach(line => {
                      const [key, value] = line.split(':');
                      if (key && value) metrics[key.trim()] = value.trim();
                    });
                    setEditingProject({ ...editingProject, metrics });
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none h-24"
                  placeholder="users:10K+&#10;accuracy:99.2%&#10;uptime:99.9%"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 liquid-button px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Saving...' : 'Save Project'}</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-xl bg-[#1A181F] hover:bg-[#2C2A33] text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
