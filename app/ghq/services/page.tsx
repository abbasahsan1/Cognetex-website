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
    <div className="pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">Services</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your service offerings</p>
        </div>
        <button
          onClick={handleAdd}
          className="liquid-button px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white flex items-center space-x-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="text-sm sm:text-base">Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="glass-morphism p-4 sm:p-6 rounded-2xl group md:hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground cursor-move" />
                <span className="text-xs sm:text-sm text-muted-foreground">#{service.order + 1}</span>
              </div>
              <div className="flex space-x-1.5 sm:space-x-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-1.5 sm:p-2 rounded-lg bg-card hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-colors touch-manipulation"
                >
                  <Edit2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-1.5 sm:p-2 rounded-lg bg-card hover:bg-destructive text-muted-foreground hover:text-destructive-foreground transition-colors touch-manipulation"
                >
                  <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{service.title}</h3>
            <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 leading-relaxed">{service.description}</p>
            <div className="mt-3 sm:mt-4 flex items-center space-x-2">
              <span className="text-[10px] sm:text-xs text-muted-foreground">Icon: {service.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && editingService && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="glass-morphism p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {editingService.id ? 'Edit Service' : 'Add Service'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg hover:bg-card transition-colors touch-manipulation"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border border-border text-foreground text-sm sm:text-base focus:border-primary focus:outline-none transition-colors"
                  placeholder="Service title"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">
                  Description
                </label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border border-border text-foreground text-sm sm:text-base focus:border-primary focus:outline-none transition-colors h-24 sm:h-32 resize-none"
                  placeholder="Service description"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">
                  Icon (Lucide icon name)
                </label>
                <input
                  type="text"
                  value={editingService.icon}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border border-border text-foreground text-sm sm:text-base focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g., Briefcase, Code, Brain"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">
                  Gradient (Tailwind classes)
                </label>
                <input
                  type="text"
                  value={editingService.gradient}
                  onChange={(e) => setEditingService({ ...editingService, gradient: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-card border border-border text-foreground text-sm sm:text-base focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g., from-orange-500 to-red-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 liquid-button px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white text-sm sm:text-base flex items-center justify-center space-x-2 touch-manipulation"
                >
                  <Save className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span>{loading ? 'Saving...' : 'Save Service'}</span>
                </button>
                <button
                  onClick={handleCancel}
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
