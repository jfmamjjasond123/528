'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import CalendarWidget from '../components/CalendarWidget';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import TestTimeChartWrapper from '../components/analytics/TestTimeChartWrapper';
import { BookOpen, Lightbulb, Brain, Layers, Timer, ArrowRight } from 'lucide-react';
import { PageHeader, Card, Button, ProgressBar } from '../components/ui';
import { CourseCardFull } from '../components/ui/cards/CourseCardFull';
import { useCourseStore, useUserStore, useAnalyticsStore, useTestTimeStore } from '../lib/stores';

export default function Dashboard() {
  // Use our stores instead of local state
  const { courses, fetchCourses, isLoading: coursesLoading } = useCourseStore();
  const { user, fetchUser, isLoading: userLoading } = useUserStore();
  const { fetchAnalytics } = useAnalyticsStore();
  const { fetchTestTimeData } = useTestTimeStore();
  
  // Fetch data when component mounts
  useEffect(() => {
    fetchCourses();
    fetchUser();
    fetchAnalytics();
    fetchTestTimeData();
  }, [fetchCourses, fetchUser, fetchAnalytics, fetchTestTimeData]);
  
  // Loading state
  if (coursesLoading || userLoading) {
    return (
      <div className="min-h-screen bg-khan-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <PageHeader
            title={`Welcome back, ${user?.name || 'Student'}!`}
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
            <TestTimeChartWrapper />
          </div>

          {/* Learning Progress and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Learning Progress */}
            <div className="lg:col-span-2">
              <Card padding="large">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <CourseCardFull
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      progress={course.progress}
                      completedLessons={course.completedLessons}
                      totalLessons={course.totalLessons}
                      hoursCount={parseInt(course.estimatedTime || '0')}
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