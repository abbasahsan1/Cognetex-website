"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metrics: {
    [key: string]: string;
  };
  order: number;
  image?: string;
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
      image: '',
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
    <div className="pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">Projects</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <button
          onClick={handleAdd}
          className="liquid-button px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white flex items-center space-x-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="text-sm sm:text-base">Add Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass-morphism p-4 sm:p-6 rounded-2xl group"
          >
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm text-muted-foreground">#{project.order + 1}</span>
              <div className="flex space-x-1.5 sm:space-x-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-1.5 sm:p-2 rounded-lg bg-card hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-colors touch-manipulation"
                >
                  <Edit2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-1.5 sm:p-2 rounded-lg bg-card hover:bg-destructive text-muted-foreground hover:text-destructive-foreground transition-colors touch-manipulation"
                >
                  <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
              </div>
            </div>

            {project.image && (
              <div className="mb-3 sm:mb-4 rounded-xl overflow-hidden h-40 sm:h-48 w-full">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}

            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-card text-primary text-[10px] sm:text-xs">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {Object.entries(project.metrics).map(([key, value], i) => (
                <div key={i}>
                  <div className="text-base sm:text-lg font-bold text-primary">{value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground truncate">{key}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && editingProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="glass-morphism p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {editingProject.id ? 'Edit Project' : 'Add Project'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-lg hover:bg-card transition-colors touch-manipulation"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <ImageUpload
                value={editingProject.image}
                onChange={(url) => setEditingProject({ ...editingProject, image: url })}
                label="Project Image"
              />

              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border border-border text-foreground text-sm sm:text-base focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Description</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border border-border text-foreground text-sm sm:text-base focus:border-primary focus:outline-none h-20 sm:h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingProject.tags.join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(t => t.trim()) })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border border-border text-foreground text-sm sm:text-base focus:border-primary focus:outline-none"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Metrics (key:value, one per line)</label>
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border border-border text-foreground text-sm sm:text-base focus:border-primary focus:outline-none h-20 sm:h-24 resize-none"
                  placeholder="users:10K+&#10;accuracy:99.2%&#10;uptime:99.9%"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 liquid-button px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white text-sm sm:text-base flex items-center justify-center space-x-2 touch-manipulation"
                >
                  <Save className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>{loading ? 'Saving...' : 'Save Project'}</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-card hover:bg-secondary text-foreground text-sm sm:text-base transition-colors touch-manipulation"
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
