# Store Architecture Documentation

## Overview

This folder contains the state management implementation for the Khan Academy Clone application using Zustand. The architecture is designed to be scalable, maintainable, and optimized for production use.

## Design Principles

1. **Separation of Concerns**: Each store is responsible for a single domain (users, courses, analytics).
2. **Type Safety**: All store states and actions are fully typed.
3. **Persistence**: Store data is persisted appropriately to localStorage.
4. **API Integration**: Centralized API client for consistent data fetching.
5. **Optimistic Updates**: UI updates happen immediately, with rollback on error.
6. **Caching**: Smart data fetching with time-based cache invalidation.
7. **Testability**: All stores are designed to be easily testable.

## File Structure

```
/lib
  /api
    client.ts         # Centralized Axios client with interceptors
  /stores
    index.ts          # Entry point exporting all stores
    types.ts          # Shared types for stores
    useUserStore.ts   # Authentication and user management
    useCourseStore.ts # Course data management
    useAnalyticsStore.ts # Analytics data management
    StoreProvider.tsx # Provider for store context & hydration
    README.md         # This documentation
```

## Store Pattern

Each store follows this pattern:

1. **State Definitions**: Define TypeScript interfaces for the store state.
2. **Action Definitions**: Define TypeScript interfaces for all store actions.
3. **Initial State**: Set reasonable defaults.
4. **API Integration**: Use the centralized API client for data fetching.
5. **Optimistic Updates**: Immediately update UI, then confirm with API.
6. **Error Handling**: Proper error state management with rollback capability.
7. **Persistence**: Configure appropriate persistence with partializing.

## Best Practices

### Creating a New Store

1. Create a new file named `use[Domain]Store.ts`.
2. Define state and action interfaces in `types.ts`.
3. Implement using the pattern above.
4. Export the store from `index.ts`.

### Using Stores in Components

```tsx
import { useUserStore } from '@/app/lib/stores';

function ProfileComponent() {
  const { user, updateProfile, isLoading } = useUserStore();
  
  // Use the store data and actions
}
```

### Hydration-Safe Store Access

When working with SSR, use the hydration-safe selectors:

```tsx
import { createHydrationSafeSelector, useUserStore } from '@/app/lib/stores';

// Create a selector with a fallback value
const useUsername = createHydrationSafeSelector(
  useUserStore,
  (state) => state.user?.name,
  'Guest'
);

function WelcomeMessage() {
  const username = useUsername();
  return <h1>Welcome, {username}!</h1>;
}
```

### Testing Stores

Each store can be tested using Jest:

```tsx
// Example test for useUserStore
import { renderHook, act } from '@testing-library/react';
import { useUserStore } from '@/app/lib/stores';

describe('useUserStore', () => {
  beforeEach(() => {
    act(() => {
      useUserStore.getState().reset();
    });
  });
  
  it('should update user profile', async () => {
    // Test implementation
  });
});
```

## Store Reset Pattern

All stores implement a `reset()` method that clears all state. This is used:

1. On logout
2. When authentication fails
3. In tests to ensure a clean state

```tsx
const logout = async () => {
  // Call API to logout
  userStore.getState().reset();
  courseStore.getState().reset();
  analyticsStore.getState().reset();
};
```

## API Integration

All API calls are made through the centralized API client:

```tsx
import apiClient, { endpoints } from '@/app/lib/api/client';

const fetchUser = async () => {
  try {
    const response = await apiClient.get(endpoints.users.me);
    set({ user: response.data });
  } catch (error) {
    // Handle error
  }
};
```

## Caching Strategy

Stores implement a time-based caching strategy:

1. Track `lastFetched` timestamp for each data fetch
2. Skip redundant fetches if data was recently loaded
3. Force refetch when explicit refresh is requested

```tsx
// Skip if we have recent data (within last 5 minutes)
const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
if (data && lastFetched && lastFetched > fiveMinutesAgo) {
  return;
}
```

## Contributing Guidelines

When modifying stores:

1. Maintain type safety
2. Implement tests for new functionality
3. Document public API changes
4. Ensure proper error handling
5. Follow optimistic update pattern for user actions
6. Implement proper caching strategy
7. Use the centralized API client 