import React from 'react';

interface ProgressSummaryProps {
  totalCoursesEnrolled: number;
  coursesCompleted: number;
  currentStreak: number;
  hoursThisWeek: number;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  totalCoursesEnrolled,
  coursesCompleted,
  currentStreak,
  hoursThisWeek,
}) => {
  const completionRate = Math.round((coursesCompleted / totalCoursesEnrolled) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">My Progress Summary</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Course Completion</p>
          <p className="text-2xl font-bold mt-1">{completionRate}%</p>
          <p className="text-xs text-gray-600 mt-1">
            {coursesCompleted} of {totalCoursesEnrolled} courses
          </p>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Current Streak</p>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold">{currentStreak}</span>
            <span className="text-xl ml-1">🔥</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">days in a row</p>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Hours This Week</p>
          <p className="text-2xl font-bold mt-1">{hoursThisWeek}</p>
          <p className="text-xs text-gray-600 mt-1">hours of learning</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall progress</span>
          <span className="text-sm font-medium text-gray-700">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full bg-khan-blue"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary; 