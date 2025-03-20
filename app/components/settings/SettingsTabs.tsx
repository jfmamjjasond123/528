'use client';

import React from 'react';

interface SettingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'account', label: 'Account & Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'preferences', label: 'Preferences' },
  ];

  return (
    <div className="flex border-b border-gray-200 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
            activeTab === tab.id 
              ? 'text-khan-blue border-b-2 border-khan-blue' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SettingsTabs; 