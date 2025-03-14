import { ImageAsset } from '../src/utils/imagePicker';

interface PostPreviewProps {
  platforms: string[];
  text: string;
  username: string;
  images?: ImageAsset[];  // Updated type
}