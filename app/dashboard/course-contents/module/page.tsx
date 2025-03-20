'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, CheckCircle, FileText, BookOpen, BarChart2, 
  Activity, Play, ExternalLink, Star, Lightbulb,
  UserCircle, Award, ChevronDown, ChevronUp, Bookmark,
  ArrowLeft, Check, X
} from 'lucide-react';

// Define types for the course data
interface Lesson {
  id: number;
  title: string;
  type: 'lesson' | 'quiz' | 'practice';
  duration: string;
  completed: boolean;
}

interface Module {
  id: number;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: string;
  color: string;
  instructor: string;
  duration: string;
  level: string;
  enrolled: boolean;
  rating: number;
  ratings_count: number;
  prerequisites: string[];
  learning_outcomes: string[];
  modules: Module[];
}

// Specific MCAT CARS module 1 course data
const course: Course = {
  id: 'mcat-cars-1',
  title: 'Foundations of CARS Analysis',
  description: 'Learn to identify key elements and structures in complex passages to master MCAT CARS questions',
  progress: 100,
  category: 'MCAT Preparation',
  color: 'indigo',
  instructor: 'Dr. Emily Chen',
  duration: '3 hours',
  level: 'Intermediate',
  enrolled: true,
  rating: 4.9,
  ratings_count: 187,
  prerequisites: ['Basic reading comprehension', 'High school level vocabulary'],
  learning_outcomes: [
    'Identify main ideas and arguments in complex passages',
    'Recognize author tone and perspective',
    'Analyze passage structure effectively',
    'Apply critical reading strategies to CARS passages',
    'Improve reading speed without sacrificing comprehension'
  ],
  modules: [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Introduction to CARS and the fundamentals',
      progress: 100,
      lessons: [
        {
          id: 1,
          title: 'Introduction to CARS Passages',
          type: 'lesson',
          duration: '25 min',
          completed: true,
        },
        {
          id: 2,
          title: 'Identifying Main Ideas and Arguments',
          type: 'lesson',
          duration: '30 min',
          completed: true,
        }
      ]
    },
    {
      id: 2,
      title: 'Key Concepts',
      description: 'Core skills for CARS success',
      progress: 100,
      lessons: [
        {
          id: 3,
          title: "Author's Tone and Perspective",
          type: 'lesson',
          duration: '35 min',
          completed: true,
        },
        {
          id: 4,
          title: 'Foundation Skills Assessment',
          type: 'quiz',
          duration: '20 min',
          completed: true,
        }
      ]
    },
    {
      id: 3,
      title: 'Practical Application',
      description: 'Apply your skills to real CARS passages',
      progress: 100,
      lessons: [
        {
          id: 5,
          title: 'Practice Passage: Philosophy',
          type: 'practice',
          duration: '40 min',
          completed: true,
        }
      ]
    }
  ]
};

// Get color class based on course color
const getColorClass = (color: string) => {
  switch (color) {
    case 'indigo':
      return 'bg-indigo-500';
    case 'blue':
      return 'bg-blue-500';
    case 'green':
      return 'bg-green-500';
    case 'purple':
      return 'bg-purple-500';
    case 'yellow':
      return 'bg-yellow-500';
    default:
      return 'bg-indigo-500';
  }
};

// Get text color class based on course color
const getTextColorClass = (color: string) => {
  switch (color) {
    case 'indigo':
      return 'text-indigo-500';
    case 'blue':
      return 'text-blue-500';
    case 'green':
      return 'text-green-500';
    case 'purple':
      return 'text-purple-500';
    case 'yellow':
      return 'text-yellow-500';
    default:
      return 'text-indigo-500';
  }
};

