'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mock course data
const initialCourses = [
  {
    id: 1,
    title: 'Algebra Basics',
    category: 'Mathematics',
    status: 'Published',
    students: 1245,
    lastUpdated: '2023-02-15',
  },
  {
    id: 2,
    title: 'Biology Foundations',
    category: 'Science',
    status: 'Published',
    students: 892,
    lastUpdated: '2023-03-21',
  },
  {
    id: 3,
    title: 'Programming in JavaScript',
    category: 'Computer Science',
    status: 'Published',
    students: 1536,
    lastUpdated: '2023-01-08',
  },
  {
    id: 4,
    title: 'World History: Ancient Civilizations',
    category: 'History',
    status: 'Draft',
    students: 0,
    lastUpdated: '2023-04-02',
  },
  {
    id: 5,
    title: 'Calculus: Derivatives',
    category: 'Mathematics',
    status: 'Published',
    students: 728,
    lastUpdated: '2023-02-28',
  },
  {
    id: 6,
    title: 'Chemistry Fundamentals',
    category: 'Science',
    status: 'Published',
    students: 615,
    lastUpdated: '2023-03-10',
  },
  {
    id: 7,
    title: 'HTML & CSS Basics',
    category: 'Computer Science',
    status: 'Draft',
    students: 0,
    lastUpdated: '2023-04-11',
  },
  {
    id: 8,
    title: 'Economics 101',
    category: 'Social Science',
    status: 'Review',
    students: 0,
    lastUpdated: '2023-04-05',
  },
];

// Mock stats
const stats = [
  { name: 'Total Courses', value: '24' },
  { name: 'Total Students', value: '5,267' },
  { name: 'Completion Rate', value: '87%' },
  { name: 'Avg. Rating', value: '4.8/5' },
];

export default function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete course
  const deleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-64 flex-shrink-0 fixed inset-y-0 z-50 transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <Link href="/admin" className="text-2xl font-bold text-white">
              Admin Panel
            </Link>
            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/admin" 
                  className="flex items-center px-4 py-2 text-white bg-gray-700 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/courses" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Courses
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/students" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Students
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/analytics" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Analytics
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/settings" 
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-auto">
            <Link 
              href="/" 
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm z-40">
          <div className="px-4 py-4 flex items-center justify-between">
            <button 
              className="lg:hidden text-gray-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex-1 flex justify-center lg:justify-end px-2">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-khan-blue focus:ring-1 focus:ring-khan-blue focus:outline-none"
                    placeholder="Search courses"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="ml-2 flex items-center">
              <div className="h-8 w-8 rounded-full bg-khan-blue flex items-center justify-center text-white">
                <span className="font-medium">AD</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your courses and monitor platform activity.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
                </div>
              </div>
            ))}
          </div>

          {/* Course Management */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Course Management</h3>
              <Link 
                href="/admin/courses/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-khan-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                New Course
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{course.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : course.status === 'Draft' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.students.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/courses/${course.id}/edit`}
                            className="text-khan-blue hover:text-blue-900"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 sm:px-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredCourses.length}</span> of <span className="font-medium">{courses.length}</span> courses
                </div>
                <div className="flex-1 flex justify-end">
                  <Link 
                    href="/admin/courses"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 