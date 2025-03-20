'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import apiClient, { endpoints } from '../api/client';

// Test time data types
export interface TestTimeDataPoint {
  date: string;
  testTime: number;
  examScore?: string;
  isSelected?: boolean;
}

export interface FullLengthScoreDataPoint {
  date: string;
  score: number;
  isSelected?: boolean;
}

// Test time store state
interface TestTimeState {
  testTimeData: TestTimeDataPoint[];
  fullLengthScoreData: FullLengthScoreDataPoint[];
  selectedTimeRange: 'Last 7 days' | 'Last 14 days' | 'Last 30 days' | 'Last 60 days' | 'Last 90 days' | 'Custom range';
  customDateRange: {
    startDate: string;
    endDate: string;
  };
  isLoading: boolean;
  error: string | null;
  lastFetched?: number;
}

// Test time store actions
interface TestTimeActions {
  fetchTestTimeData: () => Promise<void>;
  setSelectedTimeRange: (range: TestTimeState['selectedTimeRange']) => void;
  setCustomDateRange: (startDate: string, endDate: string) => void;
  selectTestTimePoint: (date: string) => void;
  clearError: () => void;
  reset: () => void;
}

// Combined store type
type TestTimeStore = TestTimeState & TestTimeActions;

// Mock data for test times
const mockTestTimeData: TestTimeDataPoint[] = [
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

// Mock data for full length scores
const mockFullLengthScoreData: FullLengthScoreDataPoint[] = [
  { date: '2023-12-15', score: 118 },
  { date: '2023-12-22', score: 119 },
  { date: '2023-12-29', score: 120 },
  { date: '2024-01-05', score: 122 },
  { date: '2024-01-12', score: 123 },
  { date: '2024-01-19', score: 125 },
  { date: '2024-01-26', score: 126 },
  { date: '2024-02-02', score: 128, isSelected: true },
  { date: '2024-02-09', score: 129 },
  { date: '2024-02-16', score: 130 },
  { date: '2024-02-23', score: 131 },
  { date: '2024-03-01', score: 132 },
  { date: '2024-03-08', score: 132 }
];

export const useTestTimeStore = create<TestTimeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      testTimeData: [],
      fullLengthScoreData: [],
      selectedTimeRange: 'Last 30 days',
      customDateRange: {
        startDate: "",
        endDate: ""
      },
      isLoading: false,
      error: null,

      // Fetch test time data
      fetchTestTimeData: async () => {
        const { isLoading, lastFetched } = get();
        
        // Skip if already loading
        if (isLoading) return;
        
        // Skip if we have recent data (within last 5 minutes)
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
        if (lastFetched && lastFetched > fiveMinutesAgo) {
          return;
        }
        
        set({ isLoading: true, error: null });
        
        try {
          // In production: Fetch from API
          // const response = await apiClient.get(endpoints.analytics.testTime);
          // set({ 
          //   testTimeData: response.data.testTimeData,
          //   fullLengthScoreData: response.data.fullLengthScoreData,
          //   isLoading: false,
          //   lastFetched: Date.now()
          // });
          
          // For development: Use mock data with a delay to simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ 
            testTimeData: mockTestTimeData,
            fullLengthScoreData: mockFullLengthScoreData,
            isLoading: false,
            lastFetched: Date.now()
          });
        } catch (error: any) {
          console.error('Failed to fetch test time data:', error);
          
          // In development: Return mock data on error
          if (process.env.NODE_ENV === 'development') {
            set({ 
              testTimeData: mockTestTimeData,
              fullLengthScoreData: mockFullLengthScoreData,
              isLoading: false,
              lastFetched: Date.now(),
              error: 'Using mock data (API error: ' + 
                (error.response?.data?.message || error.message) + ')'
            });
          } else {
            set({ 
              error: error.response?.data?.message || 'Failed to fetch test time data', 
              isLoading: false 
            });
          }
        }
      },

      // Set selected time range
      setSelectedTimeRange: (range) => {
        set({ selectedTimeRange: range });
      },

      // Set custom date range
      setCustomDateRange: (startDate, endDate) => {
        set({ 
          customDateRange: {
            startDate,
            endDate
          } 
        });
      },

      // Select a specific test time data point
      selectTestTimePoint: (date) => {
        set(state => ({
          testTimeData: state.testTimeData.map(point => ({
            ...point,
            isSelected: point.date === date
          }))
        }));
      },

      // Clear error state
      clearError: () => {
        set({ error: null });
      },
      
      // Reset store state
      reset: () => {
        set({
          testTimeData: [],
          fullLengthScoreData: [],
          selectedTimeRange: 'Last 30 days',
          customDateRange: {
            startDate: "",
            endDate: ""
          },
          isLoading: false,
          error: null,
          lastFetched: undefined
        });
      }
    }),
    {
      name: 'test-time-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these specific parts of the state
        testTimeData: state.testTimeData,
        fullLengthScoreData: state.fullLengthScoreData,
        selectedTimeRange: state.selectedTimeRange,
        customDateRange: state.customDateRange,
        lastFetched: state.lastFetched
      })
    }
  )
); 