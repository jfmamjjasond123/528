'use client';

import React, { useState } from 'react';
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

// Mock data for MCAT CARS analytics
const performanceData = [
  { name: 'Jan', score: 68, avgTime: 10.2 },
  { name: 'Feb', score: 72, avgTime: 9.8 },
  { name: 'Mar', score: 75, avgTime: 9.5 },
  { name: 'Apr', score: 79, avgTime: 9.0 },
  { name: 'May', score: 82, avgTime: 8.5 },
  { name: 'Jun', score: 85, avgTime: 8.2 },
  { name: 'Jul', score: 87, avgTime: 7.8 },
  { name: 'Aug', score: 90, avgTime: 7.5 }
];

// Mock data for Full Length Scores
const fullLengthScoresData = [
  { name: 'FL 1', chem: 129, cars: 128, bio: 130, psych: 131 },
  { name: 'FL 2', chem: 130, cars: 129, bio: 130, psych: 130 },
  { name: 'FL 3', chem: 131, cars: 130, bio: 131, psych: 132 },
  { name: 'FL 4', chem: 131, cars: 131, bio: 132, psych: 131 },
  { name: 'FL 5', chem: 132, cars: 130, bio: 131, psych: 132 }
];

// Mock data for Distractor Analysis
const distractorAnalysisData = [
  { date: 'Jan 1', correctAnswer: 50, closeDistractor: 30, unrelatedDistractor: 15, oppositeDistractor: 5 },
  { date: 'Jan 15', correctAnswer: 55, closeDistractor: 28, unrelatedDistractor: 12, oppositeDistractor: 5 },
  { date: 'Feb 1', correctAnswer: 60, closeDistractor: 25, unrelatedDistractor: 10, oppositeDistractor: 5 },
  { date: 'Feb 15', correctAnswer: 65, closeDistractor: 20, unrelatedDistractor: 10, oppositeDistractor: 5 },
  { date: 'Mar 1', correctAnswer: 70, closeDistractor: 18, unrelatedDistractor: 8, oppositeDistractor: 4 },
  { date: 'Mar 15', correctAnswer: 75, closeDistractor: 15, unrelatedDistractor: 7, oppositeDistractor: 3 },
  { date: 'Apr 1', correctAnswer: 80, closeDistractor: 12, unrelatedDistractor: 5, oppositeDistractor: 3 }
];

// Mock data for Subject performance
const subjectPerformanceData = [
  { date: 'Jan', humanities: 72, socialSciences: 68, naturalSciences: 75, philosophy: 62 },
  { date: 'Feb', humanities: 74, socialSciences: 70, naturalSciences: 78, philosophy: 65 },
  { date: 'Mar', humanities: 78, socialSciences: 75, naturalSciences: 82, philosophy: 70 },
  { date: 'Apr', humanities: 83, socialSciences: 79, naturalSciences: 85, philosophy: 76 },
  { date: 'May', humanities: 86, socialSciences: 83, naturalSciences: 88, philosophy: 80 },
  { date: 'Jun', humanities: 90, socialSciences: 87, naturalSciences: 92, philosophy: 85 }
];

// Mock data for MCAT CARS Skills
const skillsData = [
  { month: 'Jan', criticalAnalysis: 70, readingComprehension: 65 },
  { month: 'Feb', criticalAnalysis: 72, readingComprehension: 69 },
  { month: 'Mar', criticalAnalysis: 75, readingComprehension: 74 },
  { month: 'Apr', criticalAnalysis: 78, readingComprehension: 80 },
  { month: 'May', criticalAnalysis: 83, readingComprehension: 84 },
  { month: 'Jun', criticalAnalysis: 87, readingComprehension: 89 }
];

const passageTypePerformanceData = [
  { name: 'Humanities', score: 85 },
  { name: 'Social Sciences', score: 78 },
  { name: 'Natural Sciences', score: 92 },
  { name: 'Philosophy', score: 76 },
  { name: 'Ethics', score: 88 }
];

const questionTypeData = [
  { name: 'Main Idea', value: 88 },
  { name: 'Detail', value: 75 },
  { name: 'Inference', value: 65 },
  { name: 'Reasoning', value: 82 },
  { name: 'Application', value: 70 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const studyTimeData = [
  { name: 'Reading', value: 35 },
  { name: 'Practice Questions', value: 40 },
  { name: 'Review', value: 15 },
  { name: 'Full Passages', value: 10 }
];

const practiceSessionsData = [
  { date: 'Week 1', sessions: 3, avgScore: 65 },
  { date: 'Week 2', sessions: 4, avgScore: 68 },
  { date: 'Week 3', sessions: 5, avgScore: 72 },
  { date: 'Week 4', sessions: 4, avgScore: 75 },
  { date: 'Week 5', sessions: 6, avgScore: 78 },
  { date: 'Week 6', sessions: 7, avgScore: 82 },
  { date: 'Week 7', sessions: 8, avgScore: 85 },
  { date: 'Week 8', sessions: 7, avgScore: 88 }
];

const skillsRadarData = [
  { subject: 'Reading Speed', A: 85, fullMark: 100 },
  { subject: 'Comprehension', A: 80, fullMark: 100 },
  { subject: 'Critical Analysis', A: 70, fullMark: 100 },
  { subject: 'Reasoning', A: 75, fullMark: 100 },
  { subject: 'Inference', A: 65, fullMark: 100 },
  { subject: 'Application', A: 72, fullMark: 100 },
];

const passageCompletionData = [
  { name: 'Passage 1', completion: 95, avgTime: 8.5 },
  { name: 'Passage 2', completion: 88, avgTime: 9.2 },
  { name: 'Passage 3', completion: 76, avgTime: 10.1 },
  { name: 'Passage 4', completion: 65, avgTime: 10.8 },
  { name: 'Passage 5', completion: 58, avgTime: 11.5 }
];

// Add question bank usage data
const questionBankData = {
  correctQuestions: 455,
  incorrectAnswers: 67,
  incompleteQuestions: 55,
  seenQuestions: 455,
  unseenQuestions: 67,
  totalQuestions: 55,
  totalPossibleQuestions: 500
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('3m');
  
  // State for subject chart toggle controls
  const [subjectVisibility, setSubjectVisibility] = useState({
    humanities: true,
    socialSciences: true,
    naturalSciences: true,
    philosophy: true
  });
  
  // Toggle visibility of a subject
  const toggleSubjectVisibility = (subject: keyof typeof subjectVisibility) => {
    setSubjectVisibility({
      ...subjectVisibility,
      [subject]: !subjectVisibility[subject]
    });
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
                    <div className="text-5xl font-bold mb-1">50%</div>
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