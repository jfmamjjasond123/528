'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Mock report data
const reportData = {
  testId: '#QB-2354',
  examDate: 'February 23, 2024',
  timeMode: '1x',
  completionTime: '23m 56s',
  averageQuestionTime: '1m 12s',
  score: 85,
  scaledScore: 85,
  totalScore: 100,
  correctAnswers: 17,
  incorrectAnswers: 3,
  incompleteAnswers: 0,
  totalQuestions: 20,
  percentile: 78,
  scoreRange: {
    min: 75,
    max: 95,
    current: 85
  }
};

// Mock subject data for SubjectBreakdownChart component
const mockSubjectData = [
  {
    id: 1,
    subject: "Philosophy",
    totalQuestions: 12,
    correctAnswers: 9,
    incorrectAnswers: 2,
    notAttempted: 1
  },
  {
    id: 2,
    subject: "Religion",
    totalQuestions: 15,
    correctAnswers: 10,
    incorrectAnswers: 4,
    notAttempted: 1
  },
  {
    id: 3,
    subject: "History",
    totalQuestions: 18,
    correctAnswers: 7,
    incorrectAnswers: 8,
    notAttempted: 3
  },
  {
    id: 4,
    subject: "Art & Literature",
    totalQuestions: 14,
    correctAnswers: 11,
    incorrectAnswers: 2,
    notAttempted: 1
  },
  {
    id: 5,
    subject: "Social Science",
    totalQuestions: 16,
    correctAnswers: 6,
    incorrectAnswers: 7,
    notAttempted: 3
  },
  {
    id: 6,
    subject: "Natural Science",
    totalQuestions: 10,
    correctAnswers: 4,
    incorrectAnswers: 3,
    notAttempted: 3
  }
];

// Mock skill data for SkillsBreakdownChart component
const mockSkillData = [
  {
    id: 1,
    skillNumber: 1,
    skillName: "Foundations of Comprehension",
    totalQuestions: 20,
    correctAnswers: 15,
    incorrectAnswers: 4,
    notAttempted: 1
  },
  {
    id: 2,
    skillNumber: 2,
    skillName: "Reasoning Within the Text",
    totalQuestions: 25,
    correctAnswers: 12,
    incorrectAnswers: 10,
    notAttempted: 3
  },
  {
    id: 3,
    skillNumber: 3,
    skillName: "Reasoning Beyond the Text",
    totalQuestions: 18,
    correctAnswers: 8,
    incorrectAnswers: 8,
    notAttempted: 2
  }
];

