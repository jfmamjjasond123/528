'use client';

import React, { createContext, useContext, useRef, useEffect } from 'react';
import { useUserStore } from './useUserStore';
import { useCourseStore } from './useCourseStore';
import { useAnalyticsStore } from './useAnalyticsStore';
import { useTestTimeStore } from './useTestTimeStore';
import { useCarsAnalyticsStore } from './useCarsAnalyticsStore';
import { isDataStale } from './helpers/createPersistedStore';

// Create a context for the stores
interface StoreContextType {
  userStore: ReturnType<typeof useUserStore>;
  courseStore: ReturnType<typeof useCourseStore>;
  analyticsStore: ReturnType<typeof useAnalyticsStore>;
  testTimeStore: ReturnType<typeof useTestTimeStore>;
  carsAnalyticsStore: ReturnType<typeof useCarsAnalyticsStore>;
  isHydrated: boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

/**
 * A provider component that makes the stores available to any child component via useStores() hook.
 * Handles store initialization and hydration.
 */
export function StoreProvider({ 
  children,
  initialUserData,
  initialCourseData,
  initialAnalyticsData
}: { 
  children: React.ReactNode;
  initialUserData?: any;
  initialCourseData?: any;
  initialAnalyticsData?: any;
}) {
  // Get the stores
  const userStoreRef = useRef(useUserStore);
  const courseStoreRef = useRef(useCourseStore);
  const analyticsStoreRef = useRef(useAnalyticsStore);
  const testTimeStoreRef = useRef(useTestTimeStore);
  const carsAnalyticsStoreRef = useRef(useCarsAnalyticsStore);
  
  // Track hydration status
  const [isHydrated, setIsHydrated] = React.useState(false);
  
  // Initialize stores with server-side data if available
  useEffect(() => {
    // Handle hydration - this runs client-side after the component mounts
    setIsHydrated(true);
    
    // Check authentication and load initial data
    const initializeStores = async () => {
      // Check if user is authenticated
      const userState = userStoreRef.current.getState();
      const isAuthenticated = await userState.checkAuthStatus();
      
      if (isAuthenticated) {
        // Check if course data needs refreshing
        const courseState = courseStoreRef.current.getState();
        if (isDataStale(courseState.lastFetched)) {
          courseStoreRef.current.getState().fetchCourses();
        }
        
        // Check if analytics data needs refreshing
        const analyticsState = analyticsStoreRef.current.getState();
        if (isDataStale(analyticsState.lastFetched)) {
          analyticsStoreRef.current.getState().fetchAnalytics();
        }
        
        // Check if test time data needs refreshing
        const testTimeState = testTimeStoreRef.current.getState();
        if (isDataStale(testTimeState.lastFetched)) {
          testTimeStoreRef.current.getState().fetchTestTimeData();
        }
        
        // Check if CARS analytics data needs refreshing
        const carsAnalyticsState = carsAnalyticsStoreRef.current.getState();
        if (isDataStale(carsAnalyticsState.lastFetched)) {
          carsAnalyticsStoreRef.current.getState().fetchCarsAnalytics();
        }
      } else if (initialUserData) {
        // If we have SSR data but no auth, we can still use the initial data
        userStoreRef.current.setState({ 
          user: initialUserData,
          isLoading: false 
        });
      }
    };
    
    initializeStores();
    
    // Add listener for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      // Check for changes in any of our stores
      if (e.key && e.newValue !== e.oldValue) {
        const storeMap: Record<string, () => void> = {
          'user-storage': () => userStoreRef.current.getState().checkAuthStatus(),
          'course-storage': () => courseStoreRef.current.getState().fetchCourses(),
          'analytics-storage': () => analyticsStoreRef.current.getState().fetchAnalytics(),
          'test-time-storage': () => testTimeStoreRef.current.getState().fetchTestTimeData(),
          'cars-analytics-storage': () => carsAnalyticsStoreRef.current.getState().fetchCarsAnalytics()
        };
        
        // Refresh the appropriate store if it changed
        if (e.key in storeMap) {
          storeMap[e.key]();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [initialUserData, initialCourseData, initialAnalyticsData]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => {
    return {
      userStore: userStoreRef.current,
      courseStore: courseStoreRef.current,
      analyticsStore: analyticsStoreRef.current,
      testTimeStore: testTimeStoreRef.current,
      carsAnalyticsStore: carsAnalyticsStoreRef.current,
      isHydrated
    };
  }, [isHydrated]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

/**
 * A custom hook to access the stores from any component.
 * This is useful when you need to access multiple stores in a component.
 */
export function useStores() {
  const stores = useContext(StoreContext);
  if (!stores) {
    throw new Error('useStores must be used within a StoreProvider');
  }
  return stores;
}

/**
 * Helper hooks to access individual stores more easily
 */
export function useUserStoreContext() {
  const { userStore, isHydrated } = useStores();
  return { store: userStore, isHydrated };
}

export function useCourseStoreContext() {
  const { courseStore, isHydrated } = useStores();
  return { store: courseStore, isHydrated };
}

export function useAnalyticsStoreContext() {
  const { analyticsStore, isHydrated } = useStores();
  return { store: analyticsStore, isHydrated };
}

export function useTestTimeStoreContext() {
  const { testTimeStore, isHydrated } = useStores();
  return { store: testTimeStore, isHydrated };
}

export function useCarsAnalyticsStoreContext() {
  const { carsAnalyticsStore, isHydrated } = useStores();
  return { store: carsAnalyticsStore, isHydrated };
}

/**
 * Helper to create a hydration-safe selector
 * This ensures we don't access the store state during SSR
 */
export function createHydrationSafeSelector<T, R>(
  useStore: () => T,
  selector: (state: T) => R,
  fallback: R
): () => R {
  return () => {
    const { isHydrated } = useStores();
    const state = useStore();
    
    if (!isHydrated) {
      return fallback;
    }
    
    return selector(state);
  };
} 