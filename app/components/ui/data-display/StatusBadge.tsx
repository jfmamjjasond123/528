"use client";

import React from 'react';

export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'default';
  text: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  icon,
  size = 'md',
  className = '',
}) => {
  const statusClasses = {
    success: 'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-amber-100 text-amber-800 border-amber-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    default: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center
        ${statusClasses[status]}
        ${sizeClasses[size]}
        border
        rounded-full
        font-medium
        ${className}
      `}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {text}
    </span>
  );
};

export default StatusBadge; 