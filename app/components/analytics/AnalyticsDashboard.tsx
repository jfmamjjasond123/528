"use client";

import React, { useEffect } from 'react';
import ProgressCard from './ProgressCard';
import { useAnalyticsStore } from '../../lib/stores';
import { AnalyticsData } from '../../lib/stores/types';

interface AnalyticsDashboardProps {
  data?: AnalyticsData;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = (props) => {
  // Use the analytics store
  const { 
    analytics, 
    isLoading, 
    error, 
    fetchAnalytics, 
    timeRange, 
    setTimeRange, 
    clearError 
  } = useAnalyticsStore();
  
  // Fetch analytics data on component mount if needed
  useEffect(() => {
    if (!analytics && !isLoading) {
      fetchAnalytics();
    }
  }, [analytics, isLoading, fetchAnalytics]);
  
  // Use the provided data or the data from the store
  const data = props.data || analytics;
  
  // Time range options
  const timeRangeOptions = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'year', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];
  
  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value as 'week' | 'month' | 'year' | 'all');
  };

  const handleRefresh = () => {
    fetchAnalytics();
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Progress Summary</h2>
          <div className="animate-pulse w-40 h-10 bg-gray-200 rounded-md"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 h-64">
              <div className="animate-pulse flex flex-col h-full">
                <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-6"></div>
                <div className="flex justify-center mb-8">
                  <div className="h-32 w-32 bg-gray-200 rounded-full"></div>
                </div>
                <div className="mt-auto space-y-2 w-full">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Progress Summary</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={clearError}
            className="mt-2 text-sm text-red-600 underline hover:text-red-800"
          >
            Dismiss
          </button>
          <button 
            onClick={fetchAnalytics}
            className="mt-2 ml-4 text-sm text-blue-600 underline hover:text-blue-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  // If no data, but not loading or error
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Progress Summary</h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <button 
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Load Analytics Data
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Progress Summary</h2>
        
        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <div className="relative">
            <select
              value={timeRange}
              onChange={handleTimeRangeChange}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {timeRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          {/* Refresh Button */}
          <button 
            onClick={handleRefresh}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            title="Refresh analytics data"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
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