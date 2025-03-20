'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  TrashIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Types for course data
interface Lesson {
  id: number;
  title: string;
  type: string;
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
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  color: string;
  instructor: string;
  duration: string;
  level: string;
  status: string;
  students: number;
  lastUpdated: string;
  prerequisites: string[];
  learning_outcomes: string[];
  modules: Module[];
}

// Mock data for existing course
const courseMockData: Record<string, Course> = {
  '1': {
    id: 1,
    title: 'Algebra Basics',
    description: 'Learn the fundamentals of algebra, from equations to graphs. This course will teach you the core concepts needed to solve algebraic problems and build a strong foundation for more advanced mathematics.',
    image: 'https://via.placeholder.com/800x400',
    category: 'Mathematics',
    color: 'blue',
    instructor: 'Dr. Sarah Johnson',
    duration: '8 weeks',
    level: 'Beginner',
    status: 'Published',
    students: 1245,
    lastUpdated: '2023-02-15',
    prerequisites: ['Basic arithmetic'],
    learning_outcomes: [
      'Solve linear equations and inequalities',
      'Graph functions on a coordinate plane',
      'Understand and manipulate algebraic expressions',
      'Apply algebraic concepts to word problems',
    ],
    modules: [
      {
        id: 1,
        title: 'Introduction to Algebra',
        description: 'Basic concepts and notation',
        progress: 100,
        lessons: [
          {
            id: 1,
            title: 'What is Algebra?',
            type: 'video',
            duration: '10 min',
            completed: true,
          },
          {
            id: 2,
            title: 'Algebraic Expressions',
            type: 'lesson',
            duration: '15 min',
            completed: true,
          },
          {
            id: 3,
            title: 'Quiz: Basic Concepts',
            type: 'quiz',
            duration: '10 min',
            completed: true,
          },
        ],
      },
      {
        id: 2,
        title: 'Linear Equations',
        description: 'Solving equations with one variable',
        progress: 66,
        lessons: [
          {
            id: 4,
            title: 'One-Step Equations',
            type: 'video',
            duration: '12 min',
            completed: true,
          },
          {
            id: 5,
            title: 'Two-Step Equations',
            type: 'lesson',
            duration: '18 min',
            completed: true,
          },
        ],
      },
    ],
  },
};

// Options for dropdown selectors
const categories = [
  'Mathematics',
  'Science',
  'Computer Science',
  'History',
  'Social Science',
  'Language Arts',
  'Foreign Languages',
  'Arts',
  'Physical Education',
];

const levels = [
  'Beginner',
  'Intermediate',
  'Advanced',
];

const statuses = [
  'Draft',
  'Review',
  'Published',
];

const colors = [
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Purple', value: 'purple' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Red', value: 'red' },
];

const lessonTypes = [
  'video',
  'lesson',
  'quiz',
  'exercise',
];

