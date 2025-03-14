import { ImageAsset } from '../src/utils/imagePicker';

interface ImagePreviewProps {
  images: ImageAsset[];  // Updated type
  onRemoveImage: (index: number) => void;
  onEditMetadata?: (index: number) => void;
  maxImages?: number;
  style?: any;
}