// Get lesson type icon
const getLessonTypeIcon = (type: string) => {
  switch (type) {
    case 'lesson':
      return <BookOpen className="w-5 h-5" />;
    case 'quiz':
      return <BarChart2 className="w-5 h-5" />;
    case 'practice':
      return <Activity className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

export default function ModulePage() {
  const [activeTab, setActiveTab] = useState('content'); // Only 'content' tab now
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2, 3]); // Initially expand all modules
  const [hoveredLesson, setHoveredLesson] = useState<number | null>(null);

  // Toggle module expansion
  const toggleModule = (moduleId: number) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  // Toggle lesson completion
  const toggleLessonCompletion = (lessonId: number) => {
    const updatedModules = [...course.modules];
    
    // Find the lesson and toggle its completion status
    updatedModules.forEach(module => {
      module.lessons.forEach(lesson => {
        if (lesson.id === lessonId) {
          lesson.completed = !lesson.completed;
        }
      });
    });
    
    // Update course modules (in a real app, this would be an API call)
    // For now, we're just updating the UI state
  };

  // Calculate overall course progress
  const totalLessons = course.modules.reduce((count: number, module: Module) => count + module.lessons.length, 0);
  const completedLessons = course.modules.reduce((count: number, module: Module) => 
    count + module.lessons.filter((lesson: Lesson) => lesson.completed).length, 0);
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Course Contents Link */}
          <div className="mb-4">
            <Link href="/dashboard/course-contents" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Course Contents
            </Link>
          </div>

          {/* Course Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className={`h-2 ${getColorClass(course.color)}`}></div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-indigo-100 mr-3">
                      <Lightbulb className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                  </div>
                  <p className="mt-2 text-gray-600">{course.description}</p>
                </div>
                <div className="mt-6 md:mt-0">
                  <div className="flex flex-col items-center">
                    <div className="relative h-24 w-24">
                      <svg className="w-24 h-24" viewBox="0 0 100 100">
                        <circle 
                          className="text-gray-200" 
                          strokeWidth="8" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="44" 
                          cx="50" 
                          cy="50" 
                        />
                        <circle 
                          className={getTextColorClass(course.color)} 
                          strokeWidth="8" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="44" 
                          cx="50" 
                          cy="50" 
                          strokeDasharray="276.5" 
                          strokeDashoffset={276.5 - (276.5 * overallProgress) / 100} 
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-800">{overallProgress}%</span>
                      </div>
                    </div>
                    <span className="mt-2 text-sm text-gray-600">Overall Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content - Changed from grid to full width layout */}
          <div className="space-y-6">
            {/* About This Course - Now two columns */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">About This Course</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column - Course Description */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase">Course Description</h3>
                      <p className="mt-2 text-gray-600">{course.description}</p>
                    </div>
                  </div>
                  
                  {/* Right Column - Learning Outcomes */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Learning Outcomes</h3>
                    <ul className="mt-2 space-y-2">
                      {course.learning_outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content - Now full width with only content tab */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Course Modules</h2>
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div
                        className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer"
                        onClick={() => toggleModule(module.id)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 h-8 w-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                            {module.progress === 100 ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <span className="font-bold">{module.id}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{module.title}</h3>
                            <p className="text-sm text-gray-500">{module.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 hidden md:block">
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="font-medium">{module.lessons.filter(l => l.completed).length}</span>
                              <span>/</span>
                              <span>{module.lessons.length} completed</span>
                            </div>
                          </div>
                          <button className="text-gray-400">
                            {expandedModules.includes(module.id) ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {expandedModules.includes(module.id) && (
                        <div className="border-t border-gray-200 bg-white">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="block border-b last:border-b-0 border-gray-100 hover:bg-indigo-50 transition-colors"
                              onMouseEnter={() => setHoveredLesson(lesson.id)}
                              onMouseLeave={() => setHoveredLesson(null)}
                            >
                              <div className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <button
                                    className={`flex-shrink-0 mr-3 h-8 w-8 rounded-full flex items-center justify-center
                                      ${lesson.completed 
                                        ? 'bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-600 transition-colors' 
                                        : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600 transition-colors'
                                      }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleLessonCompletion(lesson.id);
                                    }}
                                    aria-label={lesson.completed ? "Mark as incomplete" : "Mark as completed"}
                                  >
                                    {lesson.completed ? (
                                      hoveredLesson === lesson.id ? (
                                        <X className="w-5 h-5" />
                                      ) : (
                                        <CheckCircle className="w-5 h-5" />
                                      )
                                    ) : (
                                      hoveredLesson === lesson.id ? (
                                        <Check className="w-5 h-5" />
                                      ) : (
                                        getLessonTypeIcon(lesson.type)
                                      )
                                    )}
                                  </button>
                                  <div>
                                    <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                    <div className="text-xs text-gray-500 flex items-center mt-1">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {lesson.duration}
                                    </div>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <Link
                                    href={`/dashboard/course-contents/module/lesson/${lesson.id}`}
                                    className={`text-sm px-3 py-1 rounded border flex items-center
                                      ${lesson.completed
                                        ? 'border-indigo-300 text-indigo-600 hover:bg-indigo-50'
                                        : 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700'
                                      } transition-colors`}
                                  >
                                    {lesson.completed ? (
                                      <>
                                        <ExternalLink className="w-3 h-3 mr-1" /> Review
                                      </>
                                    ) : (
                                      <>
                                        <Play className="w-3 h-3 mr-1" /> Start
                                      </>
                                    )}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 