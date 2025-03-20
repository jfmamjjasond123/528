import { renderHook, act } from '@testing-library/react';
import { useUserStore } from '../../app/lib/stores/useUserStore';
import apiClient from '../../app/lib/api/client';

// Mock the API client
jest.mock('../../app/lib/api/client', () => ({
  post: jest.fn(),
  get: jest.fn(),
  patch: jest.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useUserStore', () => {
  beforeEach(() => {
    // Clear the store state before each test
    act(() => {
      useUserStore.getState().reset();
    });
    
    // Clear mock calls
    jest.clearAllMocks();
    
    // Clear localStorage
    localStorageMock.clear();
  });
  
  describe('login', () => {
    it('should set user and isAuthenticated on successful login', async () => {
      // Mock the API response
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'student' };
      const mockToken = 'mock-token';
      
      (apiClient.post as jest.Mock).mockResolvedValueOnce({
        data: { 
          user: mockUser, 
          token: mockToken,
          refreshToken: 'refresh-token',
          expiresAt: 3600
        }
      });
      
      // Use the hook
      const { result } = renderHook(() => useUserStore());
      
      // Initial state should be empty
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
      
      // Login
      await act(async () => {
        await result.current.login('test@example.com', 'password');
      });
      
      // Check that the API was called correctly
      expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com', 
        password: 'password'
      });
      
      // Check that the state was updated
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(localStorageMock.getItem('auth-token')).toBe(mockToken);
    });
    
    it('should set error on failed login', async () => {
      // Mock a failed API call
      const errorMessage = 'Invalid credentials';
      (apiClient.post as jest.Mock).mockRejectedValueOnce({
        response: { data: { message: errorMessage } }
      });
      
      // Use the hook
      const { result } = renderHook(() => useUserStore());
      
      // Initial state should be empty
      expect(result.current.error).toBeNull();
      
      // Login with invalid credentials
      await act(async () => {
        await result.current.login('test@example.com', 'wrong-password');
      });
      
      // Check that error state was set
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });
  
  describe('logout', () => {
    it('should clear user state and localStorage on logout', async () => {
      // Setup initial authenticated state
      act(() => {
        useUserStore.setState({
          user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'student' },
          isAuthenticated: true,
        });
        localStorageMock.setItem('auth-token', 'test-token');
      });
      
      // Use the hook
      const { result } = renderHook(() => useUserStore());
      
      // Check initial state is authenticated
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).not.toBeNull();
      expect(localStorageMock.getItem('auth-token')).toBe('test-token');
      
      // Logout
      await act(async () => {
        await result.current.logout();
      });
      
      // API should be called
      expect(apiClient.post).toHaveBeenCalledWith('/auth/logout');
      
      // State should be reset
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(localStorageMock.getItem('auth-token')).toBeNull();
    });
  });
  
  describe('updateProfile', () => {
    it('should update user profile optimistically and then with API response', async () => {
      // Setup initial user
      const initialUser = { 
        id: '1', 
        name: 'Test User', 
        email: 'test@example.com', 
        role: 'student' as const
      };
      
      act(() => {
        useUserStore.setState({
          user: initialUser,
          isAuthenticated: true,
        });
      });
      
      // Mock the API response (with a delay to test optimistic update)
      const updatedUser = { ...initialUser, name: 'Updated Name' };
      (apiClient.patch as jest.Mock).mockImplementation(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ data: updatedUser });
          }, 100);
        });
      });
      
      // Use the hook
      const { result } = renderHook(() => useUserStore());
      
      // Update profile
      let updatePromise: Promise<void>;
      act(() => {
        updatePromise = result.current.updateProfile({ name: 'Updated Name' });
      });
      
      // Check optimistic update - this should happen immediately
      expect(result.current.user?.name).toBe('Updated Name');
      expect(result.current.isLoading).toBe(true);
      
      // Wait for the API call to resolve
      await act(async () => {
        await updatePromise;
      });
      
      // Check that API was called correctly
      expect(apiClient.patch).toHaveBeenCalledWith('/users/me', { name: 'Updated Name' });
      
      // Final state should match API response
      expect(result.current.user).toEqual(updatedUser);
      expect(result.current.isLoading).toBe(false);
    });
    
    it('should revert to previous state if update fails', async () => {
      // Setup initial user
      const initialUser = { 
        id: '1', 
        name: 'Test User', 
        email: 'test@example.com', 
        role: 'student' as const
      };
      
      act(() => {
        useUserStore.setState({
          user: initialUser,
          isAuthenticated: true,
        });
      });
      
      // Mock a failed API call
      const errorMessage = 'Update failed';
      (apiClient.patch as jest.Mock).mockRejectedValueOnce({
        response: { data: { message: errorMessage } }
      });
      
      // Use the hook
      const { result } = renderHook(() => useUserStore());
      
      // Update profile (will fail)
      await act(async () => {
        await result.current.updateProfile({ name: 'This will fail' });
      });
      
      // State should be reverted to initial
      expect(result.current.user).toEqual(initialUser);
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.isLoading).toBe(false);
    });
  });
}); 