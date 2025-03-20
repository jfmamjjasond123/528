'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClockIcon, CalendarIcon, ChartBarIcon, ArrowRightIcon, DocumentTextIcon, CheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// Mock data for full-length exams with attempts history
const mockExams = [
  {
    id: 1,
    title: 'CARS Full Length 1',
    estimatedTime: '90 minutes',
    totalScore: 132,
    totalQuestions: 53,
    attempts: [
      {
        attemptNumber: 1,
        completed: true,
        attemptDate: '2023-11-20T09:20:00',
        score: 124,
        percentile: 89,
        correctAnswers: 48,
        timeFactor: '1x'
      },
      {
        attemptNumber: 2,
        completed: true,
        attemptDate: '2023-12-15T10:30:00',
        score: 128,
        percentile: 94,
        correctAnswers: 51,
        timeFactor: '1.25x'
      },
      {
        attemptNumber: 3,
        completed: false
      }
    ]
  },
  {
    id: 2,
    title: 'CARS Full Length 2',
    estimatedTime: '90 minutes',
    totalScore: 132,
    totalQuestions: 53,
    attempts: [
      {
        attemptNumber: 1,
        completed: true,
        attemptDate: '2024-01-20T14:15:00',
        score: 124,
        percentile: 89,
        correctAnswers: 48,
        timeFactor: '1x'
      },
      {
        attemptNumber: 2,
        completed: false
      }
    ]
  },
  {
    id: 3,
    title: 'CARS Full Length 3',
    estimatedTime: '90 minutes',
    totalScore: 132,
    totalQuestions: 53,
    attempts: [
      {
        attemptNumber: 1,
        completed: false
      }
    ]
  },
  {
    id: 4,
    title: 'CARS Full Length 4',
    estimatedTime: '90 minutes',
    totalScore: 132,
    totalQuestions: 53,
    attempts: [
      {
        attemptNumber: 1,
        completed: false
      }
    ]
  },
];

