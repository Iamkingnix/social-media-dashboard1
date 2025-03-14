import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Implement actual API call here
          const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          set({ user: data.user, token: data.token, isLoading: false });
        } catch (error) {
          set({ error: 'Login failed', isLoading: false });
        }
      },

      signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
          // Implement actual API call here
          const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
          });
          const data = await response.json();
          set({ user: data.user, token: data.token, isLoading: false });
        } catch (error) {
          set({ error: 'Signup failed', isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          // Implement actual API call here
          const response = await fetch('/api/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
          });
          const updatedUser = await response.json();
          set((state) => ({
            user: { ...state.user, ...updatedUser },
            isLoading: false,
          }));
        } catch (error) {
          set({ error: 'Profile update failed', isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => AsyncStorage,
    }
  )
);