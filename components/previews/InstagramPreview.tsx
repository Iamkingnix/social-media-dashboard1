import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PreviewBase } from './PreviewBase';
import { PLATFORMS } from '../../constants/platforms';
import { colors } from '../../constants/colors';

interface InstagramPreviewProps {
  caption: string;
  username?: string;
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({
  caption,
  username = 'username',
}) => {
  const platform = PLATFORMS.find(p => p.id === 'instagram')!;
  const remainingChars = 2200 - caption.length;

  return (
    <PreviewBase platform={platform}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/32' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/400x400' }}
          style={styles.image}
        />
      </View>
      <View style={styles.caption}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.captionText}>{caption}</Text>
      </View>
      <Text style={[
        styles.charCount,
        remainingChars < 0 && styles.charCountError
      ]}>
        {remainingChars}
      </Text>
    </PreviewBase>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.text.primary,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: colors.border.default,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  captionText: {
    flex: 1,
    marginLeft: 4,
    fontSize: 14,
    color: colors.text.primary,
  },
  charCount: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 8,
    textAlign: 'right',
  },
  charCountError: {
    color: colors.error,
  },
});