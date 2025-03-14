import { Platform } from '../constants/platforms';

export type MediaType = 'image' | 'video' | 'text';

export type ContentStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  mediaType: MediaType;
  mediaUrl?: string;
  platforms: string[]; // Platform IDs
  scheduledDate?: string;
  status: ContentStatus;
  analytics?: ContentAnalytics;
  createdAt: string;
  updatedAt: string;
}

export interface ContentAnalytics {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagementRate: number;
}

export interface ContentFilter {
  status?: ContentStatus;
  platform?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}