'use client';

import { StateCreator } from 'zustand';
import { Course, Lesson, Module } from './types';
import { Lightbulb, Brain, Layers, Timer } from 'lucide-react';
import React from 'react';
import { createPersistedStore } from './helpers/createPersistedStore';

interface CourseState {
  // State
  courses: Course[];
  enrolledCourses: string[]; // IDs of enrolled courses
  currentCourse: Course | null;
  currentModule: Module | null;
  currentLesson: Lesson | null;
  isLoading: boolean;
  error: string | null;
  lastFetched?: number;

  // Actions
  fetchCourses: () => Promise<void>;
  fetchCourse: (courseId: string | number) => Promise<void>;
  fetchModule: (courseId: string | number, moduleId: string | number) => Promise<void>;
  fetchLesson: (courseId: string | number, moduleId: string | number, lessonId: string | number) => Promise<void>;
  enrollInCourse: (courseId: string | number) => Promise<void>;
  markLessonAsCompleted: (courseId: string | number, moduleId: string | number, lessonId: string | number) => Promise<void>;
  updateCourseProgress: (courseId: string | number) => void;
  clearError: () => void;
  reset: () => void;
}

// Type for persisted state (subset of CourseState)
type PersistedCourseState = Pick<
  CourseState, 
  'courses' | 'enrolledCourses' | 'currentCourse' | 'currentModule' | 'currentLesson' | 'lastFetched'
>;

// Mock courses data for development
const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Foundations of CARS Analysis',
    description: 'Learn to identify key elements and structures in complex passages',
    progress: 100,
    icon: React.createElement(Lightbulb, { className: "w-5 h-5" }),
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
    icon: React.createElement(Brain, { className: "w-5 h-5" }),
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
    icon: React.createElement(Layers, { className: "w-5 h-5" }),
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
    icon: React.createElement(Timer, { className: "w-5 h-5" }),
    completedLessons: 0,
    totalLessons: 5,
    estimatedTime: '3.5 hours',
    category: 'MCAT CARS',
    color: 'yellow',
  },
];

