import { create } from 'zustand';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  platforms: string[];
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published';
  mediaType?: 'text' | 'image' | 'video';
  createdAt: string;
  updatedAt: string;
}

interface ContentState {
  items: ContentItem[];
  isLoading: boolean;
  error: string | null;
  fetchContent: () => Promise<void>;
  createContent: (content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateContent: (id: string, updates: Partial<ContentItem>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
}

export const useContentStore = create<ContentState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchContent: async () => {
    set({ isLoading: true });
    try {
      // TODO: Replace with your actual API call
      const response = await fetch('YOUR_API_ENDPOINT/content');
      const data = await response.json();
      
      set({ items: data, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch content' });
    } finally {
      set({ isLoading: false });
    }
  },

  createContent: async (content) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with your actual API call
      const response = await fetch('YOUR_API_ENDPOINT/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      const data = await response.json();
      
      set(state => ({
        items: [...state.items, data],
        error: null,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create content' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateContent: async (id, updates) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with your actual API call
      const response = await fetch(`YOUR_API_ENDPOINT/content/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      
      set(state => ({
        items: state.items.map(item => 
          item.id === id ? { ...item, ...data } : item
        ),
        error: null,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update content' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteContent: async (id) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with your actual API call
      await fetch(`YOUR_API_ENDPOINT/content/${id}`, {
        method: 'DELETE',
      });
      
      set(state => ({
        items: state.items.filter(item => item.id !== id),
        error: null,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete content' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));