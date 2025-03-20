"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Card from './Card';
import ProgressBar from '../data-display/ProgressBar';

export interface CourseCardProps {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  progress?: number;
  lessonsCount?: number;
  hoursCount?: number;
  href?: string;
  lastAccessed?: string;
  className?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  image,
  progress = 0,
  lessonsCount,
  hoursCount,
  href = `/dashboard/course-contents`,
  lastAccessed,
  className = '',
  icon,
  color = 'blue',
}) => {
  // Background color for the icon based on course color
  const bgColorClass = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-md ${className}`}>
      <div className="relative">
        {image && (
          <div className="h-36 w-full bg-gray-200 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-center mb-1">
            {icon && (
              <div className={`mr-3 p-2 rounded-full ${bgColorClass[color]}`}>
                {icon}
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          {description && <p className="text-sm text-gray-600 mb-3">{description}</p>}
          
          <div className="mb-4">
            <ProgressBar 
              value={progress} 
              height="sm" 
              color={color} 
              showLabel 
              label="Progress" 
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-500">
              {lessonsCount && (
                <span className="mr-3">{lessonsCount} lessons</span>
              )}
              {hoursCount && (
                <span>{hoursCount} hours</span>
              )}
            </div>
            
            <Link 
              href={href} 
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Continue <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {lastAccessed && (
            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              Last accessed: {lastAccessed}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CourseCard; 