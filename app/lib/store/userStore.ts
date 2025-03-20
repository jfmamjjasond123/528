import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '@/app/components/settings/types';

interface UserState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  updateUser: (userData: Partial<UserProfile>) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

// Mock default user data for development
const defaultUser: UserProfile = {
  id: '12345',
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  bio: 'Passionate learner who loves mathematics and coding. Currently studying computer science and exploring machine learning.',
  avatar: 'https://i.pravatar.cc/300',
  joinDate: '2022-03-15',
  role: 'student',
  location: 'San Francisco, CA',
  website: 'https://johndoe.example.com',
  socialMedia: {
    twitter: 'johndoe',
    linkedin: 'johndoe',
    github: 'johndoe',
  },
  badges: [],
  skills: []
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: defaultUser, // Use null in production, defaultUser is for demo
      isAuthenticated: true, // Set to false in production
      isLoading: false,
      error: null,
      
      updateUser: (userData: Partial<UserProfile>) => set((state: UserState) => ({
        user: state.user ? { ...state.user, ...userData } : null,
      })),
      
      setAuthenticated: (status: boolean) => set(() => ({
        isAuthenticated: status,
      })),
      
      setLoading: (status: boolean) => set(() => ({
        isLoading: status,
      })),
      
      setError: (error: string | null) => set(() => ({
        error,
      })),
      
      logout: () => set(() => ({
        user: null,
        isAuthenticated: false,
      })),
    }),
    {
      name: 'user-storage',
      // Only persist these fields
      partialize: (state: UserState) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 