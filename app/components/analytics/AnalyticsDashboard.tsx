"use client";

import React from 'react';
import ProgressCard from './ProgressCard';
import Link from 'next/link';

// This interface matches the specified data structure
interface DashboardData {
  courseCompletion: {
    percentageCompleted: number;  // 0-100
    lessonsCompleted: number;
    totalLessons: number;
    lessonsLeft: number;
  };
  passagesProgress: {
    percentageCompleted: number;  // 0-100
    passagesCompleted: number;
    totalPassages: number;
    passagesLeft: number;
  };
  questionAccuracy: {
    percentageCorrect: number;  // 0-100
    correctAnswers: number;
    incorrectAnswers: number;
    incompleteAnswers: number;
    totalQuestions: number;
  };
}

// Mock data for demonstration
const mockData: DashboardData = {
  courseCompletion: {
    percentageCompleted: 65,
    lessonsCompleted: 325,
    totalLessons: 500,
    lessonsLeft: 175
  },
  passagesProgress: {
    percentageCompleted: 42,
    passagesCompleted: 210,
    totalPassages: 500,
    passagesLeft: 290
  },
  questionAccuracy: {
    percentageCorrect: 78,
    correctAnswers: 780,
    incorrectAnswers: 150,
    incompleteAnswers: 70,
    totalQuestions: 1000
  }
};

interface AnalyticsDashboardProps {
  data?: DashboardData;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  data = mockData // Use mock data as default if no data is provided
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Progress Summary</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course Completion Card */}
        <ProgressCard
          title="Course Completion"
          percentage={data.courseCompletion.percentageCompleted}
          color="#F4AABC" // Pink
          label="Completed"
          metrics={[
            { 
              label: "Lessons Completed", 
              value: `${data.courseCompletion.lessonsCompleted} / ${data.courseCompletion.totalLessons}` 
            },
            { 
              label: "Lessons Remaining", 
              value: `${data.courseCompletion.lessonsLeft}` 
            }
          ]}
        />
        
        {/* Passages Progress Card */}
        <ProgressCard
          title="Passages Progress"
          percentage={data.passagesProgress.percentageCompleted}
          color="#FFCF9D" // Peach/Orange
          label="Completed"
          metrics={[
            { 
              label: "Passages Completed", 
              value: `${data.passagesProgress.passagesCompleted} / ${data.passagesProgress.totalPassages}` 
            },
            { 
              label: "Passages Remaining", 
              value: `${data.passagesProgress.passagesLeft}` 
            }
          ]}
        />
        
        {/* Question Accuracy Card */}
        <ProgressCard
          title="Question Accuracy"
          percentage={data.questionAccuracy.percentageCorrect}
          color="#C7F5C7" // Light Green
          label="Correct"
          metrics={[
            { 
              label: "Correct Answers", 
              value: `${data.questionAccuracy.correctAnswers} / ${data.questionAccuracy.totalQuestions}` 
            },
            { 
              label: "Incorrect / Incomplete", 
              value: `${data.questionAccuracy.incorrectAnswers} / ${data.questionAccuracy.incompleteAnswers}` 
            }
          ]}
        />
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 