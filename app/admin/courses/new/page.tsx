'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon
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

// Default values for a new course
const defaultCourse: Omit<Course, 'id'> = {
  title: '',
  description: '',
  image: 'https://via.placeholder.com/800x400',
  category: 'Mathematics',
  color: 'blue',
  instructor: '',
  duration: '8 weeks',
  level: 'Beginner',
  status: 'Draft',
  students: 0,
  lastUpdated: new Date().toISOString().split('T')[0],
  prerequisites: [],
  learning_outcomes: [],
  modules: [],
};

export default function NewCoursePage() {
  const router = useRouter();
  
  const [course, setCourse] = useState<Omit<Course, 'id'>>(defaultCourse);
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newOutcome, setNewOutcome] = useState('');
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
    
    // Clear validation error for this field if it exists
    if (formErrors[name]) {
      const newErrors = { ...formErrors };
      delete newErrors[name];
      setFormErrors(newErrors);
    }
  };

  // Handle adding a new prerequisite
  const handleAddPrerequisite = () => {
    if (!newPrerequisite.trim()) return;
    setCourse({
      ...course,
      prerequisites: [...course.prerequisites, newPrerequisite.trim()],
    });
    setNewPrerequisite('');
  };

  // Handle removing a prerequisite
  const handleRemovePrerequisite = (index: number) => {
    const updatedPrerequisites = [...course.prerequisites];
    updatedPrerequisites.splice(index, 1);
    setCourse({
      ...course,
      prerequisites: updatedPrerequisites,
    });
  };

  // Handle adding a new learning outcome
  const handleAddOutcome = () => {
    if (!newOutcome.trim()) return;
    setCourse({
      ...course,
      learning_outcomes: [...course.learning_outcomes, newOutcome.trim()],
    });
    setNewOutcome('');
  };

  // Handle removing a learning outcome
  const handleRemoveOutcome = (index: number) => {
    const updatedOutcomes = [...course.learning_outcomes];
    updatedOutcomes.splice(index, 1);
    setCourse({
      ...course,
      learning_outcomes: updatedOutcomes,
    });
  };

  // Handle adding a new module
  const handleAddModule = () => {
    const newModuleId = course.modules.length > 0 
      ? Math.max(0, ...course.modules.map(m => m.id)) + 1 
      : 1;
    
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
    setCourse({
      ...course,
      modules: course.modules.map(module => 
        module.id === moduleId ? { ...module, [field]: value } : module
      ),
    });
  };

  // Handle removing a module
  const handleRemoveModule = (moduleId: number) => {
    setCourse({
      ...course,
      modules: course.modules.filter(module => module.id !== moduleId),
    });
  };

  // Handle adding a new lesson to a module
  const handleAddLesson = (moduleId: number) => {
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return;
    
    const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
    const newLessonId = allLessonIds.length > 0 ? Math.max(0, ...allLessonIds) + 1 : 1;
    
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

  // Validate form
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    
    if (!course.title.trim()) {
      errors.title = 'Course title is required';
    }
    
    if (!course.description.trim()) {
      errors.description = 'Course description is required';
    }
    
    if (!course.instructor.trim()) {
      errors.instructor = 'Instructor name is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle creating the course
  const handleCreateCourse = async () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }
    
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(false);
    
    try {
      // In a real app, this would be an API call to create the course
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate a successful course creation
      // In a real application, the backend would return the new course ID
      const newCourseId = Math.floor(Math.random() * 1000) + 10;
      
      setSaveSuccess(true);
      
      // Redirect to the course list after successful creation
      setTimeout(() => {
        router.push('/admin/courses');
      }, 1500);
    } catch (error) {
      console.error('Error creating course:', error);
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Fill in the details to create a new course
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              {saveSuccess && (
                <div className="flex items-center text-green-600">
                  <CheckCircleIcon className="h-5 w-5 mr-1" />
                  <span>Course created successfully!</span>
                </div>
              )}
              {saveError && (
                <div className="flex items-center text-red-600">
                  <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                  <span>Error creating course</span>
                </div>
              )}
              <button
                onClick={handleCreateCourse}
                disabled={saving}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-khan-blue hover:bg-khan-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue ${
                  saving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {saving ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </div>

          {/* Basic Course Information */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={course.title}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                      formErrors.title 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:border-khan-blue focus:ring-khan-blue'
                    }`}
                    placeholder="e.g., Algebra Basics"
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    value={course.description}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                      formErrors.description 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:border-khan-blue focus:ring-khan-blue'
                    }`}
                    placeholder="Describe what students will learn in this course"
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                  )}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      Instructor <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="instructor"
                      id="instructor"
                      value={course.instructor}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                        formErrors.instructor 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-khan-blue focus:ring-khan-blue'
                      }`}
                      placeholder="e.g., Dr. Sarah Johnson"
                    />
                    {formErrors.instructor && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.instructor}</p>
                    )}
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
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                      placeholder="e.g., 8 weeks"
                    />
                  </div>
                </div>

                {/* Status and Image URL */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={course.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-khan-blue focus:outline-none focus:ring-khan-blue sm:text-sm"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500">
                      {course.status === 'Published' 
                        ? 'Published courses are visible to all students.'
                        : course.status === 'Draft' 
                        ? 'Draft courses are only visible to administrators.'
                        : 'Courses in review are being evaluated before publishing.'}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                      Course Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      id="image"
                      value={course.image}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Enter a URL for the course cover image. Recommended size: 800x400 pixels.
                    </p>
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
              </div>
            </div>
          </div>

          {/* Prerequisites and Learning Outcomes */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Course Requirements and Outcomes</h2>
              <div className="space-y-6">
                {/* Prerequisites */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prerequisites
                  </label>
                  <div className="mt-2">
                    {course.prerequisites.length === 0 ? (
                      <p className="text-sm text-gray-500 italic mb-2">No prerequisites added yet.</p>
                    ) : (
                      <ul className="space-y-2 mb-2">
                        {course.prerequisites.map((prerequisite, index) => (
                          <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <span className="text-sm text-gray-800">{prerequisite}</span>
                            <button
                              type="button"
                              onClick={() => handleRemovePrerequisite(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex">
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
                    {course.learning_outcomes.length === 0 ? (
                      <p className="text-sm text-gray-500 italic mb-2">No learning outcomes added yet.</p>
                    ) : (
                      <ul className="space-y-2 mb-2">
                        {course.learning_outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <span className="text-sm text-gray-800">{outcome}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveOutcome(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex">
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

          {/* Course Modules */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <div className="p-6">
              <div className="mb-4 flex justify-between items-center">
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
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">No modules added yet.</p>
                  <p className="text-sm text-gray-500">Click the "Add Module" button to create your first module.</p>
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {expandedModule === module.id && (
                        <div className="p-4 border-t border-gray-200">
                          <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700">Lessons</h3>
                            {module.lessons.length === 0 ? (
                              <p className="mt-2 text-sm text-gray-500">No lessons yet. Add your first lesson to this module.</p>
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
                                          <option value="video">Video</option>
                                          <option value="lesson">Lesson</option>
                                          <option value="quiz">Quiz</option>
                                          <option value="exercise">Exercise</option>
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
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
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

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mb-12">
            <Link
              href="/admin/courses"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={handleCreateCourse}
              disabled={saving}
              className={`inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-khan-blue hover:bg-khan-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue ${
                saving ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {saving ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 