"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2, ExternalLink } from 'lucide-react';

interface Link {
  id: string;
  label: string;
  url: string;
  type: string;
  icon: string;
  location: string;
  order: number;
}

const LINK_TYPES = ['primary-cta', 'secondary-cta', 'link', 'social'];
const LOCATIONS = ['hero', 'services', 'team', 'blog', 'contact', 'footer'];
const ICON_OPTIONS = ['Sparkles', 'ArrowRight', 'Linkedin', 'Github', 'Twitter', 'ExternalLink', 'Mail', 'Phone'];

export default function LinksManagement() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Link>>({
    label: '',
    url: '',
    type: 'link',
    icon: 'ArrowRight',
    location: 'hero',
    order: 1
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/links');
      const data = await res.json();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing link
        await fetch('/api/links', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingId })
        });
      } else {
        // Create new link
        await fetch('/api/links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      fetchLinks();
      resetForm();
    } catch (error) {
      console.error('Error saving link:', error);
    }
  };

  const handleEdit = (link: Link) => {
    setEditingId(link.id);
    setFormData(link);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      await fetch(`/api/links?id=${id}`, { method: 'DELETE' });
      fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      label: '',
      url: '',
      type: 'link',
      icon: 'ArrowRight',
      location: 'hero',
      order: 1
    });
    setEditingId(null);
    setIsAdding(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Links & Buttons Management</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="liquid-button px-6 py-3 rounded-xl flex items-center gap-2 font-semibold text-white"
        >
          <Plus className="w-5 h-5" />
          Add Link
        </button>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="glass-morphism rounded-2xl p-6 border border-primary/20">
          <h3 className="text-xl font-bold text-foreground mb-4">
            {editingId ? 'Edit Link' : 'Add New Link'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-muted-foreground mb-2 font-medium">Label</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder="Button text or link label"
                  required
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-2 font-medium">URL</label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder="#section or https://..."
                  required
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-2 font-medium">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                >
                  {LINK_TYPES.map(type => (
                    <option key={type} value={type} className="bg-card">{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-muted-foreground mb-2 font-medium">Location</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc} className="bg-card">{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-muted-foreground mb-2 font-medium">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                >
                  {ICON_OPTIONS.map(icon => (
                    <option key={icon} value={icon} className="bg-card">{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-muted-foreground mb-2 font-medium">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                  min="1"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="liquid-button px-6 py-3 rounded-xl flex items-center gap-2 font-semibold text-white"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-card border border-border rounded-xl hover:bg-secondary transition-all duration-300 flex items-center gap-2 font-semibold text-foreground"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="glass-morphism rounded-xl p-6 border border-border hover:border-primary/40 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">{link.label}</h3>
                <a
                  href={link.url}
                  className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.url}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Type:</span>
                <span className="px-2 py-1 bg-primary/20 rounded text-primary font-medium text-xs">
                  {link.type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Location:</span>
                <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300 font-medium text-xs">
                  {link.location}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Icon:</span>
                <span className="text-foreground font-medium">{link.icon}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Order:</span>
                <span className="text-foreground font-medium">{link.order}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(link)}
                className="flex-1 px-4 py-2 bg-card border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2 text-muted-foreground font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="flex-1 px-4 py-2 bg-card border border-border rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 flex items-center justify-center gap-2 text-muted-foreground font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {links.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-xl">No links configured yet. Click &ldquo;Add Link&rdquo; to get started!</p>
        </div>
      )}
    </div>
  );
}
