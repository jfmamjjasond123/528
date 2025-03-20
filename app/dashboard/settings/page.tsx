import React from 'react';
import Settings from '../../components/Settings';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage your account preferences, notifications, and privacy settings
            </p>
          </div>
          
          {/* Settings Component */}
          <Settings />
        </div>
      </main>
    </div>
  );
} 