"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, ChevronUp, Clock, CheckCircle, 
  BookOpen, Play, BarChart2, Activity, 
  PenTool, Target, Award, HelpCircle, ExternalLink,
  Lightbulb, Brain, Layers, Timer, Zap, GraduationCap,
  Info, X, Check, ArrowRight
} from 'lucide-react';

// Types
interface Submodule {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'lesson' | 'quiz' | 'practice';
}

interface CARSModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  submodules: Submodule[];
  completedLessons: number;
  totalLessons: number;
  estimatedTime: string;
}

export default function MCATCARSPrep() {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [areAllExpanded, setAreAllExpanded] = useState<boolean>(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [hoveredSubmodule, setHoveredSubmodule] = useState<string | null>(null);
  
  // Mock data for MCAT CARS Course
  const [carsModules, setCarsModules] = useState<CARSModule[]>([
    {
      id: 'module-1',
      title: 'Foundations of CARS Analysis',
      description: 'Learn to identify key elements and structures in complex passages',
      icon: <Lightbulb className="w-5 h-5" />,
      completedLessons: 5,
      totalLessons: 5,
      estimatedTime: '3 hours',
      submodules: [
        {
          id: 'submodule-1-1',
          title: 'Introduction to CARS Passages',
          duration: '25 min',
          completed: true,
          type: 'lesson'
        },
        {
          id: 'submodule-1-2',
          title: 'Identifying Main Ideas and Arguments',
          duration: '30 min',
          completed: true,
          type: 'lesson'
        },
        {
          id: 'submodule-1-3',
          title: "Author's Tone and Perspective",
          duration: '35 min',
          completed: true,
          type: 'lesson'
        },
        {
          id: 'submodule-1-4',
          title: 'Foundation Skills Assessment',
          duration: '20 min',
          completed: true,
          type: 'quiz'
        },
        {
          id: 'submodule-1-5',
          title: 'Practice Passage: Philosophy',
          duration: '40 min',
          completed: true,
          type: 'practice'
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Advanced Reading Strategies',
      description: 'Master efficient reading techniques for complex humanities passages',
      icon: <Brain className="w-5 h-5" />,
      completedLessons: 3,
      totalLessons: 5,
      estimatedTime: '4 hours',
      submodules: [
        {
          id: 'submodule-2-1',
          title: 'Active Reading Methodology',
          duration: '30 min',
          completed: true,
          type: 'lesson'
        },
        {
          id: 'submodule-2-2',
          title: 'Paragraph Analysis Techniques',
          duration: '35 min',
          completed: true,
          type: 'lesson'
        },
        {
          id: 'submodule-2-3',
          title: 'Strategic Highlighting',
          duration: '25 min',
          completed: true,
          type: 'lesson'
        },
        {
          id: 'submodule-2-4',
          title: 'Reading Strategy Assessment',
          duration: '20 min',
          completed: false,
          type: 'quiz'
        },
        {
          id: 'submodule-2-5',
          title: 'Practice Passage: Art History',
          duration: '40 min',
          completed: false,
          type: 'practice'
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Question Type Analysis',
      description: 'Understand the different question types and strategies for each',
      icon: <Layers className="w-5 h-5" />,
      completedLessons: 0,
      totalLessons: 6,
      estimatedTime: '4.5 hours',
      submodules: [
        {
          id: 'submodule-3-1',
          title: 'Main Idea Questions',
          duration: '25 min',
          completed: false,
          type: 'lesson'
        },
        {
          id: 'submodule-3-2',
          title: 'Detail and Inference Questions',
          duration: '35 min',
          completed: false,
          type: 'lesson'
        },
        {
          id: 'submodule-3-3',
          title: 'Reasoning Beyond the Text',
          duration: '30 min',
          completed: false,
          type: 'lesson'
        },
        {
          id: 'submodule-3-4',
          title: 'Application Questions',
          duration: '30 min',
          completed: false,
          type: 'lesson'
        },
        {
          id: 'submodule-3-5',
          title: 'Question Type Assessment',
          duration: '25 min',
          completed: false,
          type: 'quiz'
        },
        {
          id: 'submodule-3-6',
          title: 'Mixed Question Type Practice',
          duration: '45 min',
          completed: false,
          type: 'practice'
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Timing and Efficiency',
      description: 'Develop strategies to maximize your score within time constraints',
      icon: <Timer className="w-5 h-5" />,
      completedLessons: 0,
      totalLessons: 5,
      estimatedTime: '3.5 hours',
      submodules: [
        {
          id: 'submodule-4-1',
          title: 'Time Management Fundamentals',
          duration: '25 min',
          completed: false,
          type: 'lesson'
        },
        {
          id: 'submodule-4-2',
          title: 'Passage-by-Passage Strategies',
          duration: '30 min',
          completed: false,
          type: 'lesson'
        },
        {
          id: 'submodule-4-3',
          title: 'Difficult Passage Techniques',
          duration: '35 min',
          completed: false,
          type: 'lesson'
        },
        {
          id: 'submodule-4-4',
          title: 'Timed Practice Assessment',
          duration: '20 min',
          completed: false,
          type: 'quiz'
        },
        {
          id: 'submodule-4-5',
          title: 'Full-Length Timed Section',
          duration: '90 min',
          completed: false,
          type: 'practice'
        }
      ]
    },
    {
      id: 'module-5',
      title: 'Full CARS Mastery',
      description: 'Integrate all skills with comprehensive practice and review',
      icon: <GraduationCap className="w-5 h-5" />,
      completedLessons: 0,
      totalLessons: 4,
      estimatedTime: '5 hours',
      submodules: [
        {
          id: 'submodule-5-1',
          title: 'Comprehensive Review',
          duration: '45 min',
          completed: false,
          type: 'lesson'
        },
        {
          id: 'submodule-5-2',
          title: 'Advanced Strategy Integration',
          duration: '40 min',
          completed: false,
          type: 'lesson'
        },
        {
          id: 'submodule-5-3',
          title: 'Final Skills Assessment',
          duration: '30 min',
          completed: false,
          type: 'quiz'
        },
        {
          id: 'submodule-5-4',
          title: 'Complete CARS Practice Exam',
          duration: '90 min',
          completed: false,
          type: 'practice'
        }
      ]
    }
  ]);
  
  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };
  
  // Toggle expand/collapse all modules
  const toggleAllModules = () => {
    if (areAllExpanded) {
      setExpandedModules([]);
    } else {
      const allModuleIds = carsModules.map(module => module.id);
      setExpandedModules(allModuleIds);
    }
    setAreAllExpanded(!areAllExpanded);
  };

  // Show tooltip
  const showTooltip = (id: string) => {
    setActiveTooltip(id);
  };

  // Hide tooltip
  const hideTooltip = () => {
    setActiveTooltip(null);
  };
  
  // Toggle submodule completion status
  const toggleSubmoduleCompletion = (moduleId: string, submoduleId: string) => {
    setCarsModules(prevModules => 
      prevModules.map(module => {
        if (module.id === moduleId) {
          const updatedSubmodules = module.submodules.map(submodule => {
            if (submodule.id === submoduleId) {
              return { ...submodule, completed: !submodule.completed };
            }
            return submodule;
          });
          
          // Recalculate completedLessons
          const completedLessons = updatedSubmodules.filter(sub => sub.completed).length;
          
          return { 
            ...module, 
            submodules: updatedSubmodules,
            completedLessons
          };
        }
        return module;
      })
    );
  };
  
  // Module detail page navigation
  const navigateToModule = (e: React.MouseEvent, moduleId: string) => {
    e.stopPropagation(); // Prevent toggling the module when clicking the link
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 w-full mb-12">
      <div className="w-full mx-auto">
        {/* Module Cards */}
        {carsModules.map((module, index) => (
          <div key={module.id} className="mb-6 transform transition-transform hover:translate-y-[-2px]">
            <div className="rounded-xl bg-white shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-300 transition-colors duration-300">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg mr-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 flex items-center">
                        {module.title}
                        <button 
                          className="ml-2 text-gray-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
                          onMouseEnter={() => showTooltip(`module-info-${module.id}`)}
                          onMouseLeave={hideTooltip}
                          aria-label={`More information about ${module.title}`}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        {activeTooltip === `module-info-${module.id}` && (
                          <div className="absolute z-10 w-64 p-4 mt-2 text-sm text-left text-gray-700 bg-white rounded-lg shadow-lg border border-gray-200 ml-6">
                            <strong>Module {index + 1} of 5</strong>
                            <p className="mt-1">{module.description}</p>
                            <p className="mt-1 text-indigo-600">Includes {module.totalLessons} lessons, quizzes and practices</p>
                          </div>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm text-gray-500 mr-4 hidden md:block">
                      <span className="font-semibold text-indigo-600">{module.completedLessons}</span>
                      <span> / </span>
                      <span>{module.totalLessons} completed</span>
                    </div>
                    <div className="text-sm text-gray-500 mr-4 hidden md:block">
                      <Clock className="w-4 h-4 inline mr-1 text-indigo-500" />
                      <span>{module.estimatedTime}</span>
                    </div>
                    <Link 
                      href={`/dashboard/course-contents/module`}
                      className="mr-3 text-indigo-600 hover:text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200 flex items-center"
                      onClick={(e) => navigateToModule(e, module.id)}
                      aria-label={`View details for ${module.title}`}
                    >
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                    <button 
                      className="text-gray-500 hover:text-indigo-700 transition-colors p-1 rounded-full hover:bg-indigo-50"
                      aria-label={expandedModules.includes(module.id) ? "Collapse module" : "Expand module"}
                    >
                      {expandedModules.includes(module.id) ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="relative pt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                      <div 
                        className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-inner" 
                        style={{ width: `${(module.completedLessons / module.totalLessons) * 100}%` }}
                        aria-label={`${Math.round((module.completedLessons / module.totalLessons) * 100)}% complete`}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <div>
                        <span className="font-semibold text-indigo-600">{Math.round((module.completedLessons / module.totalLessons) * 100)}%</span> complete
                      </div>
                      <div className="md:hidden">
                        <Clock className="w-3 h-3 inline mr-1 text-indigo-500" />
                        <span>{module.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {expandedModules.includes(module.id) && (
                <div className="border-t border-gray-200 divide-y divide-gray-100">
                  {module.submodules.map((submodule, idx) => (
                    <div 
                      key={submodule.id} 
                      className={`flex flex-col md:flex-row md:items-center justify-between p-4 
                        ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 transition-colors duration-200`}
                      onMouseEnter={() => !submodule.completed && setHoveredSubmodule(submodule.id)}
                      onMouseLeave={() => setHoveredSubmodule(null)}
                    >
                      <div className="flex items-start md:items-center mb-2 md:mb-0">
                        <div className="flex items-center">
                          <button
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 
                              ${submodule.completed 
                                ? 'bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-600 transition-colors' 
                                : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600 transition-colors'
                              }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSubmoduleCompletion(module.id, submodule.id);
                            }}
                            aria-label={submodule.completed ? "Mark as incomplete" : "Mark as completed"}
                          >
                            {submodule.completed ? (
                              hoveredSubmodule === submodule.id ? (
                                <X className="w-5 h-5" />
                              ) : (
                                <CheckCircle className="w-5 h-5" />
                              )
                            ) : (
                              hoveredSubmodule === submodule.id ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                submodule.type === 'lesson' ? (
                                  <BookOpen className="w-5 h-5" />
                                ) : submodule.type === 'quiz' ? (
                                  <BarChart2 className="w-5 h-5" />
                                ) : (
                                  <Activity className="w-5 h-5" />
                                )
                              )
                            )}
                          </button>
                          <div>
                            <h4 className="font-medium text-gray-900">{submodule.title}</h4>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Clock className="w-3 h-3 mr-1 text-indigo-500" />
                              <span className="font-medium">{submodule.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Link
                          href={`/dashboard/course-contents/module/lesson/${idx + 1}`}
                          className={`text-sm px-5 py-2 rounded-lg flex items-center shadow-sm
                            ${submodule.completed
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            } transition-all duration-200`}
                          aria-label={submodule.completed ? `Review ${submodule.title}` : `Start ${submodule.title}`}
                        >
                          {submodule.completed ? (
                            <>
                              <ExternalLink className="w-4 h-4 mr-2" /> Review
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" /> Start
                            </>
                          )}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 