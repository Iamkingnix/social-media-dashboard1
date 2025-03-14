import * as ImageManipulator from 'expo-image-manipulator';

export interface CropRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AspectRatio {
  width: number;
  height: number;
}

export const COMMON_ASPECT_RATIOS: { [key: string]: AspectRatio } = {
  square: { width: 1, height: 1 },
  portrait: { width: 3, height: 4 },
  landscape: { width: 4, height: 3 },
  widescreen: { width: 16, height: 9 },
  instagram_story: { width: 9, height: 16 },
};

export const cropImage = async (
  uri: string,
  cropRegion: CropRegion,
  aspectRatio?: AspectRatio
): Promise<ImageManipulator.ImageResult> => {
  let actions: ImageManipulator.Action[] = [];

  // Add crop action
  actions.push({
    crop: {
      originX: cropRegion.x,
      originY: cropRegion.y,
      width: cropRegion.width,
      height: cropRegion.height,
    },
  });

  // If aspect ratio is provided, ensure the crop meets it
  if (aspectRatio) {
    const targetRatio = aspectRatio.width / aspectRatio.height;
    const currentRatio = cropRegion.width / cropRegion.height;

    if (Math.abs(targetRatio - currentRatio) > 0.01) {
      // Adjust crop to match aspect ratio
      if (currentRatio > targetRatio) {
        const newWidth = cropRegion.height * targetRatio;
        actions[0].crop.width = newWidth;
      } else {
        const newHeight = cropRegion.width / targetRatio;
        actions[0].crop.height = newHeight;
      }
    }
  }

  return await ImageManipulator.manipulateAsync(
    uri,
    actions,
    {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );
};