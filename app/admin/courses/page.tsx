'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  ArrowDownTrayIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

// Type definitions
interface Course {
  id: number;
  title: string;
  category: string;
  status: string;
  students: number;
  lastUpdated: string;
  instructor: string;
  level: string;
}

// Mock course data
const initialCourses: Course[] = [
  {
    id: 1,
    title: 'Algebra Basics',
    category: 'Mathematics',
    status: 'Published',
    students: 1245,
    lastUpdated: '2023-02-15',
    instructor: 'Dr. Sarah Johnson',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Biology Foundations',
    category: 'Science',
    status: 'Published',
    students: 892,
    lastUpdated: '2023-03-21',
    instructor: 'Prof. Michael Lee',
    level: 'Beginner',
  },
  {
    id: 3,
    title: 'Programming in JavaScript',
    category: 'Computer Science',
    status: 'Published',
    students: 1536,
    lastUpdated: '2023-01-08',
    instructor: 'Emily Chen',
    level: 'Intermediate',
  },
  {
    id: 4,
    title: 'World History: Ancient Civilizations',
    category: 'History',
    status: 'Draft',
    students: 0,
    lastUpdated: '2023-04-02',
    instructor: 'Dr. Robert Williams',
    level: 'Beginner',
  },
  {
    id: 5,
    title: 'Calculus: Derivatives',
    category: 'Mathematics',
    status: 'Published',
    students: 728,
    lastUpdated: '2023-02-28',
    instructor: 'Dr. Sarah Johnson',
    level: 'Intermediate',
  },
  {
    id: 6,
    title: 'Chemistry Fundamentals',
    category: 'Science',
    status: 'Published',
    students: 615,
    lastUpdated: '2023-03-10',
    instructor: 'Prof. David Kim',
    level: 'Beginner',
  },
  {
    id: 7,
    title: 'HTML & CSS Basics',
    category: 'Computer Science',
    status: 'Draft',
    students: 0,
    lastUpdated: '2023-04-11',
    instructor: 'Emily Chen',
    level: 'Beginner',
  },
  {
    id: 8,
    title: 'Economics 101',
    category: 'Social Science',
    status: 'Review',
    students: 0,
    lastUpdated: '2023-04-05',
    instructor: 'Prof. James Wilson',
    level: 'Beginner',
  },
];

// Category options for filtering
const categories = [
  'All Categories',
  'Mathematics',
  'Science',
  'Computer Science',
  'History',
  'Social Science',
];

// Status options for filtering
const statuses = [
  'All Statuses',
  'Published',
  'Draft',
  'Review',
];

// Level options for filtering
const levels = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced',
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter courses based on search query and selected filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.status.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Statuses' || course.status === selectedStatus;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesLevel;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (!sortField) return 0;
    
    const fieldA = a[sortField as keyof Course];
    const fieldB = b[sortField as keyof Course];
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc' 
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }
    
    // For numeric fields
    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    }
    
    return 0;
  });

  // Toggle sort direction or set new sort field
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Delete course
  const deleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  // Confirm delete
  const confirmDelete = (course: Course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage, edit, and create courses for the platform
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/admin/courses/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-khan-blue hover:bg-khan-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create New Course
              </Link>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-1">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      placeholder="Search courses..."
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                    Level
                  </label>
                  <select
                    id="level"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-khan-blue focus:ring-khan-blue sm:text-sm"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Course Table */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Courses ({filteredCourses.length})</h2>
              <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue">
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center">
                        Course Title
                        {sortField === 'title' && (
                          <ChevronDownIcon 
                            className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('category')}
                    >
                      <div className="flex items-center">
                        Category
                        {sortField === 'category' && (
                          <ChevronDownIcon 
                            className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('instructor')}
                    >
                      <div className="flex items-center">
                        Instructor
                        {sortField === 'instructor' && (
                          <ChevronDownIcon 
                            className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        {sortField === 'status' && (
                          <ChevronDownIcon 
                            className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('students')}
                    >
                      <div className="flex items-center">
                        Students
                        {sortField === 'students' && (
                          <ChevronDownIcon 
                            className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('lastUpdated')}
                    >
                      <div className="flex items-center">
                        Last Updated
                        {sortField === 'lastUpdated' && (
                          <ChevronDownIcon 
                            className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedCourses.length > 0 ? (
                    sortedCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{course.title}</div>
                              <div className="text-sm text-gray-500">{course.level}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.instructor}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${course.status === 'Published' ? 'bg-green-100 text-green-800' : 
                              course.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'}`}
                          >
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.students.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              href={`/admin/courses/${course.id}`}
                              className="text-gray-600 hover:text-gray-900"
                              title="View Course"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </Link>
                            <Link
                              href={`/admin/courses/${course.id}/edit`}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit Course"
                            >
                              <PencilSquareIcon className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => confirmDelete(course)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Course"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                        No courses found matching your filters. Try adjusting your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{sortedCourses.length}</span> of{' '}
                <span className="font-medium">{courses.length}</span> total courses
              </div>
              <div className="flex-1 flex justify-end">
                <div className="relative z-0 inline-flex shadow-sm rounded-md">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-khan-blue focus:border-khan-blue"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-khan-blue focus:border-khan-blue"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && courseToDelete && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Course</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete the course "{courseToDelete.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => deleteCourse(courseToDelete.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 