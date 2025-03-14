import * as ImagePicker from 'expo-image-picker';

export interface ImageAsset {
  uri: string;
  width: number;
  height: number;
  type?: 'image' | 'video';
  fileName?: string;
  fileSize?: number;
}

export const pickImage = async (options?: {
  allowsMultiple?: boolean;
  maxImages?: number;
}): Promise<ImageAsset[]> => {
  // Request permission
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== 'granted') {
    throw new Error('Permission to access media library was denied');
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: !options?.allowsMultiple,
      allowsMultipleSelection: options?.allowsMultiple,
      quality: 1,
      aspect: [4, 3],
      exif: true,
    });

    if (result.canceled) {
      return [];
    }

    const assets = result.assets.slice(0, options?.maxImages || undefined);
    
    // Convert the assets to our ImageAsset type
    return assets.map(asset => ({
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      type: 'image' as const,
      fileName: asset.fileName || undefined, // Convert null to undefined
      fileSize: asset.fileSize,
    }));
  } catch (error) {
    console.error('Error picking image:', error);
    throw error;
  }
}