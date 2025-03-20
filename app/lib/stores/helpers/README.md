# State Persistence with localStorage

This directory contains helper functions for implementing proper state persistence with localStorage in our Zustand stores. These helpers ensure consistency, type safety, and optimal performance across our application.

## Overview

State persistence allows our application to:

1. **Preserve User State**: Maintain user settings and preferences between browser sessions
2. **Improve Performance**: Reduce unnecessary API calls by caching data
3. **Support Offline Capabilities**: Allow basic functionality when offline
4. **Enhance User Experience**: Show cached data immediately while fresh data loads

## Implementation

### Core Helper Functions

- `createPersistedStore`: Creates a Zustand store with type-safe localStorage persistence
- `isDataStale`: Checks if stored data needs refreshing based on timestamps
- `createHydrationSafeSelector`: Creates selectors that handle SSR/hydration safely

### Usage Example

```typescript
import { StateCreator } from 'zustand';
import { createPersistedStore } from './helpers/createPersistedStore';

// Define your store state and actions
interface MyStore {
  data: any;
  isLoading: boolean;
  error: string | null;
  lastFetched?: number;
  
  fetchData: () => Promise<void>;
  // ... other actions
}

// Define what should be persisted
type PersistedMyState = Pick<MyStore, 'data' | 'lastFetched'>;

// Create your store
const createMyStore: StateCreator<MyStore> = (set, get) => ({
  // Initial state
  data: null,
  isLoading: false,
  error: null,
  
  // Actions
  fetchData: async () => {
    // Implementation
  },
  // ... other actions
});

// Create the persisted store
export const useMyStore = createPersistedStore<MyStore, PersistedMyState>(
  createMyStore,
  {
    name: 'my-storage', // Unique name for localStorage
    version: 1, // Useful for migrations
    partialize: (state) => ({
      data: state.data,
      lastFetched: state.lastFetched
      // Don't persist loading states, errors, or functions
    })
  }
);
```

## Best Practices

### 1. Only Persist Necessary Data

- Use `partialize` to select what to persist
- Never persist loading states, error messages, or functions
- Only persist the minimum data needed for app functionality

### 2. Version Control

- Add version numbers to handle breaking changes in state structure
- Implement migrations when your state structure changes significantly

### 3. Timestamp Management

- Store when data was last fetched/updated to know when to refresh
- Use the `isDataStale` helper to check if data needs refreshing

### 4. Hydration Handling

- Use hydration-safe selectors to avoid mismatches during SSR
- Track hydration state in your application

### 5. Storage Size Management

- localStorage is limited to ~5MB, so be mindful of data size
- Consider using compression for large data

### 6. Multi-Tab Synchronization

- Add storage event listeners to sync state between tabs
- Update your stores when storage changes are detected

## Common Issues & Solutions

### SSR Hydration Mismatches

Problem: Server renders with empty state, then client hydrates with localStorage data
Solution: Use the `isHydrated` flag and conditional rendering

### Storage Limits

Problem: localStorage has ~5MB limit
Solution: Only store essential data and consider compression/pagination

### Stale Data

Problem: Cached data becomes outdated
Solution: Use timestamps and the `isDataStale` helper to refresh when needed 