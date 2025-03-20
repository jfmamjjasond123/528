'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import apiClient, { endpoints } from '../api/client';

// Types for CARS Analytics data
export interface PerformanceDataPoint {
  name: string;
  score: number;
  avgTime: number;
}

export interface FullLengthScore {
  name: string;
  chem: number;
  cars: number;
  bio: number;
  psych: number;
}

export interface DistractorAnalysisPoint {
  date: string;
  correctAnswer: number;
  closeDistractor: number;
  unrelatedDistractor: number;
  oppositeDistractor: number;
}

export interface SubjectPerformancePoint {
  date: string;
  humanities: number;
  socialSciences: number;
  naturalSciences: number;
  philosophy: number;
}

export interface SkillDataPoint {
  month: string;
  criticalAnalysis: number;
  readingComprehension: number;
}

export interface PassageTypePoint {
  name: string;
  score: number;
}

export interface QuestionTypePoint {
  name: string;
  value: number;
}

export interface StudyTimePoint {
  name: string;
  value: number;
}

export interface PracticeSessionPoint {
  date: string;
  sessions: number;
  avgScore: number;
}

export interface SkillRadarPoint {
  subject: string;
  A: number;
  fullMark: number;
}

export interface PassageCompletionPoint {
  name: string;
  completion: number;
  avgTime: number;
}

export interface QuestionBankData {
  correctQuestions: number;
  incorrectAnswers: number;
  incompleteQuestions: number;
  seenQuestions: number;
  unseenQuestions: number;
  totalQuestions: number;
  totalPossibleQuestions: number;
}

// CARS Analytics state
interface CarsAnalyticsState {
  performanceData: PerformanceDataPoint[];
  fullLengthScoresData: FullLengthScore[];
  distractorAnalysisData: DistractorAnalysisPoint[];
  subjectPerformanceData: SubjectPerformancePoint[];
  skillsData: SkillDataPoint[];
  passageTypePerformanceData: PassageTypePoint[];
  questionTypeData: QuestionTypePoint[];
  studyTimeData: StudyTimePoint[];
  practiceSessionsData: PracticeSessionPoint[];
  skillsRadarData: SkillRadarPoint[];
  passageCompletionData: PassageCompletionPoint[];
  questionBankData: QuestionBankData;
  selectedTimeRange: 'week' | 'month' | 'year' | 'all';
  isLoading: boolean;
  error: string | null;
  lastFetched?: number;
}

// CARS Analytics actions
interface CarsAnalyticsActions {
  fetchCarsAnalytics: () => Promise<void>;
  setSelectedTimeRange: (range: CarsAnalyticsState['selectedTimeRange']) => void;
  clearError: () => void;
  reset: () => void;
}

// Combined store type
type CarsAnalyticsStore = CarsAnalyticsState & CarsAnalyticsActions;

// Mock data for CARS analytics
const mockPerformanceData: PerformanceDataPoint[] = [
  { name: 'Jan', score: 68, avgTime: 10.2 },
  { name: 'Feb', score: 72, avgTime: 9.8 },
  { name: 'Mar', score: 75, avgTime: 9.1 },
  { name: 'Apr', score: 79, avgTime: 8.3 },
  { name: 'May', score: 82, avgTime: 7.2 },
  { name: 'Jun', score: 84, avgTime: 5.9 },
  { name: 'Jul', score: 87, avgTime: 4.1 }
];

const mockFullLengthScoresData: FullLengthScore[] = [
  { name: 'FL 1', chem: 129, cars: 128, bio: 130, psych: 131 },
  { name: 'FL 2', chem: 130, cars: 129, bio: 131, psych: 132 },
  { name: 'FL 3', chem: 131, cars: 131, bio: 132, psych: 132 }
];

const mockDistractorAnalysisData: DistractorAnalysisPoint[] = [
  { 
    date: 'Jan 1', 
    correctAnswer: 50, 
    closeDistractor: 30, 
    unrelatedDistractor: 15, 
    oppositeDistractor: 5 
  },
  { 
    date: 'Jan 15', 
    correctAnswer: 55, 
    closeDistractor: 25, 
    unrelatedDistractor: 15, 
    oppositeDistractor: 5 
  },
  { 
    date: 'Feb 1', 
    correctAnswer: 60, 
    closeDistractor: 22, 
    unrelatedDistractor: 13, 
    oppositeDistractor: 5 
  },
  { 
    date: 'Feb 15', 
    correctAnswer: 65, 
    closeDistractor: 20, 
    unrelatedDistractor: 10, 
    oppositeDistractor: 5 
  },
  { 
    date: 'Mar 1', 
    correctAnswer: 70, 
    closeDistractor: 18, 
    unrelatedDistractor: 8, 
    oppositeDistractor: 4 
  }
];

