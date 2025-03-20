'use client';

import React from 'react';
import { SettingsFormData } from './types';

interface PreferencesSettingsProps {
  formData: SettingsFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PreferencesSettings: React.FC<PreferencesSettingsProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Language and Region</h3>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-khan-blue focus:border-khan-blue"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="chinese">Chinese</option>
            <option value="japanese">Japanese</option>
            <option value="korean">Korean</option>
            <option value="arabic">Arabic</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Theme and Display</h3>
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
          <select
            id="theme"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-khan-blue focus:border-khan-blue"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">Use System Setting</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <select
            id="fontSize"
            name="fontSize"
            value={formData.fontSize}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-khan-blue focus:border-khan-blue"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xlarge">Extra Large</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Accessibility</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="highContrast"
                name="highContrast"
                type="checkbox"
                checked={formData.highContrast}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="highContrast" className="ml-2 block text-sm text-gray-700">
                High Contrast Mode
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="screenReader"
                name="screenReader"
                type="checkbox"
                checked={formData.screenReader}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="screenReader" className="ml-2 block text-sm text-gray-700">
                Screen Reader Optimization
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Content Preferences</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="autoplay"
                name="autoplay"
                type="checkbox"
                checked={formData.autoplay}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="autoplay" className="ml-2 block text-sm text-gray-700">
                Autoplay Videos
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="closedCaptioning"
                name="closedCaptioning"
                type="checkbox"
                checked={formData.closedCaptioning}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="closedCaptioning" className="ml-2 block text-sm text-gray-700">
                Enable Closed Captioning
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings; 