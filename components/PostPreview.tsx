import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TwitterPreview } from './previews/TwitterPreview';
import { InstagramPreview } from './previews/InstagramPreview';
import { FacebookPreview } from './previews/FacebookPreview';
import { LinkedInPreview } from './previews/LinkedInPreview';
import { ImageAsset } from '../src/utils/imagePicker';
import { PLATFORMS } from '../constants/platforms';

interface PostPreviewProps {
  platforms: string[];
  text: string;
  username: string;
  images?: ImageAsset[];
}

const PostPreview: React.FC<PostPreviewProps> = ({
  platforms,
  text,
  username,
  images,
}) => {
  const currentDate = new Date('2025-03-14T14:59:17Z'); // Using provided UTC time

  return (
    <View style={styles.container}>
      {platforms.map(platformId => {
        const platform = PLATFORMS[platformId.toLowerCase()];
        if (!platform) return null;

        switch (platformId.toLowerCase()) {
          case 'twitter':
            return (
              <TwitterPreview
                key={platformId}
                text={text}
                username={username}
                images={images}
              />
            );
          case 'instagram':
            return (
              <InstagramPreview
                key={platformId}
                text={text}
                username={username}
                images={images}
              />
            );
          case 'facebook':
            return (
              <FacebookPreview
                key={platformId}
                text={text}
                username={username}
                images={images}
              />
            );
          case 'linkedin':
            return (
              <LinkedInPreview
                key={platformId}
                text={text}
                username={username}
                images={images}
              />
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 24,
  },
});

// Add this export statement
export { PostPreview };