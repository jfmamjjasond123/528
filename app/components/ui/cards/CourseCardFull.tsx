"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface CourseCardFullProps {
  id: string | number;
  title: string;
  description?: string;
  category?: string;
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
  hoursCount?: number;
  href?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  showCategory?: boolean;
}

export const CourseCardFull: React.FC<CourseCardFullProps> = ({
  id,
  title,
  description,
  category = 'MCAT CARS',
  progress = 0,
  completedLessons = 0,
  totalLessons = 0,
  hoursCount,
  href = `/dashboard/course-contents`,
  icon,
  color = 'blue',
  showCategory = false,
}) => {
  // Color classes based on course color
  const colorClasses = {
    blue: {
      border: 'border-blue-600',
      bg: 'bg-blue-50',
      progressBg: 'bg-blue-600',
      iconBg: 'bg-blue-50',
      text: 'text-blue-600'
    },
    green: {
      border: 'border-green-500',
      bg: 'bg-green-50',
      progressBg: 'bg-green-500',
      iconBg: 'bg-green-50',
      text: 'text-green-600'
    },
    purple: {
      border: 'border-purple-500',
      bg: 'bg-purple-50',
      progressBg: 'bg-purple-600',
      iconBg: 'bg-purple-50',
      text: 'text-purple-600'
    },
    yellow: {
      border: 'border-yellow-500',
      bg: 'bg-yellow-50',
      progressBg: 'bg-yellow-500',
      iconBg: 'bg-yellow-50',
      text: 'text-yellow-600'
    },
    red: {
      border: 'border-red-500',
      bg: 'bg-red-50',
      progressBg: 'bg-red-500',
      iconBg: 'bg-red-50',
      text: 'text-red-600'
    },
  };

  const isCompleted = progress === 100;
  const colorClass = colorClasses[color];
  
  return (
    <div className={`bg-white rounded-lg border-t-[6px] border-2 ${colorClass.border} shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="p-4">
        {/* Icon and Title Inline */}
        <div className="flex items-center mb-3">
          <div className={`flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full ${colorClass.iconBg} mr-3`}>
            {icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900 truncate">{title}</h3>
          {showCategory && (
            <span className="ml-2 inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
              {category}
            </span>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-3 overflow-hidden">
          <div 
            className={`h-full ${colorClass.progressBg} rounded-full transition-all duration-300 ease-in-out`} 
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        
        {/* Lessons & Action */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 font-medium">
            {completedLessons}/{totalLessons} lessons <span className="mx-1">•</span> {hoursCount} hours
          </div>
          <Link
            href={href}
            className={`inline-flex items-center text-sm font-medium ${colorClass.text} hover:underline`}
          >
            {isCompleted ? 'Review' : 'Continue'} 
            {!isCompleted && <ArrowRight className="ml-1 h-4 w-4" />}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCardFull; 