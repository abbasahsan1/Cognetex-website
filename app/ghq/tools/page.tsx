"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, Upload, X } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: string;
  image: string;
  order: number;
}

export default function ToolsManagement() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await fetch('/api/tools');
      if (response.ok) {
        const data = await response.json();
        setTools(data.sort((a: Tool, b: Tool) => a.order - b.order));
      }
    } catch (error) {
      console.error('Failed to fetch tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = '/api/tools';
      const method = editingTool ? 'PUT' : 'POST';
      const body = editingTool 
        ? { ...formData, id: editingTool.id, order: editingTool.order }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchTools();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Failed to save tool:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;
    
    try {
      const response = await fetch(`/api/tools?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchTools();
      }
    } catch (error) {
      console.error('Failed to delete tool:', error);
    }
  };

  const handleEdit = (tool: Tool) => {
    setEditingTool(tool);
    setFormData({
      name: tool.name,
      category: tool.category,
      image: tool.image
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTool(null);
    setFormData({ name: '', category: '', image: '' });
  };

  const categories = Array.from(new Set(tools.map(t => t.category)));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Tools & Technologies</h1>
          <p className="text-gray-400">Manage your tech stack showcase</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-[#3b82f6] rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Add Tool
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map(category => {
            const categoryTools = tools.filter(t => t.category === category);
            
            return (
              <div key={category} className="glass-morphism p-6 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-orange-500 to-[#3b82f6] bg-clip-text text-transparent">
                  {category}
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {categoryTools.map(tool => (
                    <div
                      key={tool.id}
                      className="glass-morphism p-4 rounded-xl hover:scale-105 transition-all duration-300 relative group"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 mb-3 flex items-center justify-center bg-white/5 rounded-lg overflow-hidden">
                          <img
                            src={tool.image}
                            alt={tool.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-300 text-center">{tool.name}</span>
                      </div>
                      
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(tool)}
                          className="p-1.5 bg-blue-500/80 hover:bg-blue-500 rounded-lg transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(tool.id)}
                          className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-morphism p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingTool ? 'Edit Tool' : 'Add New Tool'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tool Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="e.g., React, Python, Docker"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="e.g., Languages & Frameworks, AI/ML, DevOps"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Icon/Logo URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="https://example.com/icon.svg"
                  required
                />
                {formData.image && (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-[#1A181F] rounded-lg">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="text-sm text-gray-400">Icon Preview</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-[#1A181F] hover:bg-[#2C2A33] text-white rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-[#3b82f6] rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
                >
                  {editingTool ? 'Update Tool' : 'Add Tool'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
