import { Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

export interface ImageMetadata {
  id: string;
  uri: string;
  fileName: string;
  fileSize: number;
  width: number;
  height: number;
  type: string;
  createdAt: string;
  platform?: string;
  aspectRatio?: string;
  altText?: string;
  tags?: string[];
  location?: {
    latitude?: number;
    longitude?: number;
    name?: string;
  };
}

export const extractMetadata = async (uri: string): Promise<Partial<ImageMetadata>> => {
  try {
    // Get file info
    const fileInfo = await FileSystem.getInfoAsync(uri);
    
    // Get image dimensions using Promise
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => {
          resolve({ width, height });
        },
        (error) => {
          reject(error);
        }
      );
    });

    // Extract file name and extension
    const uriParts = uri.split('/');
    const fileName = uriParts[uriParts.length - 1];
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    return {
      id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      uri,
      fileName,
      fileSize: fileInfo.size || 0,
      width: dimensions.width,
      height: dimensions.height,
      type: fileExtension ? `image/${fileExtension}` : 'image/jpeg',
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error extracting metadata:', error);
    throw error;
  }
};

export const addAltText = async (
  metadata: ImageMetadata,
  altText: string
): Promise<ImageMetadata> => {
  return {
    ...metadata,
    altText,
  };
};

export const addLocation = async (
  metadata: ImageMetadata,
  location: ImageMetadata['location']
): Promise<ImageMetadata> => {
  return {
    ...metadata,
    location,
  };
};

export const addTags = async (
  metadata: ImageMetadata,
  tags: string[]
): Promise<ImageMetadata> => {
  return {
    ...metadata,
    tags: [...new Set([...(metadata.tags || []), ...tags])],
  };
};

export const getImageDimensions = async (uri: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => {
        resolve({ width, height });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};