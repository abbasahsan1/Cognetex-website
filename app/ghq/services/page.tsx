"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, GripVertical } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  order: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data.sort((a: Service, b: Service) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const handleAdd = () => {
    setEditingService({
      id: '',
      title: '',
      description: '',
      icon: 'Briefcase',
      gradient: 'from-[#E08A20] to-[#F0A040]',
      order: services.length,
    });
    setIsEditing(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingService) return;
    
    setLoading(true);
    try {
      const method = editingService.id ? 'PUT' : 'POST';
      const response = await fetch('/api/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });

      if (response.ok) {
        await fetchServices();
        setIsEditing(false);
        setEditingService(null);
      }
    } catch (error) {
      console.error('Failed to save service:', error);
      alert('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchServices();
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingService(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Services</h1>
          <p className="text-gray-400">Manage your service offerings</p>
        </div>
        <button
          onClick={handleAdd}
          className="liquid-button px-6 py-3 rounded-xl font-semibold text-white flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="glass-morphism p-6 rounded-2xl group hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
                <span className="text-sm text-gray-400">#{service.order + 1}</span>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 rounded-lg bg-[#1A181F] hover:bg-[#E08A20] text-gray-300 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 rounded-lg bg-[#1A181F] hover:bg-red-500 text-gray-300 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-gray-300 text-sm line-clamp-3">{service.description}</p>
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-xs text-gray-500">Icon: {service.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && editingService && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-morphism p-8 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingService.id ? 'Edit Service' : 'Add Service'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg hover:bg-[#1A181F] transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none transition-colors"
                  placeholder="Service title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none transition-colors h-32"
                  placeholder="Service description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Icon (Lucide icon name)
                </label>
                <input
                  type="text"
                  value={editingService.icon}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none transition-colors"
                  placeholder="e.g., Briefcase, Code, Brain"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gradient (Tailwind classes)
                </label>
                <input
                  type="text"
                  value={editingService.gradient}
                  onChange={(e) => setEditingService({ ...editingService, gradient: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none transition-colors"
                  placeholder="e.g., from-[#E08A20] to-[#F0A040]"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 liquid-button px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Saving...' : 'Save Service'}</span>
                </button>
                <button
                  onClick={handleCancel}
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
