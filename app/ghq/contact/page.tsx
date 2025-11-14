"use client";

import { useState, useEffect } from 'react';
import { Save, Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  socialMedia: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    socialMedia: {
      linkedin: '',
      github: '',
      twitter: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      setContactInfo(data);
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save contact info:', error);
      alert('Failed to save contact information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Contact & Support</h1>
          <p className="text-gray-400">Manage contact information and social media links</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`liquid-button px-6 py-3 rounded-xl font-semibold text-white flex items-center space-x-2 ${
            saved ? 'bg-green-500' : ''
          }`}
        >
          <Save className="w-5 h-5" />
          <span>{loading ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="glass-morphism p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Mail className="w-6 h-6 text-[#E08A20]" />
            <span>Contact Information</span>
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none"
                placeholder="contact@cognetex.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp Link</label>
                <input
                  type="text"
                  value={contactInfo.whatsapp}
                  onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none"
                  placeholder="https://wa.me/1234567890"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Office Address</label>
              <textarea
                value={contactInfo.address}
                onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none h-24"
                placeholder="123 Innovation Street, Tech City, TC 12345"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="glass-morphism p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Linkedin className="w-6 h-6 text-[#E08A20]" />
            <span>Social Media Links</span>
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </label>
              <input
                type="url"
                value={contactInfo.socialMedia.linkedin}
                onChange={(e) => setContactInfo({
                  ...contactInfo,
                  socialMedia: { ...contactInfo.socialMedia, linkedin: e.target.value }
                })}
                className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none"
                placeholder="https://linkedin.com/company/cognetex"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </label>
              <input
                type="url"
                value={contactInfo.socialMedia.github}
                onChange={(e) => setContactInfo({
                  ...contactInfo,
                  socialMedia: { ...contactInfo.socialMedia, github: e.target.value }
                })}
                className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none"
                placeholder="https://github.com/cognetex"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                <Twitter className="w-4 h-4" />
                <span>Twitter / X</span>
              </label>
              <input
                type="url"
                value={contactInfo.socialMedia.twitter}
                onChange={(e) => setContactInfo({
                  ...contactInfo,
                  socialMedia: { ...contactInfo.socialMedia, twitter: e.target.value }
                })}
                className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-[#E08A20] focus:outline-none"
                placeholder="https://twitter.com/cognetex"
              />
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="glass-morphism p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Preview</h2>
          
          <div className="bg-[#1A181F] p-6 rounded-xl space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-[#E08A20] mt-1" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{contactInfo.email || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-[#E08A20] mt-1" />
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">{contactInfo.phone || 'Not set'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#E08A20] mt-1" />
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-white whitespace-pre-line">{contactInfo.address || 'Not set'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2C2A33]">
              <p className="text-sm text-gray-400 mb-3">Social Media</p>
              <div className="flex space-x-3">
                {contactInfo.socialMedia.linkedin && (
                  <a href={contactInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#0D0C10] hover:bg-[#E08A20] text-gray-300 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {contactInfo.socialMedia.github && (
                  <a href={contactInfo.socialMedia.github} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#0D0C10] hover:bg-[#E08A20] text-gray-300 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {contactInfo.socialMedia.twitter && (
                  <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#0D0C10] hover:bg-[#E08A20] text-gray-300 hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
