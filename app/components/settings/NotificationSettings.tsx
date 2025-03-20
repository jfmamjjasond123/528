'use client';

import React from 'react';
import { SettingsFormData } from './types';

interface NotificationSettingsProps {
  formData: SettingsFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notification Channels</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="emailNotifications"
                name="emailNotifications"
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                Email Notifications
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="pushNotifications"
                name="pushNotifications"
                type="checkbox"
                checked={formData.pushNotifications}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-700">
                Push Notifications
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="smsNotifications"
                name="smsNotifications"
                type="checkbox"
                checked={formData.smsNotifications}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-700">
                SMS Notifications
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Learning Notifications</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="learningReminders"
                name="learningReminders"
                type="checkbox"
                checked={formData.learningReminders}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="learningReminders" className="ml-2 block text-sm text-gray-700">
                Daily Learning Reminders
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="weeklyProgress"
                name="weeklyProgress"
                type="checkbox"
                checked={formData.weeklyProgress}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="weeklyProgress" className="ml-2 block text-sm text-gray-700">
                Weekly Progress Reports
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="newAchievements"
                name="newAchievements"
                type="checkbox"
                checked={formData.newAchievements}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="newAchievements" className="ml-2 block text-sm text-gray-700">
                New Achievements and Badges
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="courseUpdates"
                name="courseUpdates"
                type="checkbox"
                checked={formData.courseUpdates}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="courseUpdates" className="ml-2 block text-sm text-gray-700">
                Course Updates and New Content
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Marketing Notifications</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="marketingEmails"
                name="marketingEmails"
                type="checkbox"
                checked={formData.marketingEmails}
                onChange={handleChange}
                className="h-4 w-4 text-khan-blue focus:ring-khan-blue border-gray-300 rounded"
              />
              <label htmlFor="marketingEmails" className="ml-2 block text-sm text-gray-700">
                Marketing Emails and Promotions
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 