// Create the course store state creator
const createCourseStore: StateCreator<CourseState> = (set, get) => ({
  // Initial state
  courses: [],
  enrolledCourses: [],
  currentCourse: null,
  currentModule: null,
  currentLesson: null,
  isLoading: false,
  error: null,

  // Actions
  fetchCourses: async () => {
    // Don't fetch if already loading
    if (get().isLoading) return;

    // Skip if we have recent data (within last 5 minutes)
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    if (get().courses.length > 0 && get().lastFetched && get().lastFetched > fiveMinutesAgo) {
      return;
    }
    
    set({ isLoading: true, error: null });
    try {
      // Here you would make an API call to fetch courses
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API latency
      
      set({ 
        courses: mockCourses, 
        isLoading: false,
        lastFetched: Date.now()
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch courses', 
        isLoading: false 
      });
    }
  },

  fetchCourse: async (courseId: string | number) => {
    set({ isLoading: true, error: null });
    try {
      // Here you would make an API call to fetch a specific course
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API latency
      
      const course = mockCourses.find(c => c.id === courseId);
      if (!course) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      
      set({ 
        currentCourse: course, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : `Failed to fetch course with ID ${courseId}`, 
        isLoading: false 
      });
    }
  },

  fetchModule: async (courseId: string | number, moduleId: string | number) => {
    set({ isLoading: true, error: null });
    try {
      // Here you would make an API call to fetch a specific module
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API latency
      
      const course = get().currentCourse || mockCourses.find(c => c.id === courseId);
      if (!course) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      
      const module = course.modules?.find(m => m.id === moduleId);
      if (!module) {
        throw new Error(`Module with ID ${moduleId} not found in course ${courseId}`);
      }
      
      set({ 
        currentModule: module, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : `Failed to fetch module with ID ${moduleId}`, 
        isLoading: false 
      });
    }
  },

  fetchLesson: async (courseId: string | number, moduleId: string | number, lessonId: string | number) => {
    set({ isLoading: true, error: null });
    try {
      // Here you would make an API call to fetch a specific lesson
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API latency
      
      const course = get().currentCourse || mockCourses.find(c => c.id === courseId);
      if (!course) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      
      const module = get().currentModule || course.modules?.find(m => m.id === moduleId);
      if (!module) {
        throw new Error(`Module with ID ${moduleId} not found in course ${courseId}`);
      }
      
      const lesson = module.lessons?.find(l => l.id === lessonId);
      if (!lesson) {
        throw new Error(`Lesson with ID ${lessonId} not found in module ${moduleId}`);
      }
      
      set({ 
        currentLesson: lesson, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : `Failed to fetch lesson with ID ${lessonId}`, 
        isLoading: false 
      });
    }
  },

  enrollInCourse: async (courseId: string | number) => {
    set({ isLoading: true, error: null });
    try {
      // Here you would make an API call to enroll in a course
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API latency
      
      const enrolledCourses = [...get().enrolledCourses];
      const courseIdStr = courseId.toString();
      
      if (!enrolledCourses.includes(courseIdStr)) {
        enrolledCourses.push(courseIdStr);
      }
      
      set({ 
        enrolledCourses, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : `Failed to enroll in course with ID ${courseId}`, 
        isLoading: false 
      });
    }
  },

  markLessonAsCompleted: async (courseId: string | number, moduleId: string | number, lessonId: string | number) => {
    set({ isLoading: true, error: null });
    try {
      // Here you would make an API call to mark a lesson as completed
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API latency
      
      // Update local state (this would normally come from the API response)
      const courses = [...get().courses];
      const courseIndex = courses.findIndex(c => c.id === courseId);
      
      if (courseIndex === -1) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      
      // For now, we'll just update the completedLessons count for the course
      const course = courses[courseIndex];
      if (course.completedLessons !== undefined && course.completedLessons < (course.totalLessons || 0)) {
        course.completedLessons += 1;
        course.progress = Math.round((course.completedLessons / (course.totalLessons || 1)) * 100);
      }
      
      set({ 
        courses, 
        isLoading: false,
        lastFetched: Date.now()
      });
      
      // Update the current course if it's the one we're updating
      if (get().currentCourse?.id === courseId) {
        set({ currentCourse: course });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : `Failed to mark lesson as completed`, 
        isLoading: false 
      });
    }
  },

  updateCourseProgress: (courseId: string | number) => {
    const courses = [...get().courses];
    const courseIndex = courses.findIndex(c => c.id === courseId);
    
    if (courseIndex !== -1) {
      const course = courses[courseIndex];
      if (course.completedLessons !== undefined && course.totalLessons) {
        course.progress = Math.round((course.completedLessons / course.totalLessons) * 100);
        set({ 
          courses,
          lastFetched: Date.now()
        });
        
        // Update current course if it's the one we're updating
        if (get().currentCourse?.id === courseId) {
          set({ currentCourse: course });
        }
      }
    }
  },

  clearError: () => {
    set({ error: null });
  },
  
  reset: () => {
    set({
      courses: [],
      enrolledCourses: [],
      currentCourse: null,
      currentModule: null,
      currentLesson: null,
      isLoading: false,
      error: null,
      lastFetched: undefined
    });
  }
});

// Create the persisted store
export const useCourseStore = createPersistedStore<CourseState, PersistedCourseState>(
  createCourseStore,
  {
    name: 'course-storage',
    version: 1, // Add version control for future state structure changes
    partialize: (state) => ({
      courses: state.courses,
      enrolledCourses: state.enrolledCourses,
      currentCourse: state.currentCourse,
      currentModule: state.currentModule,
      currentLesson: state.currentLesson,
      lastFetched: state.lastFetched
    })
  }
); 