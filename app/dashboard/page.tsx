'use client';

import React from 'react';
import Link from 'next/link';
import CalendarWidget from '../components/CalendarWidget';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import TestTimeChartWrapper from '../components/analytics/TestTimeChartWrapper';
import { BookOpen, Lightbulb, Brain, Layers, Timer, ArrowRight } from 'lucide-react';
import { PageHeader, Card, Button, ProgressBar, CourseCardFull } from '../components/ui';

// Mock data for MCAT CARS courses
const mcatCourses = [
  {
    id: 1,
    title: 'Foundations of CARS Analysis',
    description: 'Learn to identify key elements and structures in complex passages',
    progress: 100,
    icon: <Lightbulb className="w-5 h-5" />,
    completedLessons: 5,
    totalLessons: 5,
    estimatedTime: '3 hours',
    category: 'MCAT CARS',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Advanced Reading Strategies',
    description: 'Master efficient reading techniques for complex humanities passages',
    progress: 60,
    icon: <Brain className="w-5 h-5" />,
    completedLessons: 3,
    totalLessons: 5,
    estimatedTime: '4 hours',
    category: 'MCAT CARS',
    color: 'green',
  },
  {
    id: 3,
    title: 'Question Type Analysis',
    description: 'Understand the different question types and strategies for each',
    progress: 0,
    icon: <Layers className="w-5 h-5" />,
    completedLessons: 0,
    totalLessons: 6,
    estimatedTime: '4.5 hours',
    category: 'MCAT CARS',
    color: 'purple',
  },
  {
    id: 4,
    title: 'Timing and Efficiency',
    description: 'Develop strategies to maximize your score within time constraints',
    progress: 0,
    icon: <Timer className="w-5 h-5" />,
    completedLessons: 0,
    totalLessons: 5,
    estimatedTime: '3.5 hours',
    category: 'MCAT CARS',
    color: 'yellow',
  },
];

// Enhanced mock data for test times with more data points
const testTimeData = [
  { date: '2023-12-15', testTime: 12.2 },
  { date: '2023-12-22', testTime: 11.5 },
  { date: '2023-12-29', testTime: 10.8 },
  { date: '2024-01-03', testTime: 10.5 },
  { date: '2024-01-09', testTime: 7.9 },
  { date: '2024-01-15', testTime: 6.5 },
  { date: '2024-01-20', testTime: 5.7, examScore: '505/600', isSelected: true },
  { date: '2024-01-25', testTime: 3.8 },
  { date: '2024-01-27', testTime: 3.1 },
  { date: '2024-01-29', testTime: 2.4 },
  { date: '2024-01-31', testTime: 2.1 },
  { date: '2024-02-05', testTime: 1.9 },
  { date: '2024-02-12', testTime: 1.7 },
  { date: '2024-02-19', testTime: 1.5 },
  { date: '2024-02-26', testTime: 1.3 }
];

// Get color class based on course color
const getColorClass = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-khan-blue';
    case 'green':
      return 'bg-khan-green';
    case 'purple':
      return 'bg-khan-purple';
    case 'yellow':
      return 'bg-yellow-500';
    default:
      return 'bg-khan-blue';
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <PageHeader
            title="Welcome back, John!"
            description="Continue your learning journey where you left off."
            icon={<span className="text-2xl" aria-hidden="true">👋</span>}
            actions={
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight />}
                iconPosition="right"
                onClick={() => window.location.href = "/dashboard/question-bank"}
              >
                Create New Practice Exam
              </Button>
            }
          />

          {/* Your Progress Summary */}
          <div className="mb-8">
            <AnalyticsDashboard />
          </div>
          
          {/* Test Time Analysis */}
          <div className="mb-8">
            <TestTimeChartWrapper data={testTimeData} />
          </div>

          {/* Learning Progress and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Learning Progress */}
            <div className="lg:col-span-2">
              <Card padding="large">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mcatCourses.map((course) => (
                    <CourseCardFull
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      progress={course.progress}
                      completedLessons={course.completedLessons}
                      totalLessons={course.totalLessons}
                      hoursCount={parseInt(course.estimatedTime)}
                      href={`/dashboard/courses/${course.id}`}
                      icon={course.icon}
                      color={course.color as 'blue' | 'green' | 'yellow' | 'purple'}
                    />
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Calendar Widget */}
            <Card className="lg:col-span-1 h-full p-0">
              <CalendarWidget />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 