import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  username: string;
  email: string;
  // Add any other user properties you need
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with your actual API call
      const response = await fetch('YOUR_API_ENDPOINT/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

      // Store token in AsyncStorage
      await AsyncStorage.setItem('auth_token', data.token);

      set({
        user: data.user,
        token: data.token,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred during login',
        isLoading: false,
      });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // Clear token from AsyncStorage
      await AsyncStorage.removeItem('auth_token');
      
      set({
        user: null,
        token: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: 'Failed to logout',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));