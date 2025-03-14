import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PreviewBase, Platform } from './PreviewBase';
import { ImageAsset } from '../../src/utils/imagePicker';
import { colors } from '../../constants/colors';

const TWITTER_PLATFORM: Platform = {
  name: 'Twitter',
  icon: 'twitter',
  color: '#1DA1F2',
};

interface TwitterPreviewProps {
  text: string;
  username: string;
  images?: ImageAsset[];
}

export const TwitterPreview: React.FC<TwitterPreviewProps> = ({
  text,
  username,
  images,
}) => {
  return (
    <PreviewBase platform={TWITTER_PLATFORM} images={images}>
      <View style={styles.content}>
        <Text style={styles.username}>@{username}</Text>
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
    color: colors.text.secondary,
    fontSize: 14,
  },
  text: {
    color: colors.text.primary,
    fontSize: 16,
  },
});