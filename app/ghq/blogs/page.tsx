"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  date: string;
  content: string;
  author: string;
  published: boolean;
  order: number;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data.sort((a: Blog, b: Blog) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };

  const handleAdd = () => {
    setEditingBlog({
      id: '',
      title: '',
      description: '',
      readTime: '3 min read',
      category: 'Technology',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      content: '<p>Your blog content here...</p>',
      author: 'Cognetex Team',
      published: false,
      order: blogs.length,
    });
    setIsEditing(true);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingBlog) return;

    setLoading(true);
    try {
      const method = editingBlog.id ? 'PUT' : 'POST';
      const response = await fetch('/api/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      });

      if (response.ok) {
        await fetchBlogs();
        setIsEditing(false);
        setEditingBlog(null);
      }
    } catch (error) {
      console.error('Failed to save blog:', error);
      alert('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchBlogs();
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const togglePublish = async (blog: Blog) => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...blog, published: !blog.published }),
      });

      if (response.ok) {
        await fetchBlogs();
      }
    } catch (error) {
      console.error('Failed to toggle publish:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <button
          onClick={handleAdd}
          className="liquid-button px-6 py-3 rounded-xl font-semibold text-white flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Blog Post</span>
        </button>
      </div>

      {/* Blogs Grid */}
      <div className="space-y-4 mb-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="glass-morphism p-6 rounded-2xl group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm text-muted-foreground">#{blog.order + 1}</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${blog.published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs">
                    {blog.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{blog.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{blog.description}</p>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{blog.author}</span>
                  <span>•</span>
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => togglePublish(blog)}
                  className="p-2 rounded-lg bg-card hover:bg-green-500/20 text-muted-foreground hover:text-green-400 transition-colors"
                  title={blog.published ? 'Unpublish' : 'Publish'}
                >
                  {blog.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleEdit(blog)}
                  className="p-2 rounded-lg bg-card hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="p-2 rounded-lg bg-card hover:bg-destructive text-muted-foreground hover:text-destructive-foreground transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && editingBlog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-morphism p-8 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {editingBlog.id ? 'Edit Blog Post' : 'Add Blog Post'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-lg hover:bg-card transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Title</label>
                  <input
                    type="text"
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
                  <input
                    type="text"
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Description</label>
                <textarea
                  value={editingBlog.description}
                  onChange={(e) => setEditingBlog({ ...editingBlog, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none h-20"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Read Time</label>
                  <input
                    type="text"
                    value={editingBlog.readTime}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Date</label>
                  <input
                    type="text"
                    value={editingBlog.date}
                    onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Author</label>
                  <input
                    type="text"
                    value={editingBlog.author}
                    onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Content (HTML)</label>
                <textarea
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none h-48 font-mono text-sm"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingBlog.published}
                  onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.checked })}
                  className="w-4 h-4 rounded border-border bg-card text-primary focus:ring-primary"
                />
                <label className="text-sm text-muted-foreground">Publish immediately</label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 liquid-button px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Saving...' : 'Save Blog Post'}</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-xl bg-card hover:bg-secondary text-foreground transition-colors"
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
