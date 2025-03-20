import React from 'react';

interface ProgressStats {
  totalCoursesEnrolled: number;
  coursesCompleted: number;
  totalLessonsCompleted: number;
  totalExercisesCompleted: number;
  quizzesCompleted: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  hoursThisWeek: number;
  hoursTotal: number;
}

// Mock data for progress stats
const defaultStats: ProgressStats = {
  totalCoursesEnrolled: 8,
  coursesCompleted: 3,
  totalLessonsCompleted: 87,
  totalExercisesCompleted: 214,
  quizzesCompleted: 12,
  averageScore: 83,
  currentStreak: 5,
  longestStreak: 14,
  hoursThisWeek: 14,
  hoursTotal: 143,
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, suffix }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-white mr-4`}>
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">
            {value}
            {suffix && <span className="text-sm font-normal ml-1">{suffix}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

interface ProgressProps {
  stats?: ProgressStats;
}

const Progress: React.FC<ProgressProps> = ({ stats = defaultStats }) => {
  const completionRate = Math.round((stats.coursesCompleted / stats.totalCoursesEnrolled) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">My Progress Overview</h2>
      
      {/* Course Completion Rate */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Course Completion Rate</h3>
          <span className="text-khan-blue font-semibold">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="h-3 rounded-full bg-khan-blue" 
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          You've completed {stats.coursesCompleted} of {stats.totalCoursesEnrolled} enrolled courses
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Lessons Completed"
          value={stats.totalLessonsCompleted}
          icon="📚"
          color="bg-khan-blue"
        />
        <StatCard 
          title="Exercises Completed"
          value={stats.totalExercisesCompleted}
          icon="✏️"
          color="bg-khan-green"
        />
        <StatCard 
          title="Average Quiz Score"
          value={stats.averageScore}
          icon="📝"
          color="bg-khan-purple"
          suffix="%"
        />
        <StatCard 
          title="Learning Streak"
          value={stats.currentStreak}
          icon="🔥"
          color="bg-orange-500"
          suffix="days"
        />
      </div>
      
      {/* Learning Time */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-semibold mb-4">Learning Time</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="p-3 rounded-full bg-khan-blue/10 text-khan-blue mr-4">
              <span className="text-xl">⏱️</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">This Week</p>
              <p className="text-xl font-bold">{stats.hoursThisWeek} <span className="text-sm font-normal">hours</span></p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="p-3 rounded-full bg-khan-purple/10 text-khan-purple mr-4">
              <span className="text-xl">🕰️</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">{stats.hoursTotal} <span className="text-sm font-normal">hours</span></p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Streak Information */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="font-semibold mb-4">Learning Streaks</h3>
        <div className="flex items-center">
          <div className="p-4 bg-orange-50 rounded-lg flex items-center mr-6">
            <span className="text-3xl mr-3">🔥</span>
            <div>
              <p className="text-sm text-gray-500">Current Streak</p>
              <p className="text-xl font-bold">{stats.currentStreak} <span className="text-sm font-normal">days</span></p>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg flex items-center">
            <span className="text-3xl mr-3">🏆</span>
            <div>
              <p className="text-sm text-gray-500">Longest Streak</p>
              <p className="text-xl font-bold">{stats.longestStreak} <span className="text-sm font-normal">days</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress; 