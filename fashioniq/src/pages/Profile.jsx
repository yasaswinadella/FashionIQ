import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  UserCircle, Mail, LogOut, Shield,
  Calendar, Edit3, Check, X, Trash2
} from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

export default function Profile() {
  const { currentUser, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(currentUser?.displayName || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [confirmText, setConfirmText] = useState('');

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await logout();
    } catch (err) {
      console.error('Logout failed', err);
      setLoggingOut(false);
    }
  }

  async function handleDeleteAccount() {
    if (confirmText !== 'DELETE') {
      setDeleteError('Please type DELETE to confirm.');
      return;
    }
    setDeleting(true);
    setDeleteError('');
    try {
      await deleteAccount();
      window.location.href = '/register';
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        setDeleteError('For security, please log out and log back in before deleting your account.');
      } else {
        setDeleteError('Could not delete account. Please try again.');
      }
      setDeleting(false);
    }
  }

  async function handleSaveName() {
    if (!newName.trim()) return;
    setSaving(true);
    setError('');
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setSaved(true);
      setEditingName(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError('Could not update name. Try again.');
    } finally {
      setSaving(false);
    }
  }

  const joinDate = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-ink-400 text-sm mt-1">Manage your account details.</p>
      </div>

      {/* Avatar + Name */}
      <div className="bg-ink-900 rounded-2xl border border-ink-800 p-6 hover:border-primary-600/40 transition">
        <div className="flex items-center gap-5 mb-6">
          <div className="bg-primary-600/10 text-primary-400 p-4 rounded-full">
            <UserCircle size={48} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {currentUser?.displayName || 'No name set'}
            </h2>
            <p className="text-ink-400 text-sm">{currentUser?.email}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-400 mb-2">
            Display Name
          </label>
          {editingName ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="flex-1 px-3 py-2 bg-ink-800 border border-ink-600 text-white placeholder-ink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your name"
                autoFocus
              />
              <button onClick={handleSaveName} disabled={saving}
                className="bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50">
                {saving ? '...' : <Check size={18} />}
              </button>
              <button
                onClick={() => { setEditingName(false); setNewName(currentUser?.displayName || ''); }}
                className="bg-ink-800 text-ink-400 px-3 py-2 rounded-lg hover:bg-ink-600 transition">
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between px-3 py-2 bg-ink-800 rounded-lg">
              <span className="text-white">{currentUser?.displayName || 'Not set'}</span>
              <button onClick={() => setEditingName(true)}
                className="text-primary-400 hover:text-primary-300 transition">
                <Edit3 size={16} />
              </button>
            </div>
          )}
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          {saved && <p className="text-emerald-400 text-xs mt-1">✅ Name updated!</p>}
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-ink-900 rounded-2xl border border-ink-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Account Details</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 px-3 py-2.5 bg-ink-800 rounded-lg">
            <Mail size={18} className="text-primary-400" />
            <div>
              <p className="text-xs text-ink-400">Email Address</p>
              <p className="text-sm text-white">{currentUser?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 bg-ink-800 rounded-lg">
            <Shield size={18} className="text-emerald-400" />
            <div>
              <p className="text-xs text-ink-400">Account Status</p>
              <p className="text-sm font-medium text-emerald-400">✅ Active</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 bg-ink-800 rounded-lg">
            <Calendar size={18} className="text-primary-400" />
            <div>
              <p className="text-xs text-ink-400">Member Since</p>
              <p className="text-sm text-white">{joinDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <div className="bg-ink-900 rounded-2xl border border-ink-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-1">Sign Out</h3>
        <p className="text-ink-400 text-sm mb-4">
          Sign out of your FashionIQ account on this device.
        </p>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 bg-ink-800 text-white border border-ink-700 px-5 py-2.5 rounded-xl font-medium hover:bg-primary-600 hover:border-primary-600 transition disabled:opacity-50"
        >
          <LogOut size={18} />
          {loggingOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>

      {/* Delete Account */}
      <div className="bg-ink-900 rounded-2xl border border-red-900/40 p-6">
        <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
          <Trash2 size={18} className="text-red-400" /> Delete Account
        </h3>
        <p className="text-ink-400 text-sm mb-4">
          Permanently delete your account and all data. This cannot be undone.
          You can register again anytime.
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 bg-red-600/10 text-red-400 border border-red-600/30 px-5 py-2.5 rounded-xl font-medium hover:bg-red-600 hover:text-white hover:border-red-600 transition"
          >
            <Trash2 size={18} />
            Delete My Account
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-red-400 font-medium">
              ⚠️ This will permanently delete your account. Type <span className="font-bold">DELETE</span> to confirm:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE here"
              className="w-full px-3 py-2 bg-ink-800 border border-red-600/30 text-white placeholder-ink-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {deleteError && (
              <p className="text-red-400 text-xs">{deleteError}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-red-700 transition disabled:opacity-50"
              >
                <Trash2 size={18} />
                {deleting ? 'Deleting...' : 'Yes, Delete Account'}
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); setConfirmText(''); setDeleteError(''); }}
                className="px-5 py-2.5 rounded-xl font-medium bg-ink-800 text-ink-100 hover:bg-ink-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}