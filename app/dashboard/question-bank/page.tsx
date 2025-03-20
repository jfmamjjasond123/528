'use client';

import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { 
  InformationCircleIcon, 
  AcademicCapIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  ArrowPathIcon, 
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LightBulbIcon,
  BeakerIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Brain icon for 528Prep Insights
const BrainIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.75a2.5 2.5 0 0 0-4.5 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 10.5c-.75 1.333-2.75 2.5-5.5 2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 10.5c.75 1.333 2.75 2.5 5.5 2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 16.75c.5 1.333 2 3.5 3 3.5s2.5-2.167 3-3.5" />
  </svg>
);

// Mock subjects data
const subjectCategories = [
  {
    name: 'Humanities',
    icon: <AcademicCapIcon className="h-5 w-5 text-purple-600" />,
    subjects: [
      { id: 'architecture', label: 'Architecture', count: 32 },
      { id: 'art', label: 'Art', count: 38 },
      { id: 'dance', label: 'Dance', count: 24 },
      { id: 'ethics', label: 'Ethics', count: 47 },
      { id: 'literature', label: 'Literature', count: 56 },
      { id: 'music', label: 'Music', count: 31 },
      { id: 'philosophy', label: 'Philosophy', count: 43 },
      { id: 'popular-culture', label: 'Popular Culture', count: 28 },
      { id: 'religion', label: 'Religion', count: 35 },
      { id: 'theater', label: 'Theater', count: 26 },
      { id: 'diverse-cultures', label: 'Studies of Diverse Cultures', count: 39 },
    ],
  },
  {
    name: 'Social Sciences',
    icon: <DocumentTextIcon className="h-5 w-5 text-blue-600" />,
    subjects: [
      { id: 'anthropology', label: 'Anthropology', count: 29 },
      { id: 'archaeology', label: 'Archaeology', count: 25 },
      { id: 'economics', label: 'Economics', count: 34 },
      { id: 'education', label: 'Education', count: 27 },
      { id: 'geography', label: 'Geography', count: 23 },
      { id: 'history', label: 'History', count: 51 },
      { id: 'linguistics', label: 'Linguistics', count: 31 },
      { id: 'political-science', label: 'Political Science', count: 42 },
      { id: 'population-health', label: 'Population Health', count: 33 },
      { id: 'psychology', label: 'Psychology', count: 45 },
      { id: 'sociology', label: 'Sociology', count: 38 },
    ],
  },
];

// Mock data for 528Prep Insights
const insightsData = {
  distractors: [
    { id: 'distractor1', label: 'Outside Scope', accuracy: 1 },
    { id: 'distractor2', label: 'Extreme Language', accuracy: 2 },
    { id: 'distractor3', label: 'Opposite Reasoning', accuracy: 3 },
    { id: 'distractor4', label: 'Causal Fallacy', accuracy: 4 },
    { id: 'distractor5', label: 'Overextending', accuracy: 5 },
    { id: 'distractor6', label: 'Author Intent', accuracy: 2 },
    { id: 'distractor7', label: 'Misinterpreting Evidence', accuracy: 3 },
    { id: 'distractor8', label: 'Appeal to Authority', accuracy: 1 },
    { id: 'distractor9', label: 'False Analogy', accuracy: 4 },
  ],
  questionTypes: [
    { id: 'qtype1', label: 'Main Idea', accuracy: 4 },
    { id: 'qtype2', label: 'Detail', accuracy: 5 },
    { id: 'qtype3', label: 'Inference', accuracy: 2 },
    { id: 'qtype4', label: 'Application', accuracy: 1 },
    { id: 'qtype5', label: 'Author Tone', accuracy: 3 },
    { id: 'qtype6', label: 'Definition', accuracy: 4 },
    { id: 'qtype7', label: 'Rhetorical Purpose', accuracy: 2 },
    { id: 'qtype8', label: 'Structure', accuracy: 5 },
  ],
  skillTypes: [
    { id: 'skill1', label: 'Foundations of Comprehension', accuracy: 3 },
    { id: 'skill2', label: 'Reasoning Within the Text', accuracy: 2 },
    { id: 'skill3', label: 'Reasoning Beyond the Text', accuracy: 4 },
  ]
};

