"use client";

import React from 'react';

export interface ProgressBarProps {
  value: number;
  max?: number;
  height?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  height = 'md',
  color = 'blue',
  showLabel = false,
  label,
  className = '',
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const heightClasses = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };
  
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showLabel && (
            <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`${colorClasses[color]} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 