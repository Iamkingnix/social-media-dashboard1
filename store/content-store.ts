import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContentItem, ContentFilter } from '../types/content';

interface ContentState {
  items: ContentItem[];
  isLoading: boolean;
  error: string | null;
  filter: ContentFilter;
  createContent: (content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateContent: (id: string, content: Partial<ContentItem>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  setFilter: (filter: ContentFilter) => void;
  getFilteredContent: () => ContentItem[];
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      filter: {},

      createContent: async (content) => {
        set({ isLoading: true, error: null });
        try {
          const newContent: ContentItem = {
            ...content,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            items: [...state.items, newContent],
            isLoading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to create content', isLoading: false });
        }
      },

      updateContent: async (id, content) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, ...content, updatedAt: new Date().toISOString() }
                : item
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to update content', isLoading: false });
        }
      },

      deleteContent: async (id) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: 'Failed to delete content', isLoading: false });
        }
      },

      setFilter: (filter) => {
        set({ filter });
      },

      getFilteredContent: () => {
        const { items, filter } = get();
        return items.filter((item) => {
          if (filter.status && item.status !== filter.status) return false;
          if (filter.platform && !item.platforms.includes(filter.platform)) return false;
          if (filter.dateRange) {
            const itemDate = new Date(item.scheduledDate || item.createdAt);
            const start = new Date(filter.dateRange.start);
            const end = new Date(filter.dateRange.end);
            if (itemDate < start || itemDate > end) return false;
          }
          return true;
        });
      },
    }),
    {
      name: 'content-storage',
      getStorage: () => AsyncStorage,
    }
  )
);