# LMS Restructuring TO-DO

## Overview
This document outlines the necessary changes to restructure our LMS to support dynamic page creation from the admin panel. The current implementation has specific hardcoded components for MCAT CARS content, which limits our ability to easily create new course types and lessons.

## Goals
- Create a template-based system for courses and lessons
- Implement dynamic content rendering from data sources
- Enhance the admin interface to support template selection and content creation
- Establish a consistent routing pattern throughout the application

## High Priority Tasks

### 1. Create Template-Based Layout System
- [ ] Create base `CourseTemplate` component with common layout elements
- [ ] Implement specialized course templates:
  - [ ] `DefaultCourseTemplate.tsx` for standard courses
  - [ ] `ReadingCourseTemplate.tsx` for text-heavy courses (like CARS)
  - [ ] `PracticeTestTemplate.tsx` for practice test courses
  - [ ] `VideoLectureTemplate.tsx` for video-based courses
- [ ] Create base `LessonTemplate` component with common layout elements
- [ ] Implement specialized lesson templates:
  - [ ] `DefaultLessonTemplate.tsx`
  - [ ] `ReadingLessonTemplate.tsx`
  - [ ] `VideoLessonTemplate.tsx`
  - [ ] `QuizLessonTemplate.tsx`

### 2. Design Content Schema
- [ ] Define course schema with properties for different course types
- [ ] Define lesson schema with properties for different lesson types
- [ ] Create content block schema (text, image, video, interactive elements)
- [ ] Establish relationships between courses, lessons, and content blocks

## Medium Priority Tasks

### 3. Implement Dynamic Content Loading
- [ ] Create service layer for fetching course data
- [ ] Create service layer for fetching lesson data
- [ ] Implement dynamic template selection based on content type
- [ ] Refactor course and lesson pages to use dynamic content loading

### 4. Enhance Admin Interface
- [ ] Update course creation form to allow template selection
- [ ] Create specialized editing interfaces for different content types
- [ ] Implement content preview functionality
- [ ] Add functionality to manage content blocks within lessons

### 5. Standardize Routing Structure
- [ ] Refactor all routes to use dynamic patterns:
  - [ ] `/dashboard/courses/[courseId]`
  - [ ] `/dashboard/courses/[courseId]/lessons/[lessonId]`
- [ ] Create fallback/404 handling for invalid course/lesson IDs
- [ ] Update navigation components to work with dynamic routes

## Low Priority Tasks

### 6. Add Content Management Features
- [ ] Implement course publishing workflow (draft/published states)
- [ ] Add content versioning
- [ ] Create content duplication functionality
- [ ] Add batch operations for content management

### 7. Performance Optimizations
- [ ] Implement lazy loading for course content
- [ ] Add caching for frequently accessed course data
- [ ] Optimize image and media loading in templates

## Implementation Phases

### Phase 1: Foundation
- Create template system
- Design content schema
- Proof of concept implementation with one course type

### Phase 2: Core Functionality
- Complete dynamic content loading
- Basic admin interface enhancements
- Standardize routing

### Phase 3: Polish and Optimization
- Additional content management features
- Performance optimizations
- Testing and refinement

## Migration Strategy
1. Start by implementing the new structure alongside the existing code
2. Create templates based on the current MCAT CARS implementation
3. Gradually migrate existing content to the new system
4. Once all content is migrated, remove the old hardcoded components

## Notes
- Maintain backward compatibility during development
- Consider A/B testing the new interface with a subset of users
- Document the new system thoroughly for future developers 