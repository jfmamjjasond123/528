# Khan Academy Clone Refactoring Todo List

## Phase 1: Setup and Infrastructure (Foundational Work)

- [ ] **Create a component library structure**
  - [x] Set up a `/components/ui` directory for shared UI components
  - [ ] Define consistent prop interfaces for common components
  - [ ] Create documentation for component usage patterns

- [ ] **Establish data management patterns**
  - [ ] Create a `/lib/hooks` directory for custom data fetching hooks
  - [ ] Set up a `/data` directory for mock data
  - [ ] Implement a standard data fetching pattern with loading/error states

- [ ] **Define styling standards**
  - [ ] Create a style guide document
  - [ ] Extract common Tailwind patterns into custom classes in globals.css
  - [ ] Define color variables and spacing consistency rules

## Phase 2: Extract Shared Components

- [ ] **Data Visualization Components**
  - [ ] Extract `SemiCircleGauge` component
  - [ ] Extract `BellCurve` component
  - [ ] Create standardized chart components with consistent APIs
  - [ ] Build a `ProgressBar` component

- [ ] **UI Element Components**
  - [ ] Extract `TooltipElement` component
  - [ ] Create `ToggleSwitch` component
  - [ ] Build `TimeSettingRadio` component
  - [ ] Extract `Stepper` component
  - [ ] Create `FilterChip` component
  - [ ] Build `StatsCard` component

- [ ] **Layout Components**
  - [ ] Create `DashboardCard` component
  - [ ] Extract `TabbedInterface` component
  - [ ] Build `ExpandableSection` component
  - [ ] Create `PageHeader` component
  - [ ] Extract `FilterSidebar` component

- [ ] **Utility Functions**
  - [ ] Create date formatting utilities
  - [ ] Extract color utility functions
  - [ ] Build data transformation helpers

## Phase 3: Refactor Individual Pages

### Score Report Page (`score-report-qb/page.tsx`)

- [ ] Break down into smaller components:
  - [ ] Extract `ScoreOverview` component
  - [ ] Create `SubjectBreakdown` component
  - [ ] Extract `SkillsBreakdown` component
  - [ ] Create `TimeSpentSummary` component
  - [ ] Extract `DistractorAnalysis` component

- [ ] Improve state management:
  - [ ] Create custom hooks for chart animations
  - [ ] Implement context for shared state
  - [ ] Extract filter state management to custom hook

### Question Bank Page (`question-bank/page.tsx`)

- [ ] Extract UI components:
  - [ ] Move `InsightItem` to component library
  - [ ] Extract subject/filter selection components
  - [ ] Create `QuestionBankFilters` component

- [ ] Separate logic:
  - [ ] Create custom hooks for filter state
  - [ ] Extract subject filtering logic
  - [ ] Move insight selection logic to custom hook

### Analytics Page (`analytics/page.tsx`)

- [ ] Extract chart components:
  - [ ] Create `ScoreTrendsChart` component
  - [ ] Extract `PassageTypePerformance` component
  - [ ] Build `SkillsRadarChart` component
  - [ ] Create `StudyTimeDistribution` component

- [ ] Implement proper data management:
  - [ ] Create custom hook for time range filtering
  - [ ] Extract chart data transformation logic
  - [ ] Move mock data to separate files

### Course Contents Module Page (`course-contents/module/page.tsx`)

- [ ] Break down into focused components:
  - [ ] Extract `CourseHeader` component
  - [ ] Create `ModuleList` component
  - [ ] Build `LessonItem` component
  
- [ ] Separate data and logic:
  - [ ] Move course data to separate file
  - [ ] Extract module expansion logic to custom hook
  - [ ] Create utility functions for progress calculations

### Full Lengths Page (`full-lengths/page.tsx`)

- [ ] Extract components:
  - [ ] Create `ExamCard` component
  - [ ] Extract `AttemptTabs` component
  - [ ] Build `ScoreDisplay` component

- [ ] Improve data handling:
  - [ ] Move mock data to separate file
  - [ ] Create custom hooks for attempts management
  - [ ] Extract date formatting to utility functions

### Main Dashboard Page (`page.tsx`)

- [ ] Extract components:
  - [ ] Create `WelcomeSection` component
  - [ ] Extract `CourseCard` component
  - [ ] Move calendar integration to separate component

- [ ] Organize data:
  - [ ] Move mock course data to separate file
  - [ ] Create data fetching hooks

## Phase 4: Performance Optimization

- [ ] **Implement Memoization**
  - [ ] Add useMemo for expensive calculations
  - [ ] Use React.memo for pure components
  - [ ] Implement useCallback for event handlers

- [ ] **Optimize Rendering**
  - [ ] Use windowing for long lists (react-window)
  - [ ] Implement lazy loading for charts and complex components
  - [ ] Add skeleton loaders for async content

- [ ] **Code Splitting**
  - [ ] Implement dynamic imports for large components
  - [ ] Set up route-based code splitting

## Phase 5: Testing and Documentation

- [ ] **Component Testing**
  - [ ] Write tests for shared UI components
  - [ ] Create integration tests for complex pages
  - [ ] Implement snapshot testing

- [ ] **Documentation**
  - [ ] Document component usage patterns
  - [ ] Create developer guides for common patterns
  - [ ] Update README with refactoring changes

- [ ] **Final Cleanup**
  - [ ] Remove unused code and dependencies
  - [ ] Standardize naming conventions
  - [ ] Run linting and fix issues


## Phase 7: Backend Integration Readiness

- [ ] **State Management Infrastructure** - Moving from local component state to a centralized solution that can handle API data
  - [X] Implement centralized state management solution (Zustand)
  - [X] Create domain-specific stores (userStore, courseStore, progressStore)
  - [-] Convert mock data to use the state management layer
  - [X] Add proper state persistence with localStorage where appropriate

- [ ] **API Integration Architecture** - Creating a consistent data fetching strategy with proper caching and synchronization
  - [ ] Create a dedicated API client layer (`/lib/api`) with standardized methods
  - [ ] Implement React Query or SWR for data fetching, caching, and synchronization
  - [ ] Define TypeScript interfaces that align with API contracts
  - [ ] Create service adapters that map between API responses and component props

- [ ] **Form Handling & Validation** - Standardizing form management with proper validation and error handling
  - [ ] Standardize on React Hook Form or Formik for all forms
  - [ ] Implement Zod or Yup schemas for validation
  - [ ] Create reusable form components with built-in validation
  - [ ] Add proper error handling for form submissions

- [ ] **Authentication & Authorization** - Implementing secure authentication flows and protected routes
  - [ ] Implement token-based authentication flow with refresh tokens
  - [ ] Create protected route wrappers for authenticated content
  - [ ] Add user context provider with role-based authorization
  - [ ] Implement auth state persistence

- [ ] **Error Handling Strategy** - Creating a comprehensive approach to handle different types of errors
  - [ ] Create global error boundary for unexpected errors
  - [ ] Implement standardized error UI components for different error types
  - [ ] Add error logging service integration
  - [ ] Build retry mechanisms for network failures

- [ ] **Loading States and Feedback** - Providing consistent user feedback for asynchronous operations
  - [ ] Create consistent loading indicators for async operations
  - [ ] Implement skeleton screens for initial data loads
  - [ ] Add toast notifications for user actions
  - [ ] Create empty states for zero-data scenarios

- [ ] **Production Environment Configuration** - Setting up the application for different deployment environments
  - [ ] Set up environment variables for different deployment environments
  - [ ] Configure proper CSP (Content Security Policy)
  - [ ] Implement proper API URL handling for different environments
  - [ ] Create build optimization settings for production 