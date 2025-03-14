import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PreviewBase, Platform } from './PreviewBase';
import { ImageAsset } from '../../src/utils/imagePicker';
import { colors } from '../../constants/colors';

const INSTAGRAM_PLATFORM: Platform = {
  name: 'Instagram',
  icon: 'instagram',
  color: '#E1306C',
};

interface InstagramPreviewProps {
  text: string;
  username: string;
  images?: ImageAsset[];
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({
  text,
  username,
  images,
}) => {
  return (
    <PreviewBase platform={INSTAGRAM_PLATFORM} images={images}>
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