// Format date helper function
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  
  // Use explicit formatting to avoid hydration errors
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Format time (24-hour format)
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${month} ${day}, ${year} at ${hours}:${minutes}`;
};

// Define types for our data structure
type Attempt = {
  attemptNumber: number;
  completed: boolean;
  attemptDate?: string;
  score?: number;
  percentile?: number;
  correctAnswers?: number;
  timeFactor?: string;
};

type Exam = {
  id: number;
  title: string;
  estimatedTime: string;
  totalScore: number;
  totalQuestions: number;
  attempts: Attempt[];
};

// Get the formatted date from the last attempt
const getLastWorkedDate = (attempts: Attempt[]): string | null => {
  const completedAttempts = attempts.filter(attempt => attempt.completed);
  if (completedAttempts.length === 0) return null;
  
  // Find the most recent attempt with a valid date
  let latestDate: Date | null = null;
  let latestAttempt: Attempt | null = null;
  
  for (const attempt of completedAttempts) {
    if (attempt.attemptDate) {
      const date = new Date(attempt.attemptDate);
      if (latestDate === null || date > latestDate) {
        latestDate = date;
        latestAttempt = attempt;
      }
    }
  }
  
  if (!latestAttempt || !latestDate) return null;
  
  return `${latestDate.getMonth() + 1}/${latestDate.getDate()}`;
};

// Helper function to get ordinal suffix
const getOrdinalSuffix = (num: number): string => {
  if (num === 1) return 'st';
  if (num === 2) return 'nd';
  if (num === 3) return 'rd';
  return 'th';
};

// Bell Curve component for visualizing percentile
const BellCurve = ({ percentile }: { percentile: number }) => {
  const [animated, setAnimated] = useState(false);
  
  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate position marker based on percentile (0-100)
  const markerPosition = Math.min(Math.max(percentile / 100, 0), 1); // Normalize between 0 and 1
  
  // Calculate Y position using bell curve formula
  // For a point at x% of the bell curve, we want it to follow the bell curve's top
  const bellHeight = (x: number) => {
    // Simple bell curve function based on position
    return 50 * Math.exp(-Math.pow((x - 0.5) * 4, 2));
  };
  
  // Calculate position of the dot on the bell curve
  const dotYPosition = 50 - bellHeight(markerPosition);
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full h-24 px-4">
        {/* Bell curve visualization */}
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Background bell curve shape */}
          <path
            d="M0,50 C20,50 25,0 50,0 C75,0 80,50 100,50 Z"
            fill="#f0f0f0"
            stroke="#e0e0e0"
            strokeWidth="1"
          />
          
          {/* Colored portion of the bell curve based on percentile */}
          <path
            d={`M0,50 C20,50 25,0 ${50 * markerPosition},${50 * (1 - markerPosition)} L${50 * markerPosition},50 Z`}
            fill={percentile > 90 ? "#4ade80" : percentile > 70 ? "#60a5fa" : percentile > 50 ? "#facc15" : "#f87171"}
            fillOpacity="0.3"
            className={`transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Marker dot - positioned on the bell curve without line */}
          <circle
            cx={50 * markerPosition}
            cy={animated ? dotYPosition : 50}
            r="4"
            fill={percentile > 90 ? "#4ade80" : percentile > 70 ? "#60a5fa" : percentile > 50 ? "#facc15" : "#f87171"}
            className={`transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}
          />
        </svg>
        
        {/* Percentile text overlay - ENLARGED */}
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-700 ${animated ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="font-extrabold text-2xl text-gray-800 font-mono">{percentile}%</div>
          <div className="text-xs text-gray-600">Percentile</div>
        </div>
      </div>
      
      {/* Percentile scale - closer to edges */}
      <div className="w-full flex justify-between text-xs text-gray-500 px-0">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

// Exam Card with tabbed interface for multiple attempts
const ExamCard = ({ exam }: { exam: typeof mockExams[0] }) => {
  const [selectedAttemptIndex, setSelectedAttemptIndex] = useState(0);
  const selectedAttempt = exam.attempts[selectedAttemptIndex];
  const maxAttemptsToShow = 5; // Maximum number of attempt tabs to show
  
  // Generate an array of 5 attempt tabs (fill with placeholder attempts if needed)
  const attemptsToShow = [...Array(maxAttemptsToShow)].map((_, index) => {
    return exam.attempts[index] || { 
      attemptNumber: index + 1, 
      completed: false
    };
  });
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <div>
        <div className="flex justify-between items-center px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
        </div>
        
        {/* Attempt Tabs styled like file tabs */}
        <div className="flex px-6 mt-2 relative">
          {/* Tab background line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 z-0"></div>
          
          {attemptsToShow.map((attempt, index) => {
            const isRealAttempt = index < exam.attempts.length;
            const isSelected = index === selectedAttemptIndex;
            const isDisabled = !isRealAttempt;
            const attemptNum = index + 1;
            const suffix = getOrdinalSuffix(attemptNum);
            
            return (
              <button
                key={index}
                onClick={() => isRealAttempt ? setSelectedAttemptIndex(index) : null}
                disabled={isDisabled}
                className={`
                  relative px-5 py-3 text-sm font-medium mr-2 rounded-t-md whitespace-nowrap
                  ${isDisabled 
                    ? 'text-gray-300 cursor-default bg-gray-50' 
                    : isSelected
                      ? 'text-khan-blue bg-white border-t border-r border-l border-gray-200 z-10'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 bg-gray-100'
                  }
                  ${isSelected ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-white' : ''}
                `}
              >
                {`${attemptNum}${suffix} Attempt`}
                {attempt.completed && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                    <CheckIcon className="inline-block h-3 w-3 mr-0.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Attempt Content */}
      <div className="p-6 border-t border-gray-200">
        {selectedAttempt.completed ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column: Score and Time */}
            <div className="md:w-1/3">
              <div className="flex items-center mb-6">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-gray-900 font-mono tracking-tight">{selectedAttempt.score}</span>
                    <span className="text-base text-gray-500 ml-1 font-medium">/ {exam.totalScore}</span>
                  </div>
                  <span className="text-sm text-gray-600">Score</span>
                </div>
                
                <div className="ml-4 flex items-center bg-gray-100 px-2 py-1 rounded">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-1" />
                  <span className="text-sm font-medium text-gray-600">{selectedAttempt.timeFactor}</span>
                </div>
              </div>
              
              {/* Questions answered */}
              <div className="text-sm text-gray-600 mb-4">
                <p>{selectedAttempt.correctAnswers} of {exam.totalQuestions} questions answered correctly</p>
              </div>
              
              {/* Completion date */}
              <div className="text-sm text-gray-500">
                <p>Completed on {formatDate(selectedAttempt.attemptDate)}</p>
              </div>
            </div>
            
            {/* Middle Column: Bell Curve */}
            <div className="md:w-1/3 flex items-center justify-center">
              <BellCurve percentile={selectedAttempt.percentile || 0} />
            </div>
            
            {/* Right Column: Actions */}
            <div className="md:w-1/3 flex flex-col items-center gap-3">
              <Link 
                href={`/dashboard/score-report?exam=full-length&id=${exam.id}`}
                className="w-1/2 px-4 py-3 bg-blue-500 text-white font-medium rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Score Report
              </Link>
              <button className="w-1/2 px-4 py-3 bg-gray-100 text-gray-800 font-medium rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors">
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Review Exam
              </button>
              <button className="w-1/2 px-4 py-3 bg-red-50 text-red-700 font-medium rounded-md flex items-center justify-center hover:bg-red-100 transition-colors">
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Reset Exam
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-600 mb-6">Begin this attempt to track your progress</p>
            <button className="px-8 py-3 bg-khan-blue text-white font-medium rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors">
              Start Exam
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
            <p className="text-xs text-gray-500 mt-4">Estimated time: {exam.estimatedTime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function FullLengthsPage() {
  const [showOnlyUnattempted, setShowOnlyUnattempted] = useState(false);
  
  // Filter exams based on the toggle
  const filteredExams = showOnlyUnattempted
    ? mockExams.filter(exam => !exam.attempts.some(attempt => attempt.completed))
    : mockExams;
  
  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <DocumentTextIcon className="w-7 h-7 text-blue-700" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Full Length CARS Exams</h1>
                  <p className="text-gray-600">Complete these exams to test your CARS skills and track your progress.</p>
                </div>
              </div>
              
              {/* Filter toggle */}
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showOnlyUnattempted}
                    onChange={() => setShowOnlyUnattempted(!showOnlyUnattempted)}
                  />
                  <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer 
                    ${showOnlyUnattempted ? 'peer-checked:after:translate-x-full peer-checked:bg-khan-blue' : ''} 
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Show only unattempted
                  </span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Exams Grid */}
          <div className="space-y-6">
            {filteredExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
          
          {/* Empty state */}
          {filteredExams.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <h3 className="text-lg font-medium text-gray-900">No exams found</h3>
              <p className="mt-2 text-gray-500">There are no exams matching your filters.</p>
              <button
                onClick={() => setShowOnlyUnattempted(false)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-khan-blue hover:bg-blue-700"
              >
                Show all exams
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 