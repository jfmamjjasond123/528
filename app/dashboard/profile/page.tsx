import React from 'react';
import Profile from '../../components/Profile';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">
              View and manage your profile information and achievements
            </p>
          </div>
          
          {/* Profile Component */}
          <Profile />
        </div>
      </main>
    </div>
  );
} 