export default function CourseEditPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'modules', 'settings'
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newOutcome, setNewOutcome] = useState('');
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  // Fetch course data when component mounts
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchCourse = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const courseData = courseMockData[courseId];
        
        if (courseData) {
          setCourse(courseData);
        } else {
          // Course not found, redirect to courses list
          router.push('/admin/courses');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  // Handle form input changes
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!course) return;
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  // Handle adding a new prerequisite
  const handleAddPrerequisite = () => {
    if (!course || !newPrerequisite.trim()) return;
    setCourse({
      ...course,
      prerequisites: [...course.prerequisites, newPrerequisite.trim()],
    });
    setNewPrerequisite('');
  };

  // Handle removing a prerequisite
  const handleRemovePrerequisite = (index: number) => {
    if (!course) return;
    const updatedPrerequisites = [...course.prerequisites];
    updatedPrerequisites.splice(index, 1);
    setCourse({
      ...course,
      prerequisites: updatedPrerequisites,
    });
  };

  // Handle adding a new learning outcome
  const handleAddOutcome = () => {
    if (!course || !newOutcome.trim()) return;
    setCourse({
      ...course,
      learning_outcomes: [...course.learning_outcomes, newOutcome.trim()],
    });
    setNewOutcome('');
  };

  // Handle removing a learning outcome
  const handleRemoveOutcome = (index: number) => {
    if (!course) return;
    const updatedOutcomes = [...course.learning_outcomes];
    updatedOutcomes.splice(index, 1);
    setCourse({
      ...course,
      learning_outcomes: updatedOutcomes,
    });
  };

  // Handle adding a new module
  const handleAddModule = () => {
    if (!course) return;
    const newModuleId = Math.max(0, ...course.modules.map(m => m.id)) + 1;
    const newModule: Module = {
      id: newModuleId,
      title: 'New Module',
      description: 'Module description',
      progress: 0,
      lessons: [],
    };
    setCourse({
      ...course,
      modules: [...course.modules, newModule],
    });
    setExpandedModule(newModuleId);
  };

  // Handle module changes
  const handleModuleChange = (moduleId: number, field: string, value: string) => {
    if (!course) return;
    setCourse({
      ...course,
      modules: course.modules.map(module => 
        module.id === moduleId ? { ...module, [field]: value } : module
      ),
    });
  };

  // Handle removing a module
  const handleRemoveModule = (moduleId: number) => {
    if (!course) return;
    setCourse({
      ...course,
      modules: course.modules.filter(module => module.id !== moduleId),
    });
  };

  // Handle adding a new lesson to a module
  const handleAddLesson = (moduleId: number) => {
    if (!course) return;
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return;
    
    const newLessonId = Math.max(0, ...course.modules.flatMap(m => m.lessons.map(l => l.id))) + 1;
    const newLesson: Lesson = {
      id: newLessonId,
      title: 'New Lesson',
      type: 'video',
      duration: '10 min',
      completed: false,
    };
    
    setCourse({
      ...course,
      modules: course.modules.map(m => 
        m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m
      ),
    });
  };

  // Handle lesson changes
  const handleLessonChange = (moduleId: number, lessonId: number, field: string, value: string) => {
    if (!course) return;
    setCourse({
      ...course,
      modules: course.modules.map(module => 
        module.id === moduleId ? {
          ...module,
          lessons: module.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
          )
        } : module
      ),
    });
  };

  // Handle removing a lesson
  const handleRemoveLesson = (moduleId: number, lessonId: number) => {
    if (!course) return;
    setCourse({
      ...course,
      modules: course.modules.map(module => 
        module.id === moduleId ? {
          ...module,
          lessons: module.lessons.filter(lesson => lesson.id !== lessonId)
        } : module
      ),
    });
  };

  // Handle saving the course
  const handleSaveCourse = async () => {
    if (!course) return;
    
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(false);
    
    try {
      // In a real app, this would be an API call to save the course
      await new Promise(resolve => setTimeout(resolve, 800));
      // Update the last updated date
      setCourse({
        ...course,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
      setSaveSuccess(true);
    } catch (error) {
      console.error('Error saving course:', error);
      setSaveError(true);
    } finally {
      setSaving(false);
      // Clear success/error messages after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
        setSaveError(false);
      }, 3000);
    }
  };

  // If course is not loaded yet, show loading state
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khan-blue mx-auto"></div>
          <h2 className="mt-4 text-lg font-medium text-gray-900">Loading course...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center">
              <Link
                href="/admin/courses"
                className="mr-4 p-2 rounded-full hover:bg-gray-200"
              >
                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Make changes to "{course.title}"
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              {saveSuccess && (
                <div className="flex items-center text-green-600">
                  <CheckCircleIcon className="h-5 w-5 mr-1" />
                  <span>Saved successfully</span>
                </div>
              )}
              {saveError && (
                <div className="flex items-center text-red-600">
                  <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                  <span>Error saving</span>
                </div>
              )}
              <button
                onClick={handleSaveCourse}
                disabled={saving}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-khan-blue hover:bg-khan-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue ${
                  saving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-8">
                <button
                  onClick={() => setActiveTab('basic')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'basic'
                      ? 'border-khan-blue text-khan-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Basic Information
                </button>
                <button
                  onClick={() => setActiveTab('modules')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'modules'
                      ? 'border-khan-blue text-khan-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Modules & Lessons
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-khan-blue text-khan-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Course Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={course.title}
                      onChange={handleBasicInfoChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={4}
                      value={course.description}
                      onChange={handleBasicInfoChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                    />
                  </div>

                  {/* Category and Level */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={course.category}
                        onChange={handleBasicInfoChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-khan-blue focus:outline-none focus:ring-khan-blue sm:text-sm"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                        Level
                      </label>
                      <select
                        id="level"
                        name="level"
                        value={course.level}
                        onChange={handleBasicInfoChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-khan-blue focus:outline-none focus:ring-khan-blue sm:text-sm"
                      >
                        {levels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Instructor and Duration */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                        Instructor
                      </label>
                      <input
                        type="text"
                        name="instructor"
                        id="instructor"
                        value={course.instructor}
                        onChange={handleBasicInfoChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        id="duration"
                        value={course.duration}
                        onChange={handleBasicInfoChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                        placeholder="e.g., 8 weeks"
                      />
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Course Color
                    </label>
                    <div className="mt-1 flex flex-wrap gap-3">
                      {colors.map((colorOption) => (
                        <button
                          key={colorOption.value}
                          type="button"
                          onClick={() => setCourse({ ...course, color: colorOption.value })}
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                            course.color === colorOption.value 
                              ? 'border-gray-900' 
                              : 'border-transparent hover:border-gray-300'
                          }`}
                        >
                          <span className={`w-10 h-10 rounded-full bg-${colorOption.value === 'blue' ? 'khan-blue' : 
                            colorOption.value === 'green' ? 'khan-green' : 
                            colorOption.value === 'purple' ? 'khan-purple' : 
                            colorOption.value === 'yellow' ? 'yellow-500' : 
                            'red-500'}`}></span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Prerequisites
                    </label>
                    <div className="mt-2">
                      <ul className="space-y-2">
                        {course.prerequisites.map((prerequisite, index) => (
                          <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <span className="text-sm text-gray-800">{prerequisite}</span>
                            <button
                              type="button"
                              onClick={() => handleRemovePrerequisite(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 flex">
                        <input
                          type="text"
                          value={newPrerequisite}
                          onChange={(e) => setNewPrerequisite(e.target.value)}
                          placeholder="Add a prerequisite"
                          className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleAddPrerequisite}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-khan-blue hover:bg-khan-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Learning Outcomes
                    </label>
                    <div className="mt-2">
                      <ul className="space-y-2">
                        {course.learning_outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <span className="text-sm text-gray-800">{outcome}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveOutcome(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 flex">
                        <input
                          type="text"
                          value={newOutcome}
                          onChange={(e) => setNewOutcome(e.target.value)}
                          placeholder="Add a learning outcome"
                          className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleAddOutcome}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-khan-blue hover:bg-khan-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modules & Lessons Tab */}
          {activeTab === 'modules' && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Course Modules</h2>
                  <button
                    type="button"
                    onClick={handleAddModule}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-khan-blue hover:bg-khan-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Module
                  </button>
                </div>

                {course.modules.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No modules yet. Add your first module to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {course.modules.map((module) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex items-center justify-between">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={module.title}
                              onChange={(e) => handleModuleChange(module.id, 'title', e.target.value)}
                              className="block w-full border-0 bg-transparent p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm font-medium"
                              placeholder="Module Title"
                            />
                            <div className="mt-1">
                              <input
                                type="text"
                                value={module.description}
                                onChange={(e) => handleModuleChange(module.id, 'description', e.target.value)}
                                className="block w-full border-0 bg-transparent p-0 text-gray-500 placeholder-gray-400 focus:ring-0 sm:text-xs"
                                placeholder="Module Description"
                              />
                            </div>
                          </div>
                          <div className="flex items-center ml-4 space-x-2">
                            <button
                              type="button"
                              onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {expandedModule === module.id ? 'Collapse' : 'Expand'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveModule(module.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {expandedModule === module.id && (
                          <div className="p-4 border-t border-gray-200">
                            <div className="mb-4">
                              <h3 className="text-sm font-medium text-gray-700">Lessons</h3>
                              {module.lessons.length === 0 ? (
                                <p className="mt-2 text-sm text-gray-500">No lessons yet.</p>
                              ) : (
                                <ul className="mt-2 space-y-3">
                                  {module.lessons.map((lesson) => (
                                    <li key={lesson.id} className="p-3 bg-gray-50 rounded-md">
                                      <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-5">
                                          <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Title
                                          </label>
                                          <input
                                            type="text"
                                            value={lesson.title}
                                            onChange={(e) => handleLessonChange(module.id, lesson.id, 'title', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                                          />
                                        </div>
                                        <div className="col-span-3">
                                          <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Type
                                          </label>
                                          <select
                                            value={lesson.type}
                                            onChange={(e) => handleLessonChange(module.id, lesson.id, 'type', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                                          >
                                            {lessonTypes.map((type) => (
                                              <option key={type} value={type}>
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div className="col-span-3">
                                          <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Duration
                                          </label>
                                          <input
                                            type="text"
                                            value={lesson.duration}
                                            onChange={(e) => handleLessonChange(module.id, lesson.id, 'duration', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                                            placeholder="10 min"
                                          />
                                        </div>
                                        <div className="col-span-1 flex items-end justify-end">
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveLesson(module.id, lesson.id)}
                                            className="text-red-600 hover:text-red-800"
                                          >
                                            <TrashIcon className="h-5 w-5" />
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              <button
                                type="button"
                                onClick={() => handleAddLesson(module.id)}
                                className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
                              >
                                <PlusIcon className="h-4 w-4 mr-1" />
                                Add Lesson
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Course Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={course.status}
                      onChange={handleBasicInfoChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-khan-blue focus:outline-none focus:ring-khan-blue sm:text-sm"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-500">
                      {course.status === 'Published' 
                        ? 'Published courses are visible to all students.'
                        : course.status === 'Draft' 
                        ? 'Draft courses are only visible to administrators.'
                        : 'Courses in review are being evaluated before publishing.'}
                    </p>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                      Course Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      id="image"
                      value={course.image}
                      onChange={handleBasicInfoChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Enter a URL for the course cover image. Recommended size: 800x400 pixels.
                    </p>
                  </div>

                  {/* Danger Zone */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                    <div className="mt-3 space-y-4">
                      <div className="bg-red-50 p-4 rounded-md">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Delete Course</h3>
                            <div className="mt-2 text-sm text-red-700">
                              <p>
                                Once deleted, a course cannot be recovered. All associated data, including student progress, will be permanently lost.
                              </p>
                            </div>
                            <div className="mt-4">
                              <button
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Delete This Course
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 