import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';

/**
 * Options for creating a persisted store
 */
export type StorePersistOptions<T, U> = Omit<PersistOptions<T, U>, 'storage'> & {
  skipHydration?: boolean;
};

/**
 * Creates a Zustand store with localStorage persistence using best practices
 * @param stateCreator - The state creator function
 * @param persistOptions - Options for store persistence, including partialize
 * @returns A Zustand store with persistence
 */
export function createPersistedStore<T, U = T>(
  stateCreator: StateCreator<T>,
  persistOptions: StorePersistOptions<T, U>
) {
  return create<T>()(
    persist(stateCreator, {
      ...persistOptions,
      storage: createJSONStorage(() => localStorage),
    })
  );
}

/**
 * Creates a selector that is safe to use during server-side rendering
 * by providing a fallback value until hydration is complete
 * 
 * @param useStore - The store hook
 * @param selector - The selector function
 * @param fallback - Fallback value to use before hydration
 * @returns A function that selects from store safely
 */
export function createHydrationSafeSelector<T, R>(
  useStore: () => T,
  selector: (state: T) => R,
  fallback: R
): (isHydrated: boolean) => R {
  return (isHydrated: boolean) => {
    const state = useStore();
    
    if (!isHydrated) {
      return fallback;
    }
    
    return selector(state);
  };
}

/**
 * Gets current timestamp for freshness checks
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Checks if data is stale based on last fetched timestamp
 * @param lastFetched - When data was last fetched
 * @param staleTreshold - Threshold in milliseconds (default: 5 minutes)
 * @returns Whether data is stale and needs refreshing
 */
export function isDataStale(
  lastFetched?: number,
  staleThreshold: number = 5 * 60 * 1000
): boolean {
  if (!lastFetched) return true;
  
  return Date.now() - lastFetched > staleThreshold;
} 