// Custom tooltip component
function TooltipElement({ children, content }: { children: React.ReactNode; content: string }) {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 px-4 py-2 mt-2 text-sm text-white bg-gray-900 rounded-md shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
}

// Component for toggle switches
function ToggleSwitch({ enabled, onChange, label, tooltipText }: { enabled: boolean; onChange: (enabled: boolean) => void; label: string; tooltipText?: string }) {
  const switchElement = (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? 'bg-khan-blue' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-khan-blue focus:ring-offset-2`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm font-medium text-gray-700">
        {label}
      </Switch.Label>
      {tooltipText && (
        <InformationCircleIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" aria-hidden="true" />
      )}
    </Switch.Group>
  );

  if (tooltipText) {
    return <TooltipElement content={tooltipText}>{switchElement}</TooltipElement>;
  }

  return switchElement;
}

// Time setting radio component
function TimeSettingRadio({ value, selected, onChange, label, tooltipText, disabled = false }: { 
  value: string; 
  selected: string; 
  onChange: (value: string) => void; 
  label: string; 
  tooltipText?: string;
  disabled?: boolean;
}) {
  const isSelected = selected === value;
  
  const radioElement = (
    <div 
      className={`
        flex items-center p-2 rounded-md cursor-pointer transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
        ${isSelected && !disabled ? 'bg-blue-50 border border-blue-200' : ''}
      `}
      onClick={() => !disabled && onChange(value)}
    >
      <input
        type="radio"
        id={`time-${value}`}
        name="timeOptions"
        value={value}
        checked={isSelected}
        onChange={() => !disabled && onChange(value)}
        disabled={disabled}
        className={`h-4 w-4 ${disabled ? 'text-gray-300' : isSelected ? 'text-khan-blue' : 'text-gray-400'} focus:ring-khan-blue`}
      />
      <label 
        htmlFor={`time-${value}`} 
        className={`ml-2 text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {label}
      </label>
      {tooltipText && !disabled && (
        <InformationCircleIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" aria-hidden="true" />
      )}
    </div>
  );

  if (tooltipText && !disabled) {
    return <TooltipElement content={tooltipText}>{radioElement}</TooltipElement>;
  }

  return radioElement;
}

