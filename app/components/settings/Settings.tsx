'use client';

import React, { useState } from 'react';
import { UserProfile, SettingsFormData } from './types';
import SettingsTabs from './SettingsTabs';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import PreferencesSettings from './PreferencesSettings';

interface SettingsProps {
  user?: UserProfile;
  onSave?: (updatedUser: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  user = {
    id: '12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    bio: 'Passionate learner who loves mathematics and coding. Currently studying computer science and exploring machine learning.',
    avatar: 'https://i.pravatar.cc/300',
    joinDate: '2022-03-15',
    role: 'student',
    location: 'San Francisco, CA',
    website: 'https://johndoe.example.com',
    socialMedia: {
      twitter: 'johndoe',
      linkedin: 'johndoe',
      github: 'johndoe',
    },
    badges: [],
    skills: []
  }, 
  onSave = console.log 
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState<SettingsFormData>({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    location: user.location || '',
    website: user.website || '',
    twitter: user.socialMedia?.twitter || '',
    linkedin: user.socialMedia?.linkedin || '',
    github: user.socialMedia?.github || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    learningReminders: true,
    weeklyProgress: true,
    newAchievements: true,
    courseUpdates: true,
    marketingEmails: false,
    showPublicProfile: true,
    showLearningActivity: true,
    shareSkillLevel: true,
    showBadges: true,
    language: 'english',
    theme: 'light',
    fontSize: 'medium',
    highContrast: false,
    screenReader: false,
    autoplay: true,
    closedCaptioning: false,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create updated user object
    const updatedUser = {
      ...user,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
      location: formData.location,
      website: formData.website,
      socialMedia: {
        twitter: formData.twitter,
        linkedin: formData.linkedin,
        github: formData.github
      }
    };
    
    // Call onSave callback
    onSave(updatedUser);
    
    // In a real app, you would handle API calls here
    alert('Settings updated successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Settings Header */}
      <div className="p-6 bg-khan-blue/5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-1">Manage your profile, preferences, and account settings.</p>
      </div>
      
      {/* Settings Navigation */}
      <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Settings Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <ProfileSettings formData={formData} handleChange={handleChange} />
          )}
          
          {/* Account Settings */}
          {activeTab === 'account' && (
            <AccountSettings formData={formData} handleChange={handleChange} />
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <NotificationSettings formData={formData} handleChange={handleChange} />
          )}
          
          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <PrivacySettings formData={formData} handleChange={handleChange} />
          )}
          
          {/* Preferences Settings */}
          {activeTab === 'preferences' && (
            <PreferencesSettings formData={formData} handleChange={handleChange} />
          )}
          
          {/* Submit Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue mr-3"
                onClick={() => window.location.reload()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-khan-blue hover:bg-khan-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings; 