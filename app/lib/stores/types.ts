// Common types for our domain models
import React from 'react';

// API response handling types
export interface ApiState {
  isLoading: boolean;
  error: string | null;
  lastFetched?: number;
}

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
}

export interface AuthState extends ApiState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken?: string;
  refreshTokenValue?: string; // The actual refresh token string
  tokenExpiry?: number;
}

// Course related types
export interface Course {
  id: string | number;
  title: string;
  description?: string;
  category?: string;
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
  estimatedTime?: string;
  hoursCount?: number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  icon?: React.ReactNode;
  modules?: Module[];
}

export interface CoursesState extends ApiState {
  courses: Course[];
  activeCourse: Course | null;
  enrolledCourses: string[] | number[];
  filters: {
    category?: string;
    progress?: 'all' | 'in-progress' | 'completed';
    sort?: 'recent' | 'title' | 'progress';
  };
}

export interface Module {
  id: string | number;
  title: string;
  description?: string;
  lessons: Lesson[];
  completedLessons?: number;
  totalLessons?: number;
  estimatedTime?: string;
}

export interface Lesson {
  id: string | number;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'practice';
  duration?: string;
  completed?: boolean;
  content?: string;
}

// Progress tracking types
export interface Progress {
  courseId: string | number;
  userId: string;
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: string;
  completedModules: number;
  totalModules: number;
}

// Analytics types
export interface AnalyticsData {
  courseCompletion: {
    percentageCompleted: number;
    lessonsCompleted: number;
    totalLessons: number;
    lessonsLeft: number;
  };
  passagesProgress: {
    percentageCompleted: number;
    passagesCompleted: number;
    totalPassages: number;
    passagesLeft: number;
  };
  questionAccuracy: {
    percentageCorrect: number;
    correctAnswers: number;
    incorrectAnswers: number;
    incompleteAnswers: number;
    totalQuestions: number;
  };
}

export interface AnalyticsState extends ApiState {
  analytics: AnalyticsData | null;
  timeRange: 'week' | 'month' | 'year' | 'all';
}

// Calendar types
export interface CalendarEvent {
  id: string | number;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  allDay?: boolean;
  type: 'exam' | 'study' | 'lesson' | 'meeting' | 'other';
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
}

export interface CalendarState extends ApiState {
  events: CalendarEvent[];
  selectedDate: string | null;
  view: 'day' | 'week' | 'month';
} 