// Number stepper component for passages
function PassageStepper({ value, onChange, min = 1, max = 9 }: { 
  value: number; 
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-lg">
      <button 
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className={`p-3 rounded-l-lg focus:outline-none ${value <= min ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-200'}`}
        aria-label="Decrease passages"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <div className="px-4 py-2 font-medium text-gray-800 min-w-[120px] text-center">
        {value} {value === 1 ? 'Passage' : 'Passages'}
      </div>
      <button 
        type="button"
        onClick={increment}
        disabled={value >= max}
        className={`p-3 rounded-r-lg focus:outline-none ${value >= max ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-200'}`}
        aria-label="Increase passages"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

// Accuracy Bar Component with different shades
function AccuracyBar({ score }: { score: number }) {
  // Color classes for each level
  const barColors = [
    'bg-gray-200', // Default unfilled color
    'bg-red-700',  // Level 1 - Darker red
    'bg-red-500',  // Level 2 - Red
    'bg-yellow-500', // Level 3 - Yellow
    'bg-green-500', // Level 4 - Green
    'bg-green-700'  // Level 5 - Darker green
  ];

  return (
    <div className="flex space-x-0.5 ml-2">
      {[1, 2, 3, 4, 5].map((level) => (
        <div 
          key={level} 
          className={`h-4 w-1.5 rounded-sm ${level <= score ? barColors[level] : barColors[0]}`}
        />
      ))}
    </div>
  );
}

// Insight Item Component
function InsightItem({ 
  item, 
  isSelected, 
  onToggle, 
  disabled 
}: { 
  item: { id: string; label: string; accuracy: number }; 
  isSelected: boolean; 
  onToggle: () => void; 
  disabled: boolean;
}) {
  return (
    <div 
      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors
        ${disabled && !isSelected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
        ${isSelected ? 'bg-blue-50 border border-blue-200' : ''}
      `}
      onClick={() => !disabled || isSelected ? onToggle() : undefined}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          id={`insight-${item.id}`}
          checked={isSelected}
          onChange={onToggle}
          disabled={disabled && !isSelected}
          className="h-4 w-4 text-khan-blue focus:ring-khan-blue rounded"
        />
        <label 
          htmlFor={`insight-${item.id}`} 
          className={`ml-2 text-sm font-medium ${disabled && !isSelected ? 'text-gray-400' : 'text-gray-700'}`}
        >
          {item.label}
        </label>
      </div>
      <AccuracyBar score={item.accuracy} />
    </div>
  );
}

export default function QuestionBankPage() {
  const searchParams = useSearchParams();
  
  // Test Mode state
  const [tutorMode, setTutorMode] = useState(false);
  const [timedMode, setTimedMode] = useState(true);
  
  // Question Mode state
  const [questionMode, setQuestionMode] = useState('all');
  
  // Exam Parameters state
  const [recycleMode, setRecycleMode] = useState(false);
  const [examSize, setExamSize] = useState(2);
  const [timeSetting, setTimeSetting] = useState('1x');
  
  // Selected subjects state
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  
  // New state for insights
  const [selectedDistractors, setSelectedDistractors] = useState<string[]>([]);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>([]);
  const [selectedSkillTypes, setSelectedSkillTypes] = useState<string[]>([]);
  
  // Tab state - default to 'create' but check URL params
  const [activeTab, setActiveTab] = useState('create');
  
  // Set active tab based on URL parameter when component mounts
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'previous') {
      setActiveTab('previous');
    }
  }, [searchParams]);
  
  // Mock data for previous exams
  const previousExams = [
    {
      id: 1,
      title: 'CARS Custom Exam 1',
      date: '2024-02-15',
      status: 'completed',
      score: '85%',
      passages: 3,
      questions: 18,
      timeTaken: '32 minutes'
    },
    {
      id: 2,
      title: 'Philosophy Focus Exam',
      date: '2024-02-10',
      status: 'paused',
      passages: 2,
      questions: 12,
      timeTaken: '15 minutes',
      remainingTime: '10 minutes'
    },
    {
      id: 3,
      title: 'Literature & Arts Mix',
      date: '2024-01-28',
      status: 'abandoned',
      passages: 4,
      questions: 24,
      timeTaken: '8 minutes'
    },
    {
      id: 4,
      title: 'Social Sciences Deep Dive',
      date: '2024-01-20',
      status: 'completed',
      score: '78%',
      passages: 3,
      questions: 18,
      timeTaken: '29 minutes'
    }
  ];
  
  // Toggle subject selection
  const toggleSubject = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };
  
  // Toggle selection functions with max 3 limit
  const toggleDistractor = (id: string) => {
    if (selectedDistractors.includes(id)) {
      setSelectedDistractors(selectedDistractors.filter(itemId => itemId !== id));
    } else if (selectedDistractors.length < 3) {
      setSelectedDistractors([...selectedDistractors, id]);
    }
  };
  
  const toggleQuestionType = (id: string) => {
    if (selectedQuestionTypes.includes(id)) {
      setSelectedQuestionTypes(selectedQuestionTypes.filter(itemId => itemId !== id));
    } else if (selectedQuestionTypes.length < 3) {
      setSelectedQuestionTypes([...selectedQuestionTypes, id]);
    }
  };
  
  const toggleSkillType = (id: string) => {
    if (selectedSkillTypes.includes(id)) {
      setSelectedSkillTypes(selectedSkillTypes.filter(itemId => itemId !== id));
    } else if (selectedSkillTypes.length < 3) {
      setSelectedSkillTypes([...selectedSkillTypes, id]);
    }
  };
  
  // Reset all selections
  const resetSelections = () => {
    setTutorMode(false);
    setTimedMode(true);
    setQuestionMode('all');
    setRecycleMode(false);
    setExamSize(2);
    setTimeSetting('1x');
    setSelectedSubjects([]);
    setSelectedDistractors([]);
    setSelectedQuestionTypes([]);
    setSelectedSkillTypes([]);
  };
  
  // Ensure non-timed mode resets time setting to default when disabled
  useEffect(() => {
    if (!timedMode) {
      setTimeSetting('1x');
    }
  }, [timedMode]);
  
  // Create exam based on selections
  const createExam = () => {
    // Here you would implement the logic to create the exam
    // For now, we'll just log the selections
    console.log({
      testMode: {
        tutorMode,
        timedMode,
      },
      questionMode,
      examParameters: {
        recycleMode,
        examSize,
        timeSetting,
      },
      insights: {
        selectedDistractors,
        selectedQuestionTypes,
        selectedSkillTypes,
      },
      selectedSubjects,
    });
    
    // In a real implementation, you would navigate to the exam page or similar
    alert('Exam created! This would navigate to the exam page in a real implementation.');
  };
  
  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <PuzzlePieceIcon className="w-7 h-7 text-blue-700" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
                  <p className="text-gray-600">Create custom CARS exams tailored to your study needs.</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center transition-all shadow-sm"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Create New Exam
                </button>
              </div>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-6 text-base font-medium focus:outline-none ${
                activeTab === 'create'
                  ? 'text-khan-blue border-b-2 border-khan-blue font-semibold'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Create New Exam
            </button>
            <button
              onClick={() => setActiveTab('previous')}
              className={`py-4 px-6 text-base font-medium focus:outline-none ${
                activeTab === 'previous'
                  ? 'text-khan-blue border-b-2 border-khan-blue font-semibold'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Previous Custom Exams
            </button>
          </div>
          
          {/* Create New Exam Tab Content */}
          {activeTab === 'create' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">Exam Configuration</h2>
              
              <div className="space-y-6">
                {/* Test Mode Section */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                    <AcademicCapIcon className="h-5 w-5 mr-2 text-khan-blue" />
                    1. Test Mode
                  </h3>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="mr-12">
                      <ToggleSwitch 
                        enabled={tutorMode} 
                        onChange={setTutorMode} 
                        label="Tutor Mode" 
                        tooltipText="When enabled, provides hints, explanations, and step-by-step guidance during the exam."
                      />
                    </div>
                    
                    <div>
                      <ToggleSwitch 
                        enabled={timedMode} 
                        onChange={setTimedMode} 
                        label="Timed Mode" 
                        tooltipText="When enabled, enforces time constraints based on the time setting selected below."
                      />
                    </div>
                    
                    {/* Time settings - with better visual disabled state */}
                    <div className={`flex flex-wrap gap-2 ${!timedMode ? 'opacity-50 pointer-events-none' : ''}`}>
                      <TimeSettingRadio 
                        value="infinite" 
                        selected={timeSetting} 
                        onChange={setTimeSetting} 
                        label="∞" 
                        tooltipText="No time limit will be applied to the exam."
                        disabled={!timedMode}
                      />
                      <TimeSettingRadio 
                        value="1x" 
                        selected={timeSetting} 
                        onChange={setTimeSetting} 
                        label="1x" 
                        tooltipText="Standard time allocation (about 10 minutes per passage)."
                        disabled={!timedMode}
                      />
                      <TimeSettingRadio 
                        value="1.5x" 
                        selected={timeSetting} 
                        onChange={setTimeSetting} 
                        label="1.5x" 
                        tooltipText="Extended time allocation (about 15 minutes per passage)."
                        disabled={!timedMode}
                      />
                      <TimeSettingRadio 
                        value="2x" 
                        selected={timeSetting} 
                        onChange={setTimeSetting} 
                        label="2x" 
                        tooltipText="Double time allocation (about 20 minutes per passage)."
                        disabled={!timedMode}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Question Mode Section */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                    <DocumentTextIcon className="h-5 w-5 mr-2 text-khan-blue" />
                    2. Question Mode
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className={`flex items-center p-2 rounded-md ${questionMode === 'all' ? 'bg-blue-50 border border-blue-200' : ''}`}>
                      <input
                        type="radio"
                        id="mode-all"
                        name="questionMode"
                        value="all"
                        checked={questionMode === 'all'}
                        onChange={() => setQuestionMode('all')}
                        className="h-4 w-4 text-khan-blue focus:ring-khan-blue"
                      />
                      <label htmlFor="mode-all" className="ml-2 text-sm font-medium text-gray-700">
                        All Questions
                      </label>
                    </div>
                    <div className={`flex items-center p-2 rounded-md ${questionMode === 'unused' ? 'bg-blue-50 border border-blue-200' : ''}`}>
                      <input
                        type="radio"
                        id="mode-unused"
                        name="questionMode"
                        value="unused"
                        checked={questionMode === 'unused'}
                        onChange={() => setQuestionMode('unused')}
                        className="h-4 w-4 text-khan-blue focus:ring-khan-blue"
                      />
                      <label htmlFor="mode-unused" className="ml-2 text-sm font-medium text-gray-700">
                        Unused Questions
                      </label>
                    </div>
                    <div className={`flex items-center p-2 rounded-md ${questionMode === 'incorrect' ? 'bg-blue-50 border border-blue-200' : ''}`}>
                      <input
                        type="radio"
                        id="mode-incorrect"
                        name="questionMode"
                        value="incorrect"
                        checked={questionMode === 'incorrect'}
                        onChange={() => setQuestionMode('incorrect')}
                        className="h-4 w-4 text-khan-blue focus:ring-khan-blue"
                      />
                      <label htmlFor="mode-incorrect" className="ml-2 text-sm font-medium text-gray-700">
                        Incorrect Questions
                      </label>
                    </div>
                    <div className={`flex items-center p-2 rounded-md ${questionMode === 'marked' ? 'bg-blue-50 border border-blue-200' : ''}`}>
                      <input
                        type="radio"
                        id="mode-marked"
                        name="questionMode"
                        value="marked"
                        checked={questionMode === 'marked'}
                        onChange={() => setQuestionMode('marked')}
                        className="h-4 w-4 text-khan-blue focus:ring-khan-blue"
                      />
                      <label htmlFor="mode-marked" className="ml-2 text-sm font-medium text-gray-700">
                        Marked Questions
                      </label>
                    </div>
                  </div>
                </div>

                {/* Exam Parameters Section */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2 text-khan-blue" />
                    3. Exam Parameters
                  </h3>
                  
                  <div className="flex flex-wrap items-center">
                    <div className="mr-16">
                      <ToggleSwitch 
                        enabled={recycleMode} 
                        onChange={setRecycleMode} 
                        label="Recycle Mode" 
                        tooltipText="When enabled, previously attempted questions may be included in the exam."
                      />
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-700 flex items-center">
                        Number of Passages
                        <TooltipElement content="Select how many passages you want to include in your exam.">
                          <InformationCircleIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" aria-hidden="true" />
                        </TooltipElement>
                      </span>
                      <PassageStepper value={examSize} onChange={setExamSize} min={1} max={9} />
                    </div>
                  </div>
                </div>
                
                {/* 528Prep Insights Section */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-md font-medium text-gray-900 flex items-center">
                      <BrainIcon className="h-5 w-5 mr-2 text-blue-600" />
                      4. 528Prep Insights
                      <TooltipElement content="This section provides personalized insights based on your past performance, highlighting areas where you can improve. Select up to 3 items in each category to focus your practice.">
                        <InformationCircleIcon className="h-4 w-4 ml-1 text-gray-400 cursor-help" aria-hidden="true" />
                      </TooltipElement>
                    </h3>
                    
                    {/* Accuracy Color Key */}
                    <div className="flex items-center text-sm text-black bg-white px-3 py-2 rounded-md shadow-sm border border-gray-100">
                      <span className="font-medium mr-3">Accuracy:</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="h-4 w-2 bg-red-700 rounded-sm mr-2"></div>
                          <span>Low</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-2 bg-yellow-500 rounded-sm mr-2"></div>
                          <span>Medium</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-2 bg-green-700 rounded-sm mr-2"></div>
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                    {/* Skill Types Tile - Now First */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <PuzzlePieceIcon className="h-4 w-4 mr-2 text-green-500" />
                        <span>Skill Types</span>
                        <span className="ml-2 text-xs text-gray-500 font-normal">(Select up to 3)</span>
                      </h4>
                      
                      <div className="space-y-1.5">
                        {insightsData.skillTypes.map((item) => (
                          <InsightItem
                            key={item.id}
                            item={item}
                            isSelected={selectedSkillTypes.includes(item.id)}
                            onToggle={() => toggleSkillType(item.id)}
                            disabled={selectedSkillTypes.length >= 3 && !selectedSkillTypes.includes(item.id)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Question Types Tile - Now Second */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <BookOpenIcon className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Question Types</span>
                        <span className="ml-2 text-xs text-gray-500 font-normal">(Select up to 3)</span>
                      </h4>
                      
                      <div className="space-y-1.5 h-[130px] overflow-y-auto pr-1 scrollbar-thin">
                        {insightsData.questionTypes.map((item) => (
                          <InsightItem
                            key={item.id}
                            item={item}
                            isSelected={selectedQuestionTypes.includes(item.id)}
                            onToggle={() => toggleQuestionType(item.id)}
                            disabled={selectedQuestionTypes.length >= 3 && !selectedQuestionTypes.includes(item.id)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Distractor Types Tile - Now Third */}
                    <div className="bg-white rounded-lg shadow p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <BeakerIcon className="h-4 w-4 mr-2 text-red-500" />
                        <span>Distractor Types</span>
                        <span className="ml-2 text-xs text-gray-500 font-normal">(Select up to 3)</span>
                      </h4>
                      
                      <div className="space-y-1.5 h-[130px] overflow-y-auto pr-1 scrollbar-thin">
                        {insightsData.distractors.map((item) => (
                          <InsightItem
                            key={item.id}
                            item={item}
                            isSelected={selectedDistractors.includes(item.id)}
                            onToggle={() => toggleDistractor(item.id)}
                            disabled={selectedDistractors.length >= 3 && !selectedDistractors.includes(item.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Passage Topics Section (renamed from Subjects and Foundations) */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                    <DocumentTextIcon className="h-5 w-5 mr-2 text-khan-blue" />
                    5. Passage Topics
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                    {subjectCategories.map((category) => (
                      <div key={category.name} className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {category.subjects.map((subject) => (
                            <div 
                              key={subject.id} 
                              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100 ${
                                selectedSubjects.includes(subject.id) ? 'bg-blue-50 border border-blue-200' : ''
                              }`}
                              onClick={() => toggleSubject(subject.id)}
                            >
                              <input
                                type="checkbox"
                                id={`subject-${subject.id}`}
                                checked={selectedSubjects.includes(subject.id)}
                                onChange={() => {}}
                                className="h-4 w-4 text-khan-blue focus:ring-khan-blue rounded"
                              />
                              <label htmlFor={`subject-${subject.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer truncate">
                                {subject.label} <span className="text-gray-500">({subject.count})</span>
                              </label>
                              {selectedSubjects.includes(subject.id) && (
                                <CheckCircleIcon className="h-4 w-4 ml-1 text-khan-blue" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end border-t pt-6 mt-6">
                  <button
                    type="button"
                    onClick={resetSelections}
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue transition-colors duration-200"
                  >
                    <ArrowPathIcon className="h-4 w-4 mr-2" />
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={createExam}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-khan-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue transition-colors duration-200"
                  >
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Create Exam
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Previous Custom Exams Tab Content */}
          {activeTab === 'previous' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {previousExams.length > 0 ? (
                <div className="space-y-6">
                  {previousExams.map((exam) => (
                    <div key={exam.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-5 bg-gray-50">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div className="flex items-center">
                            {exam.status === 'completed' && (
                              <div className="p-2 bg-green-100 rounded-full mr-3">
                                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                              </div>
                            )}
                            {exam.status === 'paused' && (
                              <div className="p-2 bg-yellow-100 rounded-full mr-3">
                                <ClockIcon className="h-5 w-5 text-yellow-600" />
                              </div>
                            )}
                            {exam.status === 'abandoned' && (
                              <div className="p-2 bg-red-100 rounded-full mr-3">
                                <InformationCircleIcon className="h-5 w-5 text-red-600" />
                              </div>
                            )}
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                              <div className="flex items-center mt-1">
                                <p className="text-sm text-gray-500 mr-3">
                                  Created on {new Date(exam.date).toLocaleDateString()}
                                </p>
                                {exam.status === 'completed' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Completed
                                  </span>
                                )}
                                {exam.status === 'paused' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Paused
                                  </span>
                                )}
                                {exam.status === 'abandoned' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Abandoned
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Action buttons moved to the right side of the title */}
                          <div className="mt-4 md:mt-0 flex space-x-3">
                            {exam.status === 'completed' && (
                              <>
                                <Link 
                                  href={`/dashboard/score-report?exam=question-bank&id=${exam.id}&title=${encodeURIComponent(exam.title)}`}
                                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                  View Report
                                </Link>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-khan-blue rounded-md hover:bg-blue-700 transition-colors">
                                  Retake
                                </button>
                              </>
                            )}
                            {exam.status === 'paused' && (
                              <button className="px-4 py-2 text-sm font-medium text-white bg-khan-blue rounded-md hover:bg-blue-700 transition-colors">
                                Resume
                              </button>
                            )}
                            {exam.status === 'abandoned' && (
                              <button className="px-4 py-2 text-sm font-medium text-white bg-khan-blue rounded-md hover:bg-blue-700 transition-colors">
                                Restart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-5 border-t border-gray-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Passages</p>
                            <p className="text-lg font-semibold">{exam.passages}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Questions</p>
                            <p className="text-lg font-semibold">{exam.questions}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Time Spent</p>
                            <p className="text-lg font-semibold">{exam.timeTaken}</p>
                          </div>
                          {exam.status === 'completed' && (
                            <div className="text-center">
                              <p className="text-sm text-gray-500 mb-1">Score</p>
                              <p className="text-lg font-semibold text-khan-blue">{exam.score}</p>
                            </div>
                          )}
                          {exam.status === 'paused' && (
                            <div className="text-center">
                              <p className="text-sm text-gray-500 mb-1">Remaining Time</p>
                              <p className="text-lg font-semibold">{exam.remainingTime}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">You haven't created any custom exams yet.</p>
                  <button 
                    onClick={() => setActiveTab('create')}
                    className="px-4 py-2 bg-khan-blue text-white rounded-md hover:bg-khan-blue/90 transition-colors"
                  >
                    Create Your First Exam
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 