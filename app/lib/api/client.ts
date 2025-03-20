/**
 * Centralized API client using Axios
 * Handles common configuration, authentication, and error handling
 */
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Base API client configuration
 */
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Request interceptor
 * - Adds authentication token from localStorage
 * - Handles request configuration
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Only attach token in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * - Handles common response processing
 * - Processes errors (authentication, validation, server)
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // Handle expired tokens
    if (error.response?.status === 401) {
      // Clear invalid tokens
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
      }
      
      // You could potentially add token refresh logic here
      // If refresh fails, redirect to login
      window.location.href = '/authentication/sign-in';
    }
    
    // Handle validation errors (usually 422)
    if (error.response?.status === 422) {
      // You might want to transform the validation errors into a more usable format
      const validationErrors = error.response.data;
      console.error('Validation errors:', validationErrors);
    }
    
    // Handle server errors
    if (error.response?.status && error.response.status >= 500) {
      console.error('Server error:', error.response.data);
      // Could trigger a notification or error tracking service here
    }
    
    return Promise.reject(error);
  }
);

/**
 * API endpoints as a centralized configuration
 * This makes it easier to change endpoints in one place
 */
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    verify: '/auth/verify',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    refreshToken: '/auth/refresh-token',
  },
  users: {
    me: '/users/me',
    update: '/users/me',
    settings: '/users/me/settings',
  },
  courses: {
    list: '/courses',
    details: (id: string | number) => `/courses/${id}`,
    enroll: (id: string | number) => `/courses/${id}/enroll`,
    progress: (id: string | number) => `/courses/${id}/progress`,
    lessons: (id: string | number) => `/courses/${id}/lessons`,
  },
  analytics: {
    summary: '/analytics/summary',
    testTime: '/analytics/test-time',
    progressChart: '/analytics/progress-chart',
    activityLog: '/analytics/activity-log',
  },
  calendar: {
    events: '/calendar/events',
    event: (id: string | number) => `/calendar/events/${id}`,
  }
};

export default apiClient; 