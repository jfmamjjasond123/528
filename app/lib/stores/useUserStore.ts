'use client';

import { StateCreator } from 'zustand';
import { AuthState, User } from './types';
import apiClient, { endpoints } from '../api/client';
import { createPersistedStore } from './helpers/createPersistedStore';

// Define user store state and actions
interface UserStore extends AuthState {
  // Authentication actions
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
  
  // User profile actions
  fetchUser: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  
  // State management actions
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

// Type for persisted state (subset of UserStore)
type PersistedUserState = Pick<
  UserStore,
  'user' | 'isAuthenticated' | 'accessToken' | 'refreshTokenValue' | 'tokenExpiry'
>;

// Mock user for development fallback
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/avatars/default.png',
  role: 'student'
};

// Create the user store state creator
const createUserStore: StateCreator<UserStore> = (set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  accessToken: undefined,
  refreshTokenValue: undefined,
  tokenExpiry: undefined,

  // Authentication actions
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post(endpoints.auth.login, { email, password });
      
      const { user, token, refreshToken, expiresAt } = response.data;
      
      // Store token in localStorage for the interceptor to use
      localStorage.setItem('auth-token', token);
      
      set({ 
        user, 
        isAuthenticated: true,
        accessToken: token,
        refreshTokenValue: refreshToken,
        tokenExpiry: expiresAt,
        isLoading: false,
        lastFetched: Date.now(),
      });
    } catch (error: any) {
      console.error('Login error:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to login', 
        isLoading: false 
      });
    }
  },

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post(endpoints.auth.register, { 
        name, 
        email, 
        password 
      });
      
      const { user, token, refreshToken, expiresAt } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('auth-token', token);
      
      set({ 
        user, 
        isAuthenticated: true,
        accessToken: token,
        refreshTokenValue: refreshToken,
        tokenExpiry: expiresAt,
        isLoading: false,
        lastFetched: Date.now(),
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to signup', 
        isLoading: false 
      });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // Call logout endpoint if user is authenticated
      if (get().isAuthenticated) {
        await apiClient.post(endpoints.auth.logout);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state regardless of API success
      localStorage.removeItem('auth-token');
      get().reset();
      set({ isLoading: false });
    }
  },

  checkAuthStatus: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get(endpoints.auth.verify);
      
      if (response.data.authenticated) {
        set({ 
          isAuthenticated: true,
          user: response.data.user,
          isLoading: false,
          lastFetched: Date.now(),
        });
        return true;
      } else {
        // Token is invalid
        localStorage.removeItem('auth-token');
        get().reset();
        return false;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('auth-token');
      get().reset();
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  refreshToken: async () => {
    try {
      // Use the refresh token to get a new access token
      const refreshTokenVal = get().refreshTokenValue;
      if (!refreshTokenVal) {
        throw new Error('No refresh token available');
      }
      
      const response = await apiClient.post(endpoints.auth.refreshToken, {
        refreshToken: refreshTokenVal
      });
      
      const { token, refreshToken: newRefreshToken, expiresAt } = response.data;
      
      localStorage.setItem('auth-token', token);
      
      set({
        accessToken: token,
        refreshTokenValue: newRefreshToken,
        tokenExpiry: expiresAt,
      });
      
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      get().logout();
      return false;
    }
  },

  fetchUser: async () => {
    const { isLoading, user, lastFetched } = get();
    
    // Skip if already loading
    if (isLoading) return;
    
    // Skip if we already have recent user data (within last 5 minutes)
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    if (user && lastFetched && lastFetched > fiveMinutesAgo) {
      return;
    }
    
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get(endpoints.users.me);
      
      set({ 
        user: response.data, 
        isAuthenticated: true, 
        isLoading: false,
        lastFetched: Date.now(),
      });
    } catch (error: any) {
      console.error('Fetch user error:', error);
      
      // If it's an auth error, log user out
      if (error.response?.status === 401) {
        get().logout();
      }
      
      set({ 
        error: error.response?.data?.message || 'Failed to fetch user', 
        isLoading: false 
      });
    }
  },

  updateProfile: async (userData: Partial<User>) => {
    // Save current user for rollback if needed
    const currentUser = get().user;
    
    // Optimistically update the UI
    if (currentUser) {
      set({ 
        user: { ...currentUser, ...userData },
        isLoading: true, 
        error: null 
      });
    }
    
    try {
      const response = await apiClient.patch(endpoints.users.update, userData);
      
      set({ 
        user: response.data,
        isLoading: false,
        lastFetched: Date.now(),
      });
    } catch (error: any) {
      console.error('Update profile error:', error);
      
      // Rollback to previous state on error
      set({ 
        user: currentUser,
        error: error.response?.data?.message || 'Failed to update profile', 
        isLoading: false 
      });
    }
  },

  // State management actions
  setLoading: (status: boolean) => set({ isLoading: status }),
  
  setError: (error: string | null) => set({ error }),
  
  clearError: () => set({ error: null }),
  
  reset: () => set({
    user: null,
    isAuthenticated: false,
    error: null,
    accessToken: undefined,
    refreshTokenValue: undefined,
    tokenExpiry: undefined,
    lastFetched: undefined,
  }),
});

// Create the persisted store with type-safe partialize
export const useUserStore = createPersistedStore<UserStore, PersistedUserState>(
  createUserStore,
  {
    name: 'user-storage', // unique name for localStorage
    version: 1, // Add version control for future state structure changes
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      accessToken: state.accessToken,
      refreshTokenValue: state.refreshTokenValue, 
      tokenExpiry: state.tokenExpiry,
    })
  }
); 