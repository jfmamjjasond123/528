'use client';

import { StateCreator } from 'zustand';
import { AnalyticsData, AnalyticsState } from './types';
import apiClient, { endpoints } from '../api/client';
import { createPersistedStore } from './helpers/createPersistedStore';

// Define analytics store state and actions
interface AnalyticsStore extends AnalyticsState {
  // Actions
  fetchAnalytics: () => Promise<void>;
  getAnalytics: () => Promise<AnalyticsData | null>;
  setTimeRange: (range: 'week' | 'month' | 'year' | 'all') => void;
  clearError: () => void;
  reset: () => void;
}

// Type for persisted state (subset of AnalyticsStore)
type PersistedAnalyticsState = Pick<
  AnalyticsStore,
  'analytics' | 'timeRange' | 'lastFetched'
>;

// Mock analytics data for development fallback
const mockAnalyticsData: AnalyticsData = {
  courseCompletion: {
    percentageCompleted: 65,
    lessonsCompleted: 24,
    totalLessons: 37,
    lessonsLeft: 13,
  },
  passagesProgress: {
    percentageCompleted: 48,
    passagesCompleted: 12,
    totalPassages: 25,
    passagesLeft: 13,
  },
  questionAccuracy: {
    percentageCorrect: 72,
    correctAnswers: 144,
    incorrectAnswers: 56,
    incompleteAnswers: 20,
    totalQuestions: 220,
  },
};

// Create the analytics store state creator
const createAnalyticsStoreState: StateCreator<AnalyticsStore> = (set, get) => ({
  // Initial state
  analytics: null,
  timeRange: 'month',
  isLoading: false,
  error: null,

  // Fetch analytics data with caching
  fetchAnalytics: async () => {
    const { isLoading, analytics, lastFetched, timeRange } = get();
    
    // Skip if already loading
    if (isLoading) return;
    
    // Skip if we have recent data (within last 5 minutes) and time range hasn't changed
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    if (analytics && lastFetched && lastFetched > fiveMinutesAgo) {
      return;
    }
    
    set({ isLoading: true, error: null });
    try {
      // In production: use the proper time range parameter
      const response = await apiClient.get(
        `${endpoints.analytics.summary}?timeRange=${timeRange}`
      );
      
      set({ 
        analytics: response.data, 
        isLoading: false,
        lastFetched: Date.now()
      });
    } catch (error: any) {
      console.error('Failed to fetch analytics:', error);
      // Return mock data in development to allow UI testing
      if (process.env.NODE_ENV === 'development') {
        set({ 
          analytics: mockAnalyticsData,
          isLoading: false,
          lastFetched: Date.now(),
          error: 'Using mock data (API error: ' + 
            (error.response?.data?.message || error.message) + ')'
        });
      } else {
        set({ 
          error: error.response?.data?.message || 'Failed to fetch analytics data', 
          isLoading: false 
        });
      }
    }
  },

  // Get analytics data, fetching if needed
  getAnalytics: async () => {
    const { analytics, isLoading } = get();
    
    // If we don't have data and aren't already loading, fetch it
    if (!analytics && !isLoading) {
      await get().fetchAnalytics();
    }
    
    // Return analytics data, could be null
    return get().analytics;
  },

  // Set time range and refetch data
  setTimeRange: (range: 'week' | 'month' | 'year' | 'all') => {
    // Only refetch if the range has actually changed
    if (get().timeRange !== range) {
      set({ 
        timeRange: range,
        // Reset analytics to null to trigger a new fetch with the new time range
        analytics: null
      });
      
      // Fetch new data for the selected range
      get().fetchAnalytics();
    }
  },

  // Clear error state
  clearError: () => {
    set({ error: null });
  },
  
  // Reset store state
  reset: () => {
    set({
      analytics: null,
      timeRange: 'month',
      isLoading: false,
      error: null,
      lastFetched: undefined
    });
  }
});

// Create the persisted store
export const useAnalyticsStore = createPersistedStore<AnalyticsStore, PersistedAnalyticsState>(
  createAnalyticsStoreState,
  {
    name: 'analytics-storage',
    version: 1, // Add version control for future state structure changes
    partialize: (state) => ({
      analytics: state.analytics,
      timeRange: state.timeRange,
      lastFetched: state.lastFetched
    })
  }
); 