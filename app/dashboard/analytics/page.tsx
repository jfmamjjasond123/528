'use client';

import React, { useState, useEffect } from 'react';
import {
  ChartPieIcon,
  ChartBarIcon,
  ClockIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  BookOpen as BookOpenIcon, Brain as BrainIcon, 
  Trophy as TrophyIcon, Users2 as Users2Icon,
  Target as TargetIcon, BookText as BookTextIcon, Lightbulb as LightbulbIcon
} from 'lucide-react';
import { useCarsAnalyticsStore } from '../../lib/stores';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function AnalyticsPage() {
  // Use CARS analytics store
  const { 
    performanceData,
    fullLengthScoresData,
    distractorAnalysisData,
    subjectPerformanceData,
    skillsData,
    passageTypePerformanceData,
    questionTypeData,
    studyTimeData,
    practiceSessionsData,
    skillsRadarData,
    passageCompletionData,
    questionBankData,
    selectedTimeRange,
    isLoading,
    error,
    fetchCarsAnalytics,
    setSelectedTimeRange,
    clearError
  } = useCarsAnalyticsStore();
  
  // Local UI state
  const [timeRange, setTimeRange] = useState('3m');
  
  // State for subject chart toggle controls
  const [subjectVisibility, setSubjectVisibility] = useState({
    humanities: true,
    socialSciences: true,
    naturalSciences: true,
    philosophy: true
  });
  
  // Fetch data on component mount
  useEffect(() => {
    fetchCarsAnalytics();
  }, [fetchCarsAnalytics]);
  
  // Toggle visibility of a subject
  const toggleSubjectVisibility = (subject: keyof typeof subjectVisibility) => {
    setSubjectVisibility({
      ...subjectVisibility,
      [subject]: !subjectVisibility[subject]
    });
  };
  
  // Handle time range changes
  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTimeRange(value);
    
    // Map UI time range to store time range
    const storeTimeRange = 
      value === '1w' ? 'week' :
      value === '3m' ? 'month' :
      value === '1y' ? 'year' : 'all';
    
    setSelectedTimeRange(storeTimeRange);
  };
  
  // Stats cards data
  const statsCards = [
    {
      title: 'Average CARS Score',
      value: '128/132',
      icon: <TrophyIcon className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Avg. Passage Time',
      value: '8.2 min',
      icon: <ClockIcon className="w-6 h-6 text-green-500" />
    },
    {
      title: 'Passages Completed',
      value: '42',
      icon: <BookTextIcon className="w-6 h-6 text-purple-500" />
    },
    {
      title: 'Accuracy Rate',
      value: '82%',
      icon: <TargetIcon className="w-6 h-6 text-orange-500" />
    }
  ];
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-khan-background">
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <ChartBarIcon className="w-7 h-7 text-blue-700" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">MCAT CARS Analytics</h1>
                  <p className="text-gray-600">Loading your analytics data...</p>
                </div>
              </div>
            </div>
            
            {/* Loading skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="animate-pulse flex items-center">
                    <div className="rounded-lg h-10 w-10 bg-gray-200 mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 min-h-64">
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-khan-background">
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg mr-4">
                  <span className="text-red-600 text-xl">⚠️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Error Loading Analytics</h1>
                  <p className="text-gray-600">{error}</p>
                </div>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => {
                    clearError();
                    fetchCarsAnalytics();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <ChartBarIcon className="w-7 h-7 text-blue-700" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">MCAT CARS Analytics</h1>
                  <p className="text-gray-600">Track your CARS performance and identify areas for improvement</p>
                </div>
              </div>
              
              {/* Time range selector */}
              <div className="mt-4 md:mt-0">
                <select
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1w">Last Week</option>
                  <option value="3m">Last 3 Months</option>
                  <option value="1y">Last Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Question Bank Usage Tiles */}
          <div className="mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Accuracy Tile */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Question Bank Accuracy</h2>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-48 h-24 mb-4">
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                      <path 
                        d="M 40,100 A 60,60 0 0,1 160,100" 
                        fill="none" 
                        stroke="#f3f4f6" 
                        strokeWidth="30" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M 40,100 A 60,60 0 0,1 100,22" 
                        fill="none" 
                        stroke="#a3e635" 
                        strokeWidth="30" 
                        strokeLinecap="round"
                        className="animate-dash"
                        style={{ strokeDasharray: '120', strokeDashoffset: '0' }}
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-1">
                      {questionBankData ? 
                        Math.round((questionBankData.correctQuestions / (questionBankData.correctQuestions + questionBankData.incorrectAnswers)) * 100) + '%' 
                        : '0%'}
                    </div>
                    <p className="text-gray-600 text-sm">Accurate</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-700">Correct Questions</span>
                    <span className="font-medium">{questionBankData.correctQuestions} / {questionBankData.totalPossibleQuestions}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-700">Incorrect Answers</span>
                    <span className="font-medium">{questionBankData.incorrectAnswers} / {questionBankData.totalPossibleQuestions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Incomplete Questions</span>
                    <span className="font-medium">{questionBankData.incompleteQuestions} / {questionBankData.totalPossibleQuestions}</span>
                  </div>
                </div>
              </div>
              
              {/* Completion Tile */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Question Bank Usage</h2>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-48 h-24 mb-4">
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                      <path 
                        d="M 40,100 A 60,60 0 0,1 160,100" 
                        fill="none" 
                        stroke="#f3f4f6" 
                        strokeWidth="30" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M 40,100 A 60,60 0 0,1 130,46" 
                        fill="none" 
                        stroke="#f3a4b4" 
                        strokeWidth="30" 
                        strokeLinecap="round"
                        className="animate-dash"
                        style={{ strokeDasharray: '150', strokeDashoffset: '0' }}
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-1">65%</div>
                    <p className="text-gray-600 text-sm">Completed</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-700">Seen Questions</span>
                    <span className="font-medium">{questionBankData.seenQuestions} / {questionBankData.totalPossibleQuestions}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-700">Unseen Questions</span>
                    <span className="font-medium">{questionBankData.unseenQuestions} / {questionBankData.totalPossibleQuestions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Questions</span>
                    <span className="font-medium">{questionBankData.totalQuestions} / {questionBankData.totalPossibleQuestions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full Length Scores */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Full Length Scores</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={fullLengthScoresData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[125, 132]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="chem" 
                    name="Chem/Phys" 
                    stroke="#1a73e8" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cars" 
                    name="CARS" 
                    stroke="#f87171" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bio" 
                    name="Bio/Biochem" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="psych" 
                    name="Psych/Soc" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Distractor Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Distractor Analysis</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={distractorAnalysisData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  stackOffset="expand"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="correctAnswer" 
                    name="Correct Answer" 
                    stackId="1"
                    stroke="#4ade80" 
                    fill="#4ade80" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="closeDistractor" 
                    name="Close Distractor" 
                    stackId="1"
                    stroke="#fb923c" 
                    fill="#fb923c" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="unrelatedDistractor" 
                    name="Unrelated Distractor" 
                    stackId="1"
                    stroke="#60a5fa" 
                    fill="#60a5fa" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="oppositeDistractor" 
                    name="Opposite Distractor" 
                    stackId="1"
                    stroke="#f43f5e" 
                    fill="#f43f5e" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Subject Performance */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Subject</h2>
              <div className="flex flex-wrap gap-3 mt-2 md:mt-0">
                <button 
                  onClick={() => toggleSubjectVisibility('humanities')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center ${
                    subjectVisibility.humanities
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-1.5 ${subjectVisibility.humanities ? 'bg-purple-500' : 'bg-gray-400'}`}></span>
                  Humanities
                </button>
                <button 
                  onClick={() => toggleSubjectVisibility('socialSciences')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center ${
                    subjectVisibility.socialSciences
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-1.5 ${subjectVisibility.socialSciences ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                  Social Sciences
                </button>
                <button 
                  onClick={() => toggleSubjectVisibility('naturalSciences')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center ${
                    subjectVisibility.naturalSciences
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-1.5 ${subjectVisibility.naturalSciences ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  Natural Sciences
                </button>
                <button 
                  onClick={() => toggleSubjectVisibility('philosophy')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center ${
                    subjectVisibility.philosophy
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-1.5 ${subjectVisibility.philosophy ? 'bg-amber-500' : 'bg-gray-400'}`}></span>
                  Philosophy
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={subjectPerformanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip />
                  <Legend />
                  {subjectVisibility.humanities && (
                    <Line 
                      type="monotone" 
                      dataKey="humanities" 
                      name="Humanities" 
                      stroke="#9333ea" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }} 
                    />
                  )}
                  {subjectVisibility.socialSciences && (
                    <Line 
                      type="monotone" 
                      dataKey="socialSciences" 
                      name="Social Sciences" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }} 
                    />
                  )}
                  {subjectVisibility.naturalSciences && (
                    <Line 
                      type="monotone" 
                      dataKey="naturalSciences" 
                      name="Natural Sciences" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }} 
                    />
                  )}
                  {subjectVisibility.philosophy && (
                    <Line 
                      type="monotone" 
                      dataKey="philosophy" 
                      name="Philosophy" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }} 
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Skills Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={skillsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="criticalAnalysis" 
                    name="Critical Analysis" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="readingComprehension" 
                    name="Reading Comprehension" 
                    stroke="#ec4899" 
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 