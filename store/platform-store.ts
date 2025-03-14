import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from '../constants/platforms';

interface ConnectedPlatform extends Platform {
  connected: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
}

interface PlatformState {
  platforms: ConnectedPlatform[];
  isLoading: boolean;
  error: string | null;
  connectPlatform: (platformId: string) => Promise<void>;
  disconnectPlatform: (platformId: string) => Promise<void>;
  refreshToken: (platformId: string) => Promise<void>;
  getConnectedPlatforms: () => ConnectedPlatform[];
}

export const usePlatformStore = create<PlatformState>()(
  persist(
    (set, get) => ({
      platforms: [],
      isLoading: false,
      error: null,

      connectPlatform: async (platformId) => {
        set({ isLoading: true, error: null });
        try {
          // Implement actual OAuth flow here
          set((state) => ({
            platforms: state.platforms.map((platform) =>
              platform.id === platformId
                ? {
                    ...platform,
                    connected: true,
                    accessToken: 'dummy-token',
                    refreshToken: 'dummy-refresh-token',
                    expiresAt: new Date(Date.now() + 3600000).toISOString(),
                  }
                : platform
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to connect platform', isLoading: false });
        }
      },

      disconnectPlatform: async (platformId) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            platforms: state.platforms.map((platform) =>
              platform.id === platformId
                ? {
                    ...platform,
                    connected: false,
                    accessToken: undefined,
                    refreshToken: undefined,
                    expiresAt: undefined,
                  }
                : platform
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to disconnect platform', isLoading: false });
        }
      },

      refreshToken: async (platformId) => {
        set({ isLoading: true, error: null });
        try {
          // Implement actual token refresh here
          set((state) => ({
            platforms: state.platforms.map((platform) =>
              platform.id === platformId
                ? {
                    ...platform,
                    accessToken: 'new-dummy-token',
                    expiresAt: new Date(Date.now() + 3600000).toISOString(),
                  }
                : platform
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to refresh token', isLoading: false });
        }
      },

      getConnectedPlatforms: () => {
        return get().platforms.filter((platform) => platform.connected);
      },
    }),
    {
      name: 'platform-storage',
      getStorage: () => AsyncStorage,
    }
  )
);