// SemiCircleGauge Component (similar to the dashboard's SemiCircleGauge)
const SemiCircleGauge = ({ score, totalScore, color }: { score: number; totalScore: number; color: string }) => {
  // Add state for animated percentage
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  // Calculate percentage for animation
  const percentage = (score / totalScore) * 100;
  
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(100, Math.max(0, percentage));
  
  // SVG parameters
  const size = 180; // SVG viewBox size
  const strokeWidth = 24; // Width of the donut arc
  const radius = (size - strokeWidth) / 2; // Radius of the arc
  const center = size / 2; // Center point
  
  // Calculate the circumference of the semicircle
  const circumference = Math.PI * radius;
  
  // Calculate the arc length based on animated percentage
  const arcLength = (animatedPercentage / 100) * circumference;
  
  // Calculate the dash offset to hide the remaining portion
  const dashOffset = circumference - arcLength;

  // Animation effect
  useEffect(() => {
    // Reset to 0 when component mounts
    setAnimatedPercentage(0);
    
    // Animate from 0 to the actual percentage
    const animationDuration = 1500; // ms
    const steps = 60; // number of steps in animation
    const stepValue = validPercentage / steps;
    const stepDuration = animationDuration / steps;
    
    let currentStep = 0;
    
    const animationInterval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setAnimatedPercentage(prev => Math.min(prev + stepValue, validPercentage));
      } else {
        clearInterval(animationInterval);
      }
    }, stepDuration);
    
    return () => clearInterval(animationInterval);
  }, [validPercentage]); // Re-run when percentage prop changes
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24">
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${size} ${size / 2}`} 
          className="overflow-visible"
        >
          {/* Background arc (gray) */}
          <path
            d={`M ${strokeWidth / 2}, ${size / 2} 
                a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Colored progress arc */}
          <path
            d={`M ${strokeWidth / 2}, ${size / 2} 
                a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-300 ease-out"
          />
          
          {/* Score text */}
          <text
            x={center}
            y={center - 8}
            textAnchor="middle"
            fontSize="32"
            fontWeight="bold"
            fill="#000"
            className="font-mono"
          >
            {score}
          </text>
        </svg>
      </div>
      
      {/* Move the label outside of the SVG for better spacing */}
      <div className="flex flex-col items-center mt-2 space-y-1">
        <span className="text-sm font-medium text-gray-700">Scaled Score</span>
        <span className="text-xs text-gray-600">Out of {totalScore}</span>
      </div>
    </div>
  );
};

// MetricRow Component for the Score Overview
const MetricRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-1">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

// Bell Curve component for visualizing percentile - From the full-lengths page
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

// Mock passage data for TimeSpentSummary component
const mockPassageData = [
  { 
    id: 1, 
    name: 'Passage 1', 
    topic: 'Ancient Civilizations',
    disciplines: 'History, Archaeology',
    correctAnswers: 1, 
    totalQuestions: 6, 
    timeTaken: '8:17',
    questions: [
      { 
        id: 101, 
        number: 1,
        subject: 'Humanities', 
        topic: 'History', 
        skill: 'Skill 1', 
        type: 'Inference', 
        timeTaken: '2:12',
        isCorrect: true
      },
      { 
        id: 102, 
        number: 2,
        subject: 'Humanities', 
        topic: 'History', 
        skill: 'Skill 2', 
        type: 'Application', 
        timeTaken: '1:45',
        isCorrect: false
      },
      { 
        id: 103, 
        number: 3,
        subject: 'Humanities', 
        topic: 'History', 
        skill: 'Skill 3', 
        type: 'Strengthening', 
        timeTaken: '4:20',
        isCorrect: false
      },
    ]
  },
  { 
    id: 2, 
    name: 'Passage 2', 
    topic: 'Economic Theory',
    disciplines: 'Business, Economics',
    correctAnswers: 4, 
    totalQuestions: 6, 
    timeTaken: '10:43',
    questions: [
      { 
        id: 201, 
        number: 1,
        subject: 'Social Science', 
        topic: 'Business', 
        skill: 'Skill 1', 
        type: 'Inference', 
        timeTaken: '3:15',
        isCorrect: true
      },
      { 
        id: 202, 
        number: 2,
        subject: 'Social Science', 
        topic: 'Business', 
        skill: 'Skill 2', 
        type: 'Application', 
        timeTaken: '2:38',
        isCorrect: true
      },
      { 
        id: 203, 
        number: 3,
        subject: 'Social Science', 
        topic: 'Business', 
        skill: 'Skill 3', 
        type: 'Strengthening', 
        timeTaken: '4:50',
        isCorrect: true
      },
    ]
  },
  { 
    id: 3, 
    name: 'Passage 3', 
    topic: 'Quantum Physics',
    disciplines: 'Physics, Mathematics',
    correctAnswers: 5, 
    totalQuestions: 7, 
    timeTaken: '12:05',
    questions: [
      { 
        id: 301, 
        number: 1,
        subject: 'Social Science', 
        topic: 'Sociology', 
        skill: 'Skill 1', 
        type: 'Inference', 
        timeTaken: '2:10',
        isCorrect: true
      },
      { 
        id: 302, 
        number: 2,
        subject: 'Social Science', 
        topic: 'Sociology', 
        skill: 'Skill 2', 
        type: 'Application', 
        timeTaken: '3:05',
        isCorrect: true
      },
      { 
        id: 303, 
        number: 3,
        subject: 'Social Science', 
        topic: 'Sociology', 
        skill: 'Skill 3', 
        type: 'Strengthening', 
        timeTaken: '4:43',
        isCorrect: true
      },
    ]
  },
  { 
    id: 4, 
    name: 'Passage 4', 
    topic: 'Renaissance Art',
    disciplines: 'Art History, Cultural Studies',
    correctAnswers: 3, 
    totalQuestions: 5, 
    timeTaken: '9:30',
    questions: [
      { 
        id: 401, 
        number: 1,
        subject: 'Art & Literature', 
        topic: 'Art History', 
        skill: 'Skill 1', 
        type: 'Inference', 
        timeTaken: '2:15',
        isCorrect: true
      },
      { 
        id: 402, 
        number: 2,
        subject: 'Art & Literature', 
        topic: 'Art History', 
        skill: 'Skill 2', 
        type: 'Application', 
        timeTaken: '1:45',
        isCorrect: true
      },
      { 
        id: 403, 
        number: 3,
        subject: 'Art & Literature', 
        topic: 'Art History', 
        skill: 'Skill 3', 
        type: 'Strengthening', 
        timeTaken: '3:30',
        isCorrect: true
      },
    ]
  },
  { 
    id: 5, 
    name: 'Passage 5', 
    topic: 'Environmental Science',
    disciplines: 'Biology, Earth Science',
    correctAnswers: 6, 
    totalQuestions: 8, 
    timeTaken: '14:22',
    questions: [
      { 
        id: 501, 
        number: 1,
        subject: 'Natural Science', 
        topic: 'Biology', 
        skill: 'Skill 1', 
        type: 'Inference', 
        timeTaken: '3:10',
        isCorrect: true
      },
      { 
        id: 502, 
        number: 2,
        subject: 'Natural Science', 
        topic: 'Biology', 
        skill: 'Skill 2', 
        type: 'Application', 
        timeTaken: '2:45',
        isCorrect: true
      },
      { 
        id: 503, 
        number: 3,
        subject: 'Natural Science', 
        topic: 'Biology', 
        skill: 'Skill 3', 
        type: 'Strengthening', 
        timeTaken: '4:30',
        isCorrect: true
      },
    ]
  }
];

// Mock distractor data for DistractorAnalysis component
const mockDistractorData = [
  {
    id: 1,
    type: 'Out of Scope',
    frequency: 8,
    totalMistakes: 24,
    questionsWithDistractor: 15,
    description: 'Answers that introduce information not mentioned in the passage',
    avgTimeSpent: '2:45',
    questions: [
      { id: 101, passage: 'Passage 1', number: 3, text: 'What is the main argument presented by the author?' },
      { id: 205, passage: 'Passage 2', number: 5, text: 'Which of the following best represents the author\'s perspective?' },
      { id: 312, passage: 'Passage 3', number: 2, text: 'What conclusion can be drawn from the third paragraph?' }
    ]
  },
  {
    id: 2,
    type: 'Extreme Language',
    frequency: 6,
    totalMistakes: 24,
    questionsWithDistractor: 12,
    description: 'Answers with absolute terms like "always" or "never"',
    avgTimeSpent: '3:12',
    questions: [
      { id: 104, passage: 'Passage 1', number: 4, text: 'Which statement would the author most likely agree with?' },
      { id: 207, passage: 'Passage 2', number: 7, text: 'What is implied by the author\'s discussion of economic theory?' },
      { id: 401, passage: 'Passage 4', number: 1, text: 'How does the author characterize Renaissance art?' }
    ]
  },
  {
    id: 3,
    type: 'Opposite Answer',
    frequency: 5,
    totalMistakes: 24,
    questionsWithDistractor: 10,
    description: 'Answers that contradict what the passage actually states',
    avgTimeSpent: '2:38',
    questions: [
      { id: 102, passage: 'Passage 1', number: 2, text: 'What evidence supports the author\'s claim about ancient civilizations?' },
      { id: 305, passage: 'Passage 3', number: 5, text: 'How does the author\'s view compare to traditional theories?' }
    ]
  },
  {
    id: 4,
    type: 'Half-Right/Half-Wrong',
    frequency: 3,
    totalMistakes: 24,
    questionsWithDistractor: 9,
    description: 'Answers that contain some correct information mixed with incorrect information',
    avgTimeSpent: '3:55',
    questions: [
      { id: 203, passage: 'Passage 2', number: 3, text: 'Which of the following best summarizes the economic principle described?' },
      { id: 402, passage: 'Passage 4', number: 2, text: 'What connection does the author make between art and society?' },
      { id: 503, passage: 'Passage 5', number: 3, text: 'How does the environmental impact relate to the biological process?' }
    ]
  },
  {
    id: 5,
    type: 'True but Irrelevant',
    frequency: 2,
    totalMistakes: 24,
    questionsWithDistractor: 14,
    description: 'Answers that are factually correct but don\'t answer the question',
    avgTimeSpent: '2:20',
    questions: [
      { id: 106, passage: 'Passage 1', number: 6, text: 'What purpose does the historical example serve in the passage?' },
      { id: 308, passage: 'Passage 3', number: 8, text: 'How does the author support the claim about quantum physics?' }
    ]
  }
];

// TimeSpentSummary Component
const TimeSpentSummary = () => {
  const [expandedPassages, setExpandedPassages] = useState<number[]>([]);

  const togglePassage = (passageId: number) => {
    setExpandedPassages(prev => 
      prev.includes(passageId) 
        ? prev.filter(id => id !== passageId) 
        : [...prev, passageId]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Time Spent</h2>
        
        <div className="overflow-hidden rounded-lg">
          {/* Table Header */}
          <div className="bg-gray-100 px-6 py-3 grid grid-cols-5 gap-4">
            <div className="text-sm font-medium text-gray-600">PASSAGE NUMBER</div>
            <div className="text-sm font-medium text-gray-600">TOPIC</div>
            <div className="text-sm font-medium text-gray-600">DISCIPLINES</div>
            <div className="text-sm font-medium text-gray-600 text-right">CORRECT ANSWERS</div>
            <div className="text-sm font-medium text-gray-600 text-right">TIME TAKEN</div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {mockPassageData.map(passage => (
              <div key={passage.id} className="transition-all duration-300">
                {/* Main Row */}
                <div 
                  className="px-6 py-4 grid grid-cols-5 gap-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => togglePassage(passage.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      togglePassage(passage.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedPassages.includes(passage.id)}
                  aria-controls={`passage-${passage.id}-content`}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800">{passage.name}</span>
                      <svg
                        className={`ml-2 h-4 w-4 text-gray-500 transform transition-transform ${expandedPassages.includes(passage.id) ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="font-medium text-gray-800">
                    {passage.topic}
                  </div>
                  <div className="font-medium text-gray-800">
                    {passage.disciplines}
                  </div>
                  <div className="text-right font-medium text-gray-800">
                    {passage.correctAnswers}/{passage.totalQuestions} correct
                  </div>
                  <div className="text-right font-medium text-gray-800">
                    {passage.timeTaken}
                  </div>
                </div>
                
                {/* Dropdown Content */}
                <div 
                  id={`passage-${passage.id}-content`}
                  className={`bg-gray-50 overflow-hidden transition-all duration-300 ${
                    expandedPassages.includes(passage.id) 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!expandedPassages.includes(passage.id)}
                >
                  {passage.questions.map(question => (
                    <div key={question.id} className="px-6 py-3 ml-10 grid grid-cols-12 gap-2 text-sm border-t border-gray-100 first:border-t-0">
                      {/* Question Number - Centered with passage number above */}
                      <div className="col-span-1 flex justify-start pl-2">
                        <span className="font-bold text-base text-gray-800">Q{question.number}</span>
                      </div>
                      
                      {/* Correct/Incorrect Status with Icon (2 columns) */}
                      <div className="col-span-2 flex items-center">
                        {question.isCorrect ? (
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium text-green-800">Correct</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium text-red-800">Incorrect</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Question Skill (4 columns) */}
                      <div className="col-span-4 flex items-center">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                          {question.skill}
                        </span>
                      </div>
                      
                      {/* Question Type (3 columns) */}
                      <div className="col-span-3 flex items-center">
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium">
                          {question.type}
                        </span>
                      </div>
                      
                      {/* Time Taken (2 columns) */}
                      <div className="col-span-2 text-right font-medium text-gray-700">
                        {question.timeTaken}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// DistractorAnalysis Component
const DistractorAnalysis = () => {
  const [expandedDistractors, setExpandedDistractors] = useState<number[]>([]);
  const [selectedBubble, setSelectedBubble] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const toggleDistractor = (distractorId: number) => {
    setExpandedDistractors(prev => 
      prev.includes(distractorId) 
        ? prev.filter(id => id !== distractorId) 
        : [...prev, distractorId]
    );
  };

  const calculatePercentage = (frequency: number, total: number) => {
    return ((frequency / total) * 100).toFixed(1);
  };

  // Initialize intersection observer to detect when the component is in view
  useEffect(() => {
    // Only observe if not already visible
    if (!isVisible) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      }, { threshold: 0.1 }); // Trigger when 10% of the component is visible
      
      if (chartRef.current) {
        observer.observe(chartRef.current);
      }
      
      return () => {
        if (chartRef.current) {
          observer.unobserve(chartRef.current);
        }
      };
    }
  }, [isVisible]);

  // Prepare data for the bubble chart
  const bubbleChartData = mockDistractorData.map(item => ({
    distractorType: item.type,
    frequency: item.frequency,
    percentage: parseFloat(calculatePercentage(item.frequency, item.totalMistakes)),
    questionCount: item.questionsWithDistractor,
    avgTimeSpent: item.avgTimeSpent
  }));

  // Sort data by percentage (descending)
  const sortedData = [...bubbleChartData].sort((a, b) => b.percentage - a.percentage);
  
  // Calculate color based on percentage
  const getColor = (percentage: number): string => {
    // Create distinct color categories
    if (percentage < 10) return "#8BC34A"; // Green
    if (percentage < 20) return "#FFC107"; // Yellow/amber
    if (percentage < 30) return "#FF5722"; // Orange/deep-orange
    return "#F44336"; // Red
  };

  // Function to calculate bubble size based on percentage - significantly larger bubbles
  const getBubbleSize = (percentage: number): number => {
    const maxPercentage = Math.max(...bubbleChartData.map(item => item.percentage));
    const minSize = 90;   // Increased minimum radius
    const maxSize = 200;  // Increased maximum radius
    return minSize + (percentage / maxPercentage) * (maxSize - minSize);
  };

  // Calculate bubble radii
  const bubbleSizes = sortedData.map(item => getBubbleSize(item.percentage) / 2);

  // Convert time string (mm:ss) to x-position
  const timeToXPosition = (timeStr: string): number => {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    // Map time range to x-position (150 to 750)
    const minTime = 120; // 2:00
    const maxTime = 240; // 4:00
    const xMin = 150;
    const xMax = 750;
    
    // Clamp time between min and max
    const clampedTime = Math.max(minTime, Math.min(maxTime, totalSeconds));
    
    // Linear mapping
    return xMin + ((clampedTime - minTime) / (maxTime - minTime)) * (xMax - xMin);
  };

  // Updated positions based on time spent (x-axis) and percentage (y-axis)
  const updatedPositions = sortedData.map((item, index) => {
    const xPos = timeToXPosition(item.avgTimeSpent);
    // Y position based on percentage (higher percentage = higher on chart)
    const yPos = 400 - (item.percentage * 7); // Scale factor to distribute vertically
    
    return {
      x: xPos,
      y: yPos,
      radius: bubbleSizes[index] * 1.2
    };
  });

  // Function to shorten text consistently
  const shortenText = (text: string, maxLength: number = 15): string => {
    const words = text.split(' ');
    if (words.length <= 2) return text;
    
    if (text.length > maxLength) {
      return words.slice(0, 2).join(' ') + (words.length > 2 ? '...' : '');
    }
    return text;
  };

  // Format date according to locale
  const formatDate = (): string => {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" ref={chartRef}>
      {/* Header section with normal width */}
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Distractor Analysis</h2>
          
          {/* Legend moved inline with heading */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
              <span className="text-xs text-gray-600">0-10%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
              <span className="text-xs text-gray-600">10-20%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
              <span className="text-xs text-gray-600">20-30%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span className="text-xs text-gray-600">30%+</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bubble Chart - Full width section that extends beyond the normal container */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="w-full h-[500px] relative mb-8 bg-gray-50 overflow-hidden">
          <svg viewBox="0 0 900 500" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
            {/* X-axis label */}
            <text x="450" y="480" textAnchor="middle" fontSize="14" fill="#666">
              Average Time Spent
            </text>
            
            {/* X-axis ticks */}
            <g>
              <line x1="150" y1="450" x2="750" y2="450" stroke="#ccc" strokeWidth="1" />
              <text x="150" y="470" textAnchor="middle" fontSize="12" fill="#666">2:00</text>
              <text x="300" y="470" textAnchor="middle" fontSize="12" fill="#666">2:30</text>
              <text x="450" y="470" textAnchor="middle" fontSize="12" fill="#666">3:00</text>
              <text x="600" y="470" textAnchor="middle" fontSize="12" fill="#666">3:30</text>
              <text x="750" y="470" textAnchor="middle" fontSize="12" fill="#666">4:00</text>
            </g>
            
            {/* Render bubbles with positions based on time spent */}
            {sortedData.map((item, index) => {
              if (index >= updatedPositions.length) return null; // Skip if we don't have a position defined
              
              const pos = updatedPositions[index];
              const isSelected = selectedBubble === index;
              const bubbleColor = getColor(item.percentage);
              
              return (
                <g key={index}>
                  <circle 
                    cx={pos.x} 
                    cy={pos.y} 
                    r={pos.radius}
                    fill={bubbleColor}
                    fillOpacity={isSelected ? "0.4" : "0.3"}
                    stroke={isSelected ? "#333" : "none"}
                    strokeWidth={isSelected ? "2" : "0"}
                    onMouseEnter={() => setSelectedBubble(index)}
                    onMouseLeave={() => setSelectedBubble(null)}
                    style={{cursor: "pointer"}}
                  />
                  
                  {/* Centered text (abbreviated for better fit) */}
                  <text 
                    x={pos.x} 
                    y={pos.y} 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fill="#000" 
                    fontSize={Math.min(20, Math.max(16, pos.radius / 3))}
                    fontWeight="bold"
                    style={{pointerEvents: "none"}}
                  >
                    {shortenText(item.distractorType)}
                  </text>
                </g>
              );
            })}
            
            {/* Enhanced tooltip with contextual metrics */}
            {selectedBubble !== null && selectedBubble < updatedPositions.length && (
              <foreignObject 
                x={Math.max(0, Math.min(updatedPositions[selectedBubble].x - 100, 900 - 200))}
                y={Math.max(20, updatedPositions[selectedBubble].y - updatedPositions[selectedBubble].radius - 140)}
                width="200" 
                height="130"
              >
                <div 
                  className="w-full h-full bg-white rounded-lg shadow-md p-3 flex flex-col justify-center items-center pointer-events-none border border-gray-100"
                  role="tooltip"
                >
                  <div className="text-sm font-bold text-gray-800 mb-1">
                    {sortedData[selectedBubble].distractorType}
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Chosen {sortedData[selectedBubble].frequency} times
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {sortedData[selectedBubble].percentage}% of all incorrect answers
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Avg. time: {sortedData[selectedBubble].avgTimeSpent}
                  </div>
                </div>
              </foreignObject>
            )}
          </svg>
        </div>
      </div>
      
      {/* Table section with normal width */}
      <div className="px-6 py-6">
        <div className="overflow-hidden rounded-lg">
          {/* Table Header - Swapped Questions column for Avg. Time */}
          <div className="bg-gray-100 px-6 py-3 grid grid-cols-4 gap-4">
            <div className="text-sm font-medium text-gray-600 text-left">DISTRACTOR TYPE</div>
            <div className="text-sm font-medium text-gray-600 text-center">NUMBER OF TIMES SELECTED</div>
            <div className="text-sm font-medium text-gray-600 text-center">% OF INCORRECT ANSWERS</div>
            <div className="text-sm font-medium text-gray-600 text-center">AVG. TIME SPENT</div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {mockDistractorData.map(distractor => (
              <div key={distractor.id} className="transition-all duration-300">
                {/* Main Row */}
                <div 
                  className="px-6 py-4 grid grid-cols-4 gap-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleDistractor(distractor.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleDistractor(distractor.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedDistractors.includes(distractor.id)}
                  aria-controls={`distractor-${distractor.id}-content`}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">{distractor.type}</span>
                    <svg
                      className={`ml-2 h-4 w-4 text-gray-500 transform transition-transform ${expandedDistractors.includes(distractor.id) ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="text-center font-medium text-gray-800">
                    {distractor.frequency}
                  </div>
                  <div className="text-center font-medium text-gray-800">
                    {calculatePercentage(distractor.frequency, distractor.totalMistakes)}%
                  </div>
                  <div className="text-center font-medium text-gray-800">
                    {distractor.avgTimeSpent}
                  </div>
                </div>
                
                {/* Dropdown Content - Added list of questions */}
                <div 
                  id={`distractor-${distractor.id}-content`}
                  className={`bg-gray-50 overflow-hidden transition-all duration-300 ${
                    expandedDistractors.includes(distractor.id) 
                      ? 'max-h-[800px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!expandedDistractors.includes(distractor.id)}
                >
                  <div className="px-6 py-4 ml-10">
                    {/* Distractor Type Header - Made more prominent */}
                    <div className="mb-4 pb-3 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{distractor.type}</h3>
                      <p className="text-sm text-gray-600">{distractor.description}</p>
                    </div>
                    
                    {/* Summary Statistics - Visually grouped with cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                        <div className="text-2xl font-bold text-center text-gray-800">{distractor.frequency}</div>
                        <div className="text-xs text-center text-gray-600 mt-1">Times Selected</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                        <div className="text-2xl font-bold text-center text-gray-800">
                          {calculatePercentage(distractor.frequency, distractor.totalMistakes)}%
                        </div>
                        <div className="text-xs text-center text-gray-600 mt-1">of Incorrect Answers</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                        <div className="text-2xl font-bold text-center text-gray-800">{distractor.avgTimeSpent}</div>
                        <div className="text-xs text-center text-gray-600 mt-1">Avg. Time Spent</div>
                      </div>
                    </div>
                    
                    {/* Practice Tip - Moved above questions for better flow */}
                    <div className="mb-6 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700 mr-2">Practice Tip</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">
                        {distractor.type === 'Out of Scope' && "Pay close attention to what the passage actually covers. Highlight key topics as you read."}
                        {distractor.type === 'Extreme Language' && "Be cautious of answer choices with absolute terms like 'always' or 'never'."}
                        {distractor.type === 'Opposite Answer' && "Double-check your understanding of the passage, especially for negation or contrast statements."}
                        {distractor.type === 'Half-Right/Half-Wrong' && "Break down answer choices into components and verify each piece of information."}
                        {distractor.type === 'True but Irrelevant' && "Always relate answer choices back to the specific question being asked."}
                      </p>
                    </div>
                    
                    {/* Questions where this distractor was chosen - With improved header */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        Questions with this Distractor 
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {distractor.questionsWithDistractor} total
                        </span>
                      </h4>
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="divide-y divide-gray-100">
                          {distractor.questions && distractor.questions.length > 0 ? (
                            distractor.questions.map(question => (
                              <div key={question.id} className="px-4 py-3 hover:bg-gray-50">
                                <div className="flex items-start">
                                  <div className="h-7 w-7 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                    <span className="text-sm font-bold text-blue-700">{question.number}</span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-800">{question.text}</div>
                                    <div className="text-xs text-gray-500 mt-1">{question.passage}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-gray-600">
                              No specific questions available for this distractor type.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// SubjectBreakdownChart Component
const SubjectBreakdownChart = () => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Calculate percentages for each subject
  const subjectChartData = mockSubjectData.map(item => {
    const total = item.totalQuestions;
    const correctPercentage = Math.round((item.correctAnswers / total) * 100);
    const incorrectPercentage = Math.round((item.incorrectAnswers / total) * 100);
    const notAttemptedPercentage = 100 - correctPercentage - incorrectPercentage;
    
    return {
      ...item,
      correctPercentage,
      incorrectPercentage,
      notAttemptedPercentage
    };
  });

  // Initialize intersection observer to detect when the component is in view
  useEffect(() => {
    // Only observe if animation hasn't completed yet
    if (!animationComplete) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      }, { threshold: 0.1 }); // Trigger when 10% of the component is visible
      
      if (chartRef.current) {
        observer.observe(chartRef.current);
      }
      
      return () => {
        if (chartRef.current) {
          observer.unobserve(chartRef.current);
        }
      };
    }
  }, [animationComplete]);
  
  // Initialize animation when component becomes visible
  useEffect(() => {
    if (isVisible) {
      // Slight delay to ensure component is fully rendered
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleBarMouseEnter = (subjectId: number) => {
    setActiveTooltip(subjectId);
  };

  const handleBarMouseLeave = () => {
    setActiveTooltip(null);
  };

  // Tooltip component
  const SubjectTooltip = ({ 
    subject, 
    correctAnswers, 
    incorrectAnswers, 
    notAttempted, 
    totalQuestions 
  }: { 
    subject: string, 
    correctAnswers: number, 
    incorrectAnswers: number, 
    notAttempted: number, 
    totalQuestions: number 
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h4 className="font-semibold text-gray-800 mb-2">{subject}</h4>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
          <span className="text-sm text-green-600 font-medium">Correct Responses:</span>
          <span className="ml-auto text-sm font-semibold">{correctAnswers} / {totalQuestions}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
          <span className="text-sm text-red-600 font-medium">Incorrect Responses:</span>
          <span className="ml-auto text-sm font-semibold">{incorrectAnswers} / {totalQuestions}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
          <span className="text-sm text-gray-600 font-medium">Not Attempted:</span>
          <span className="ml-auto text-sm font-semibold">{notAttempted} / {totalQuestions}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" ref={chartRef}>
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Breakdown By Subject</h2>
          
          {/* Legend at top-right */}
          <div className="flex items-center text-sm mt-2 sm:mt-0">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
              <span className="text-gray-600">Correct</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
              <span className="text-gray-600">Incorrect</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
              <span className="text-gray-600">Not Attempted</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {subjectChartData.map((subject, index) => (
            <div 
              key={subject.id} 
              className="relative"
              onMouseEnter={() => handleBarMouseEnter(subject.id)}
              onMouseLeave={handleBarMouseLeave}
            >
              {/* Subject label */}
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium text-gray-700 w-32 lg:w-40">{subject.subject}</span>
                <div className="flex-1 text-xs text-gray-500 ml-2">
                  {subject.correctAnswers} / {subject.totalQuestions} questions
                </div>
              </div>
              
              {/* Bar chart container */}
              <div className="h-8 w-full rounded-lg overflow-hidden bg-gray-100">
                {/* Animated bar segments */}
                <div className="flex h-full w-full">
                  {/* Correct bar */}
                  <div 
                    className="bg-green-400 h-full flex items-center justify-center transition-all duration-1000 ease-out rounded-l-lg"
                    style={{ 
                      width: animationComplete ? `${subject.correctPercentage}%` : '0%',
                      transitionDelay: `${index * 0.1}s` 
                    }}
                  >
                    {subject.correctPercentage > 8 && (
                      <span className="text-xs font-medium text-white opacity-0 transition-opacity duration-300"
                        style={{ opacity: animationComplete ? 1 : 0, transitionDelay: `${(index * 0.1) + 0.5}s` }}>
                        {subject.correctPercentage}%
                      </span>
                    )}
                  </div>
                  
                  {/* Incorrect bar */}
                  <div 
                    className="bg-red-400 h-full flex items-center justify-center transition-all duration-1000 ease-out"
                    style={{ 
                      width: animationComplete ? `${subject.incorrectPercentage}%` : '0%',
                      transitionDelay: `${(index * 0.1) + 0.15}s` 
                    }}
                  >
                    {subject.incorrectPercentage > 8 && (
                      <span className="text-xs font-medium text-white opacity-0 transition-opacity duration-300"
                        style={{ opacity: animationComplete ? 1 : 0, transitionDelay: `${(index * 0.1) + 0.65}s` }}>
                        {subject.incorrectPercentage}%
                      </span>
                    )}
                  </div>
                  
                  {/* Not attempted bar */}
                  <div 
                    className="bg-gray-300 h-full flex items-center justify-center transition-all duration-1000 ease-out rounded-r-lg"
                    style={{ 
                      width: animationComplete ? `${subject.notAttemptedPercentage}%` : '0%',
                      transitionDelay: `${(index * 0.1) + 0.3}s` 
                    }}
                  >
                    {subject.notAttemptedPercentage > 8 && (
                      <span className="text-xs font-medium text-gray-600 opacity-0 transition-opacity duration-300"
                        style={{ opacity: animationComplete ? 1 : 0, transitionDelay: `${(index * 0.1) + 0.8}s` }}>
                          {subject.notAttemptedPercentage}%
                        </span>
                      )}
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              {activeTooltip === subject.id && (
                <div className={`absolute ${index >= subjectChartData.length - 2 ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 transform -translate-x-1/2 z-10`}>
                  <SubjectTooltip 
                    subject={subject.subject}
                    correctAnswers={subject.correctAnswers}
                    incorrectAnswers={subject.incorrectAnswers}
                    notAttempted={subject.notAttempted}
                    totalQuestions={subject.totalQuestions}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// SkillsBreakdownChart Component
const SkillsBreakdownChart = () => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Calculate percentages for each skill
  const skillChartData = mockSkillData.map(item => {
    const total = item.totalQuestions;
    const correctPercentage = Math.round((item.correctAnswers / total) * 100);
    const incorrectPercentage = Math.round((item.incorrectAnswers / total) * 100);
    const notAttemptedPercentage = 100 - correctPercentage - incorrectPercentage;
    
    return {
      ...item,
      correctPercentage,
      incorrectPercentage,
      notAttemptedPercentage
    };
  });

  // Initialize intersection observer to detect when the component is in view
  useEffect(() => {
    // Only observe if animation hasn't completed yet
    if (!animationComplete) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      }, { threshold: 0.1 }); // Trigger when 10% of the component is visible
      
      if (chartRef.current) {
        observer.observe(chartRef.current);
      }
      
      return () => {
        if (chartRef.current) {
          observer.unobserve(chartRef.current);
        }
      };
    }
  }, [animationComplete]);
  
  // Initialize animation when component becomes visible
  useEffect(() => {
    if (isVisible) {
      // Slight delay to ensure component is fully rendered
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleBarMouseEnter = (skillId: number) => {
    setActiveTooltip(skillId);
  };

  const handleBarMouseLeave = () => {
    setActiveTooltip(null);
  };

  // Tooltip component
  const SkillTooltip = ({ 
    skillName, 
    correctAnswers, 
    incorrectAnswers, 
    notAttempted, 
    totalQuestions 
  }: { 
    skillName: string, 
    correctAnswers: number, 
    incorrectAnswers: number, 
    notAttempted: number, 
    totalQuestions: number 
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h4 className="font-semibold text-gray-800 mb-2">{skillName}</h4>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
          <span className="text-sm text-green-600 font-medium">Correct Responses:</span>
          <span className="ml-auto text-sm font-semibold">{correctAnswers} / {totalQuestions}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
          <span className="text-sm text-red-600 font-medium">Incorrect Responses:</span>
          <span className="ml-auto text-sm font-semibold">{incorrectAnswers} / {totalQuestions}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
          <span className="text-sm text-gray-600 font-medium">Not Attempted:</span>
          <span className="ml-auto text-sm font-semibold">{notAttempted} / {totalQuestions}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" ref={chartRef}>
      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Breakdown By Skills</h2>
          
          {/* Legend at top-right */}
          <div className="flex items-center text-sm mt-2 sm:mt-0">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
              <span className="text-gray-600">Correct</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
              <span className="text-gray-600">Incorrect</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
              <span className="text-gray-600">Not Attempted</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {skillChartData.map((skill, index) => (
            <div 
              key={skill.id} 
              className="relative"
              onMouseEnter={() => handleBarMouseEnter(skill.id)}
              onMouseLeave={handleBarMouseLeave}
            >
              {/* Skill label */}
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium text-gray-700 w-auto lg:w-64 truncate">
                  <span className="font-bold">Skill {skill.skillNumber}:</span> {skill.skillName}
                </span>
                <div className="flex-1 text-xs text-gray-500 ml-2">
                  {skill.correctAnswers} / {skill.totalQuestions} questions
                </div>
              </div>
              
              {/* Bar chart container */}
              <div className="h-8 w-full rounded-lg overflow-hidden bg-gray-100">
                {/* Animated bar segments */}
                <div className="flex h-full w-full">
                  {/* Correct bar */}
                  <div 
                    className="bg-green-400 h-full flex items-center justify-center transition-all duration-1000 ease-out rounded-l-lg"
                    style={{ 
                      width: animationComplete ? `${skill.correctPercentage}%` : '0%',
                      transitionDelay: `${index * 0.1}s` 
                    }}
                  >
                    {skill.correctPercentage > 8 && (
                      <span className="text-xs font-medium text-white opacity-0 transition-opacity duration-300"
                        style={{ opacity: animationComplete ? 1 : 0, transitionDelay: `${(index * 0.1) + 0.5}s` }}>
                        {skill.correctPercentage}%
                      </span>
                    )}
                  </div>
                  
                  {/* Incorrect bar */}
                  <div 
                    className="bg-red-400 h-full flex items-center justify-center transition-all duration-1000 ease-out"
                    style={{ 
                      width: animationComplete ? `${skill.incorrectPercentage}%` : '0%',
                      transitionDelay: `${(index * 0.1) + 0.15}s` 
                    }}
                  >
                    {skill.incorrectPercentage > 8 && (
                      <span className="text-xs font-medium text-white opacity-0 transition-opacity duration-300"
                        style={{ opacity: animationComplete ? 1 : 0, transitionDelay: `${(index * 0.1) + 0.65}s` }}>
                        {skill.incorrectPercentage}%
                      </span>
                    )}
                  </div>
                  
                  {/* Not attempted bar */}
                  <div 
                    className="bg-gray-300 h-full flex items-center justify-center transition-all duration-1000 ease-out rounded-r-lg"
                    style={{ 
                      width: animationComplete ? `${skill.notAttemptedPercentage}%` : '0%',
                      transitionDelay: `${(index * 0.1) + 0.3}s` 
                    }}
                  >
                    {skill.notAttemptedPercentage > 8 && (
                      <span className="text-xs font-medium text-gray-600 opacity-0 transition-opacity duration-300"
                        style={{ opacity: animationComplete ? 1 : 0, transitionDelay: `${(index * 0.1) + 0.8}s` }}>
                          {skill.notAttemptedPercentage}%
                        </span>
                      )}
                  </div>
                </div>
              </div>
              
              {/* Tooltip */}
              {activeTooltip === skill.id && (
                <div className={`absolute ${index >= skillChartData.length - 2 ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 transform -translate-x-1/2 z-10`}>
                  <SkillTooltip 
                    skillName={`Skill ${skill.skillNumber}: ${skill.skillName}`}
                    correctAnswers={skill.correctAnswers}
                    incorrectAnswers={skill.incorrectAnswers}
                    notAttempted={skill.notAttempted}
                    totalQuestions={skill.totalQuestions}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ScoreReportQBPage() {
  const searchParams = useSearchParams();
  const examId = searchParams.get('id') || '1';
  const examType = searchParams.get('examType') || 'question-bank';
  
  // In a real application, you would fetch data based on examId and examType
  
  // Set back link based on exam type
  const backLink = examType === 'full-length' 
    ? '/dashboard/full-lengths' 
    : '/dashboard/question-bank?tab=previous';
  
  // Get exam title from query params or use default
  const examTitle = searchParams.get('title') || 
    (examType === 'full-length' ? 'Full Length Exam' : 'Custom Question Bank Exam');

  // Customize page title based on exam type
  const pageTitle = examType === 'full-length' 
    ? 'Full Length Score Report' 
    : 'Question Bank Score Report';

  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Header with back button in a white tile - Redesigned */}
          <div className="px-4 sm:px-0 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-4 px-6">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  {pageTitle} - <span className="text-gray-500">{examTitle}</span>
                </h1>
                <Link href={backLink} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                  <ArrowLeftIcon className="h-4 w-4 mr-1" />
                  {examType === 'full-length' ? 'Back to Full Lengths' : 'Back to Previous Exams'}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Tiles */}
          <div className="px-4 sm:px-0 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Test Summary Tile */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Test Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="text-gray-600">Test ID</div>
                    <div className="text-gray-900 font-medium">{reportData.testId}</div>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="text-gray-600">Exam Date</div>
                    <div className="text-gray-900 font-medium">{reportData.examDate}</div>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="text-gray-600">Time Mode</div>
                    <div className="text-gray-900 font-medium">{reportData.timeMode}</div>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="text-gray-600">Completion Time</div>
                    <div className="text-gray-900 font-medium">{reportData.completionTime}</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">Avg. Question Time</div>
                    <div className="text-gray-900 font-medium">{reportData.averageQuestionTime}</div>
                  </div>
                </div>
              </div>
              
              {/* Review Button */}
              <div className="px-6 pb-6 mt-6">
                <Link 
                  href={`/dashboard/question-bank/exam/${examId}`} 
                  className="block w-full py-3 bg-khan-blue text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
                >
                  Review Exam
                </Link>
              </div>
            </div>
            
            {/* Score Overview Tile - Using the Progress Summary style */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Score Overview</h2>
                
                <div className="flex justify-center mb-8">
                  <SemiCircleGauge 
                    score={reportData.score} 
                    totalScore={reportData.totalScore} 
                    color="#1E40AF"
                  />
                </div>
                
                <div className="mt-4 space-y-2">
                  <MetricRow 
                    label="Correct Answers" 
                    value={`${reportData.correctAnswers} / ${reportData.totalQuestions}`} 
                  />
                  <MetricRow 
                    label="Incorrect Answers" 
                    value={`${reportData.incorrectAnswers} / ${reportData.totalQuestions}`} 
                  />
                  <MetricRow 
                    label="Incomplete Answers" 
                    value={`${reportData.incompleteAnswers} / ${reportData.totalQuestions}`} 
                  />
                </div>
              </div>
            </div>
            
            {/* Percentile Analysis Tile */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Percentile Analysis</h2>
                
                {/* Circle with "C" removed, using the bell curve from the full-lengths page */}
                <BellCurve percentile={reportData.percentile} />
              </div>
            </div>
          </div>
          
          {/* Time Spent Summary Component */}
          <div className="px-4 sm:px-0 mt-6">
            <TimeSpentSummary />
          </div>
          
          {/* Distractor Analysis Component */}
          <div className="px-4 sm:px-0 mt-6">
            <DistractorAnalysis />
          </div>
          
          {/* Subject Breakdown Chart Component */}
          <div className="px-4 sm:px-0 mt-6">
            <SubjectBreakdownChart />
          </div>
          
          {/* Skills Breakdown Chart Component */}
          <div className="px-4 sm:px-0 mt-6">
            <SkillsBreakdownChart />
          </div>
          
          {/* Additional sections could go here */}
          <div className="px-4 sm:px-0">
            <div className="mt-12 border-t border-gray-200"></div>
          </div>
        </div>
      </main>
    </div>
  );
} 