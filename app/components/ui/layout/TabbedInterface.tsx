"use client";

import React, { useState, useEffect } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: number | string;
}

export interface TabbedInterfaceProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onTabChange?: (tabId: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const TabbedInterface: React.FC<TabbedInterfaceProps> = ({
  tabs,
  defaultTabId,
  onTabChange,
  orientation = 'horizontal',
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  inactiveTabClassName = '',
  contentClassName = '',
  children,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTabId || (tabs.length > 0 ? tabs[0].id : ''));

  useEffect(() => {
    if (defaultTabId) {
      setActiveTabId(defaultTabId);
    }
  }, [defaultTabId]);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const renderTabs = () => {
    const baseTabClass = `
      flex items-center font-medium transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      ${tabClassName}
    `;

    const activeTabClass = `
      border-blue-500 text-blue-600
      ${activeTabClassName}
    `;

    const inactiveTabClass = `
      border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300
      ${inactiveTabClassName}
    `;

    return tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        className={`
          ${baseTabClass}
          ${activeTabId === tab.id ? activeTabClass : inactiveTabClass}
          ${orientation === 'horizontal' ? 'px-4 py-2 border-b-2' : 'px-3 py-2 border-l-2'}
          ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={() => !tab.disabled && handleTabClick(tab.id)}
        disabled={tab.disabled}
        aria-selected={activeTabId === tab.id}
        role="tab"
      >
        {tab.icon && <span className="mr-2">{tab.icon}</span>}
        <span>{tab.label}</span>
        {tab.badge && (
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
            {tab.badge}
          </span>
        )}
      </button>
    ));
  };

  return (
    <div className={className}>
      <div
        className={`
          ${orientation === 'horizontal' ? 'flex border-b border-gray-200' : 'flex flex-col border-l border-gray-200'}
        `}
        role="tablist"
      >
        {renderTabs()}
      </div>
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  );
};

export default TabbedInterface; 