const mockSubjectPerformanceData: SubjectPerformancePoint[] = [
  { 
    date: 'Jan', 
    humanities: 72, 
    socialSciences: 68, 
    naturalSciences: 75, 
    philosophy: 62 
  },
  { 
    date: 'Feb', 
    humanities: 74, 
    socialSciences: 70, 
    naturalSciences: 78, 
    philosophy: 65 
  },
  { 
    date: 'Mar', 
    humanities: 76, 
    socialSciences: 73, 
    naturalSciences: 80, 
    philosophy: 68 
  },
  { 
    date: 'Apr', 
    humanities: 78, 
    socialSciences: 75, 
    naturalSciences: 82, 
    philosophy: 70 
  }
];

const mockSkillsData: SkillDataPoint[] = [
  { month: 'Jan', criticalAnalysis: 70, readingComprehension: 65 },
  { month: 'Feb', criticalAnalysis: 72, readingComprehension: 69 },
  { month: 'Mar', criticalAnalysis: 75, readingComprehension: 72 },
  { month: 'Apr', criticalAnalysis: 78, readingComprehension: 76 },
  { month: 'May', criticalAnalysis: 82, readingComprehension: 80 },
  { month: 'Jun', criticalAnalysis: 85, readingComprehension: 83 },
  { month: 'Jul', criticalAnalysis: 87, readingComprehension: 89 }
];

const mockPassageTypePerformanceData: PassageTypePoint[] = [
  { name: 'Humanities', score: 85 },
  { name: 'Social Sciences', score: 78 },
  { name: 'Natural Sciences', score: 92 },
  { name: 'Philosophy', score: 76 },
  { name: 'Ethics', score: 88 }
];

const mockQuestionTypeData: QuestionTypePoint[] = [
  { name: 'Main Idea', value: 88 },
  { name: 'Detail', value: 75 },
  { name: 'Inference', value: 65 },
  { name: 'Reasoning', value: 82 },
  { name: 'Application', value: 70 }
];

const mockStudyTimeData: StudyTimePoint[] = [
  { name: 'Reading', value: 35 },
  { name: 'Practice Questions', value: 40 },
  { name: 'Review', value: 15 },
  { name: 'Full Passages', value: 10 }
];

const mockPracticeSessionsData: PracticeSessionPoint[] = [
  { date: 'Week 1', sessions: 3, avgScore: 65 },
  { date: 'Week 2', sessions: 4, avgScore: 68 },
  { date: 'Week 3', sessions: 5, avgScore: 72 },
  { date: 'Week 4', sessions: 4, avgScore: 75 },
  { date: 'Week 5', sessions: 6, avgScore: 78 },
  { date: 'Week 6', sessions: 7, avgScore: 82 },
  { date: 'Week 7', sessions: 8, avgScore: 85 },
  { date: 'Week 8', sessions: 7, avgScore: 88 }
];

const mockSkillsRadarData: SkillRadarPoint[] = [
  { subject: 'Reading Speed', A: 85, fullMark: 100 },
  { subject: 'Comprehension', A: 80, fullMark: 100 },
  { subject: 'Critical Analysis', A: 70, fullMark: 100 },
  { subject: 'Reasoning', A: 75, fullMark: 100 },
  { subject: 'Inference', A: 65, fullMark: 100 },
  { subject: 'Application', A: 72, fullMark: 100 },
];

const mockPassageCompletionData: PassageCompletionPoint[] = [
  { name: 'Passage 1', completion: 95, avgTime: 8.5 },
  { name: 'Passage 2', completion: 88, avgTime: 9.2 },
  { name: 'Passage 3', completion: 76, avgTime: 10.1 },
  { name: 'Passage 4', completion: 65, avgTime: 10.8 },
  { name: 'Passage 5', completion: 58, avgTime: 11.5 }
];

const mockQuestionBankData: QuestionBankData = {
  correctQuestions: 455,
  incorrectAnswers: 67,
  incompleteQuestions: 55,
  seenQuestions: 577,
  unseenQuestions: 423,
  totalQuestions: 1000,
  totalPossibleQuestions: 1500
};

