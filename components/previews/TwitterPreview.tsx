import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PreviewBase } from './PreviewBase';
import { PLATFORMS } from '../../constants/platforms';
import { colors } from '../../constants/colors';

interface TwitterPreviewProps {
  text: string;
  username?: string;
}

export const TwitterPreview: React.FC<TwitterPreviewProps> = ({
  text,
  username = 'Username',
}) => {
  const platform = PLATFORMS.find(p => p.id === 'twitter')!;
  const remainingChars = 280 - text.length;

  return (
    <PreviewBase platform={platform}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View style={styles.names}>
          <Text style={styles.name}>Display Name</Text>
          <Text style={styles.username}>@{username}</Text>
        </View>
      </View>
      <Text style={styles.text}>{text}</Text>
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  names: {
    marginLeft: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.text.primary,
  },
  username: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  text: {
    fontSize: 15,
    color: colors.text.primary,
    lineHeight: 20,
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