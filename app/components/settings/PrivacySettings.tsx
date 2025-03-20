'use client';

import React from 'react';
import { SettingsFormData } from './types';

interface PrivacySettingsProps {
  formData: SettingsFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Profile Privacy</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="showPublicProfile"
                name="showPublicProfile"
                type="checkbox"
                checked={formData.showPublicProfile}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="showPublicProfile" className="ml-2 block text-sm text-gray-700">
                Show Public Profile
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="showLearningActivity"
                name="showLearningActivity"
                type="checkbox"
                checked={formData.showLearningActivity}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="showLearningActivity" className="ml-2 block text-sm text-gray-700">
                Show Learning Activity
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="shareSkillLevel"
                name="shareSkillLevel"
                type="checkbox"
                checked={formData.shareSkillLevel}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="shareSkillLevel" className="ml-2 block text-sm text-gray-700">
                Share Skill Level
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="showBadges"
                name="showBadges"
                type="checkbox"
                checked={formData.showBadges}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="showBadges" className="ml-2 block text-sm text-gray-700">
                Show Badges and Achievements
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Data Privacy</h3>
        <div className="space-y-2">
          <div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
            >
              Download My Data
            </button>
          </div>
          
          <div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
            >
              Manage Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings; 