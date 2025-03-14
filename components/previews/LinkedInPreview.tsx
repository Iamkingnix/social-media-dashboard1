import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PreviewBase } from './PreviewBase';
import { ImageAsset } from '../../src/utils/imagePicker';
import { colors } from '../../constants/colors';

interface LinkedInPreviewProps {
  text: string;
  username: string;
  images?: ImageAsset[];
}

export const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({
  text,
  username,
  images,
}) => {
  return (
    <PreviewBase
      platform={{ name: 'LinkedIn', icon: 'linkedin', color: '#0A66C2' }}
      images={images}
    >
      <View style={styles.content}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </PreviewBase>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 8,
  },
  username: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  text: {
    color: colors.text.primary,
    fontSize: 16,
  },
});