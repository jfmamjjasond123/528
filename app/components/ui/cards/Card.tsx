"use client";

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  rounded?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'medium',
  rounded = true,
  shadow = 'sm',
  bordered = false,
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };

  return (
    <div
      className={`
        bg-white
        ${rounded ? 'rounded-lg' : ''}
        ${shadowClasses[shadow]}
        ${paddingClasses[padding]}
        ${bordered ? 'border border-gray-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card; 