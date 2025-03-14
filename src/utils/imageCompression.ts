import { Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0 to 1
  platform?: 'twitter' | 'instagram' | 'facebook' | 'linkedin';
}

const PLATFORM_LIMITS = {
  twitter: {
    maxSize: 5 * 1024 * 1024, // 5MB
    maxWidth: 4096,
    maxHeight: 4096,
  },
  instagram: {
    maxSize: 8 * 1024 * 1024, // 8MB
    maxWidth: 1080,
    maxHeight: 1350,
  },
  facebook: {
    maxSize: 10 * 1024 * 1024, // 10MB
    maxWidth: 2048,
    maxHeight: 2048,
  },
  linkedin: {
    maxSize: 5 * 1024 * 1024, // 5MB
    maxWidth: 1920,
    maxHeight: 1920,
  },
};

const getImageDimensions = async (uri: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      (error) => reject(error)
    );
  });
};

export const compressImage = async (
  uri: string,
  options: CompressionOptions = {}
): Promise<ImageManipulator.ImageResult> => {
  const {
    maxWidth,
    maxHeight,
    quality = 0.8,
    platform,
  } = options;

  let targetWidth = maxWidth;
  let targetHeight = maxHeight;

  if (platform) {
    const limits = PLATFORM_LIMITS[platform];
    targetWidth = targetWidth || limits.maxWidth;
    targetHeight = targetHeight || limits.maxHeight;
  }

  try {
    // Get original dimensions
    const { width, height } = await getImageDimensions(uri);

    // Calculate resize dimensions while maintaining aspect ratio
    if (targetWidth && targetHeight) {
      const aspectRatio = width / height;
      if (width > height) {
        targetHeight = Math.round(targetWidth / aspectRatio);
      } else {
        targetWidth = Math.round(targetHeight * aspectRatio);
      }
    }

    const actions: ImageManipulator.Action[] = [];
    
    // Only resize if needed
    if (targetWidth && targetHeight && (width > targetWidth || height > targetHeight)) {
      actions.push({
        resize: {
          width: Math.min(width, targetWidth),
          height: Math.min(height, targetHeight),
        },
      });
    }

    const result = await ImageManipulator.manipulateAsync(
      uri,
      actions,
      {
        compress: quality,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    // Verify if the result meets platform requirements
    if (platform) {
      const limits = PLATFORM_LIMITS[platform];
      if (result.uri) {
        const fileInfo = await fetch(result.uri).then(response => {
          const contentLength = response.headers.get('content-length');
          return {
            size: contentLength ? parseInt(contentLength, 10) : 0
          };
        });

        if (fileInfo.size > limits.maxSize) {
          // If still too large, compress further
          return compressImage(result.uri, {
            ...options,
            quality: Math.max(0.1, quality - 0.2),
          });
        }
      }
    }

    return result;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

export const isImageWithinPlatformLimits = (
  fileSize: number,
  width: number,
  height: number,
  platform: keyof typeof PLATFORM_LIMITS
): boolean => {
  const limits = PLATFORM_LIMITS[platform];
  return (
    fileSize <= limits.maxSize &&
    width <= limits.maxWidth &&
    height <= limits.maxHeight
  );
};

export const getPlatformLimits = (platform: keyof typeof PLATFORM_LIMITS) => {
  return PLATFORM_LIMITS[platform];
};

export const calculateCompressionQuality = (
  fileSize: number,
  targetSize: number
): number => {
  const ratio = targetSize / fileSize;
  return Math.min(1, Math.max(0.1, ratio));
};

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Example usage:
// const compressedImage = await compressImage(uri, {
//   platform: 'instagram',
//   quality: 0.8,
// });