export const useCarsAnalyticsStore = create<CarsAnalyticsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      performanceData: [],
      fullLengthScoresData: [],
      distractorAnalysisData: [],
      subjectPerformanceData: [],
      skillsData: [],
      passageTypePerformanceData: [],
      questionTypeData: [],
      studyTimeData: [],
      practiceSessionsData: [],
      skillsRadarData: [],
      passageCompletionData: [],
      questionBankData: {
        correctQuestions: 0,
        incorrectAnswers: 0,
        incompleteQuestions: 0,
        seenQuestions: 0,
        unseenQuestions: 0,
        totalQuestions: 0,
        totalPossibleQuestions: 0
      },
      selectedTimeRange: 'month',
      isLoading: false,
      error: null,

      // Fetch CARS analytics data
      fetchCarsAnalytics: async () => {
        const { isLoading, lastFetched, selectedTimeRange } = get();
        
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
          // const response = await apiClient.get(
          //   `${endpoints.analytics.progressChart}?timeRange=${selectedTimeRange}`
          // );
          // set({ 
          //   performanceData: response.data.performanceData,
          //   // ... other data fields
          //   isLoading: false,
          //   lastFetched: Date.now()
          // });
          
          // For development: Use mock data with a delay to simulate API call
          await new Promise(resolve => setTimeout(resolve, 600));
          
          set({ 
            performanceData: mockPerformanceData,
            fullLengthScoresData: mockFullLengthScoresData,
            distractorAnalysisData: mockDistractorAnalysisData,
            subjectPerformanceData: mockSubjectPerformanceData,
            skillsData: mockSkillsData,
            passageTypePerformanceData: mockPassageTypePerformanceData,
            questionTypeData: mockQuestionTypeData,
            studyTimeData: mockStudyTimeData,
            practiceSessionsData: mockPracticeSessionsData,
            skillsRadarData: mockSkillsRadarData,
            passageCompletionData: mockPassageCompletionData,
            questionBankData: mockQuestionBankData,
            isLoading: false,
            lastFetched: Date.now()
          });
        } catch (error: any) {
          console.error('Failed to fetch CARS analytics data:', error);
          
          // In development: Return mock data on error
          if (process.env.NODE_ENV === 'development') {
            set({ 
              performanceData: mockPerformanceData,
              fullLengthScoresData: mockFullLengthScoresData,
              distractorAnalysisData: mockDistractorAnalysisData,
              subjectPerformanceData: mockSubjectPerformanceData,
              skillsData: mockSkillsData,
              passageTypePerformanceData: mockPassageTypePerformanceData,
              questionTypeData: mockQuestionTypeData,
              studyTimeData: mockStudyTimeData,
              practiceSessionsData: mockPracticeSessionsData,
              skillsRadarData: mockSkillsRadarData,
              passageCompletionData: mockPassageCompletionData,
              questionBankData: mockQuestionBankData,
              isLoading: false,
              lastFetched: Date.now(),
              error: 'Using mock data (API error: ' + 
                (error.response?.data?.message || error.message) + ')'
            });
          } else {
            set({ 
              error: error.response?.data?.message || 'Failed to fetch CARS analytics data', 
              isLoading: false 
            });
          }
        }
      },

      // Set selected time range
      setSelectedTimeRange: (range) => {
        // Only refetch if the range has actually changed
        if (get().selectedTimeRange !== range) {
          set({ 
            selectedTimeRange: range,
            // Reset state to trigger a new fetch with the new time range
            performanceData: [],
            fullLengthScoresData: [],
            distractorAnalysisData: [],
            subjectPerformanceData: [],
            skillsData: [],
            passageTypePerformanceData: [],
            questionTypeData: [],
            studyTimeData: [],
            practiceSessionsData: [],
            skillsRadarData: [],
            passageCompletionData: []
          });
          
          // Fetch new data for the selected range
          get().fetchCarsAnalytics();
        }
      },

      // Clear error state
      clearError: () => {
        set({ error: null });
      },
      
      // Reset store state
      reset: () => {
        set({
          performanceData: [],
          fullLengthScoresData: [],
          distractorAnalysisData: [],
          subjectPerformanceData: [],
          skillsData: [],
          passageTypePerformanceData: [],
          questionTypeData: [],
          studyTimeData: [],
          practiceSessionsData: [],
          skillsRadarData: [],
          passageCompletionData: [],
          questionBankData: {
            correctQuestions: 0,
            incorrectAnswers: 0,
            incompleteQuestions: 0,
            seenQuestions: 0,
            unseenQuestions: 0,
            totalQuestions: 0,
            totalPossibleQuestions: 0
          },
          selectedTimeRange: 'month',
          isLoading: false,
          error: null,
          lastFetched: undefined
        });
      }
    }),
    {
      name: 'cars-analytics-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: CarsAnalyticsStore) => ({
        // Only persist these specific parts of the state
        performanceData: state.performanceData,
        fullLengthScoresData: state.fullLengthScoresData,
        distractorAnalysisData: state.distractorAnalysisData,
        subjectPerformanceData: state.subjectPerformanceData,
        skillsData: state.skillsData,
        passageTypePerformanceData: state.passageTypePerformanceData,
        questionTypeData: state.questionTypeData,
        studyTimeData: state.studyTimeData,
        practiceSessionsData: state.practiceSessionsData,
        skillsRadarData: state.skillsRadarData,
        passageCompletionData: state.passageCompletionData,
        questionBankData: state.questionBankData,
        selectedTimeRange: state.selectedTimeRange,
        lastFetched: state.lastFetched
      })
    }
  )
); 