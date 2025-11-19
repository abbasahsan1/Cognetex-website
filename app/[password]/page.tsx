"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Lock, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function PasswordResetPage() {
  const router = useRouter();
  const params = useParams();
  const currentPassword = params.password as string;
  
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    validatePassword();
  }, [currentPassword]);

  const validatePassword = async () => {
    try {
      const response = await fetch(`/api/password?password=${encodeURIComponent(currentPassword)}`);
      const data = await response.json();
      
      setIsValid(data.valid);
      
      if (!data.valid) {
        setError('Invalid password reset link');
      }
    } catch (error) {
      console.error('Failed to validate password:', error);
      setError('Failed to validate password');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    
    if (newPassword === currentPassword) {
      setError('New password must be different from current password');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/ghq');
        }, 2000);
      } else {
        setError(data.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Failed to update password:', error);
      setError('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-[#0D0C10] flex items-center justify-center p-4">
        <div className="glass-morphism p-8 rounded-3xl">
          <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin" />
        </div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-[#0D0C10] flex items-center justify-center p-4">
        <div className="glass-morphism p-8 rounded-3xl max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Invalid Reset Link</h1>
          <p className="text-gray-400 mb-6">This password reset link is not valid.</p>
          <button
            onClick={() => router.push('/ghq')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-[#3b82f6] rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
          >
            Go to Admin Panel
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0D0C10] flex items-center justify-center p-4">
        <div className="glass-morphism p-8 rounded-3xl max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Password Updated!</h1>
          <p className="text-gray-400 mb-4">Your password has been successfully changed.</p>
          <p className="text-sm text-gray-500">
            New reset URL: <span className="text-orange-500 font-mono">/{newPassword}</span>
          </p>
          <p className="text-xs text-gray-600 mt-2">Redirecting to admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0C10] flex items-center justify-center p-4">
      <div className="glass-morphism p-8 rounded-3xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-[#3b82f6] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-400">Enter your new admin password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Enter new password"
              required
              minLength={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#1A181F] border border-[#2C2A33] text-white focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Confirm new password"
              required
              minLength={4}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-[#3b82f6] rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Current reset URL: <span className="text-orange-500 font-mono">/{currentPassword}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
