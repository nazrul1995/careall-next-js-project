'use client';

import React, { useState } from 'react';
import {
  MdEdit,
  MdSave,
  MdCancel,
  MdLock,
  MdNotifications,
  MdCheckCircle,
  MdWarning,
} from 'react-icons/md';
import Swal from 'sweetalert2';

export default function ProfileSettings({ session }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session.user?.name || '',
    email: session.user?.email || '',
    phone: '',
    address: '',
    emergencyContact: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    paymentReminders: true,
    newServices: true,
    reviews: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveProfile = async () => {
    // TODO: Implement API call to save profile
    setIsSaving(true);
    try {
      // Simulate saving
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Swal.fire('Success', 'Profile updated successfully', 'success');
      setIsEditing(false);
    } catch (err) {
      Swal.fire('Error', 'Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    const { value: password } = await Swal.fire({
      title: 'Change Password',
      input: 'password',
      inputLabel: 'Current Password',
      inputPlaceholder: 'Enter your current password',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Password is required';
        }
      },
    });

    if (password) {
      const { value: newPassword } = await Swal.fire({
        title: 'New Password',
        input: 'password',
        inputLabel: 'New Password',
        inputPlaceholder: 'Enter your new password',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'New password is required';
          }
          if (value.length < 8) {
            return 'Password must be at least 8 characters';
          }
        },
      });

      if (newPassword) {
        // TODO: Implement API call to change password
        Swal.fire('Success', 'Password changed successfully', 'success');
      }
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Profile Information */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              isEditing
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
            }`}
          >
            {isEditing ? (
              <>
                <MdCancel /> Cancel
              </>
            ) : (
              <>
                <MdEdit /> Edit
              </>
            )}
          </button>
        </div>

        <div className="bg-white dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={true}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-600 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Emergency Contact
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Your full address"
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-600 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {isEditing && (
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                  Saving...
                </>
              ) : (
                <>
                  <MdSave /> Save Changes
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Security Settings */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Security</h2>

        <div className="bg-white dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600 space-y-4">
          <button
            onClick={handleChangePassword}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-500 transition"
          >
            <span className="flex items-center gap-3 text-slate-900 dark:text-white font-medium">
              <MdLock className="text-xl" />
              Change Password
            </span>
            <span className="text-gray-400">&gt;</span>
          </button>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              <span className="font-semibold">Last password change:</span> 90 days ago
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-500 mt-1">
              For security, we recommend changing your password every 90 days
            </p>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Notification Preferences</h2>

        <div className="bg-white dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600 space-y-4">
          {[
            { key: 'bookingUpdates', label: 'Booking Updates', description: 'Get notified when bookings change status' },
            { key: 'paymentReminders', label: 'Payment Reminders', description: 'Receive payment due reminders' },
            { key: 'newServices', label: 'New Services', description: 'Notifications about new services available' },
            { key: 'reviews', label: 'Review Requests', description: 'Get asked to review completed bookings' },
          ].map((pref) => (
            <div key={pref.key} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-slate-600 rounded-lg">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{pref.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{pref.description}</p>
              </div>
              <button
                onClick={() => handleNotificationChange(pref.key)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  notifications[pref.key]
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                }`}
              >
                {notifications[pref.key] ? 'ON' : 'OFF'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Account Status */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Account Status</h2>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <MdCheckCircle className="text-2xl text-green-600 dark:text-green-400" />
            <span className="text-lg font-bold text-green-900 dark:text-green-300">Account Verified</span>
          </div>
          <p className="text-sm text-green-800 dark:text-green-400">
            Your account is verified and in good standing. You can book services without restrictions.
          </p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Danger Zone</h2>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3">
            <MdWarning className="text-2xl text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-red-900 dark:text-red-300">Delete Account</p>
              <p className="text-sm text-red-800 dark:text-red-400 mt-1">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              Swal.fire({
                title: 'Delete Account?',
                text: 'This action cannot be undone. All your data will be permanently deleted.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete account',
              });
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
