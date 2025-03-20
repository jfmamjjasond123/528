"use client";

import React from 'react';
import { cn } from '@/app/lib/utils';

export interface ProgressBarProps {
  value: number;
  max?: number;
  height?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gradient';
  variant?: 'solid' | 'striped' | 'animated';
  showLabel?: boolean;
  label?: string;
  className?: string;
  barClassName?: string;
  labelPosition?: 'top' | 'side' | 'inside';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  height = 'md',
  color = 'blue',
  variant = 'solid',
  showLabel = false,
  label,
  className = '',
  barClassName = '',
  labelPosition = 'top',
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
    gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
  };
  
  const variantClasses = {
    solid: '',
    striped: 'bg-stripe',
    animated: 'animate-progress',
  };
  
  // Combine color and variant classes
  const barClass = cn(
    colorClasses[color],
    variant !== 'solid' && variantClasses[variant],
    'rounded-full transition-all duration-300 ease-in-out',
    barClassName
  );

  // Label inside bar only works with medium or large heights
  const canLabelInside = labelPosition === 'inside' && (height === 'md' || height === 'lg');
  
  const renderLabel = () => {
    if (!showLabel && !label) return null;
    
    // Top position (default)
    if (labelPosition === 'top') {
      return (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showLabel && (
            <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span>
          )}
        </div>
      );
    }
    
    // Inside position (requires sufficient height)
    if (canLabelInside) {
      return (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-xs font-medium text-white drop-shadow-sm">
            {label ? label : `${Math.round(percentage)}%`}
          </span>
        </div>
      );
    }
    
    // Side position
    if (labelPosition === 'side') {
      return (
        <div className="flex items-center gap-3">
          <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
            <div
              className={barClass}
              style={{ width: `${percentage}%` }}
            />
          </div>
          {label && <span className="text-sm whitespace-nowrap text-gray-600">{label}</span>}
          {showLabel && (
            <span className="text-sm whitespace-nowrap font-medium text-gray-700">{Math.round(percentage)}%</span>
          )}
        </div>
      );
    }
    
    return null;
  };

  // If label is on the side, we handle the entire component rendering in the renderLabel function
  if (labelPosition === 'side') {
    return <div className={`w-full ${className}`}>{renderLabel()}</div>;
  }

  return (
    <div className={`w-full ${className}`}>
      {(labelPosition === 'top') && renderLabel()}
      <div className={`relative w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        {(canLabelInside) && renderLabel()}
        <div
          className={barClass}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 