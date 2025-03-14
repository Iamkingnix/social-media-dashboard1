import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { platforms } from '../constants/platforms';
import { colors } from '../constants/colors';

interface PlatformBadgeProps {
  platformId: string;
  size?: 'small' | 'medium' | 'large';
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platformId,
  size = 'medium',
}) => {
  const platform = platforms.find((p) => p.id === platformId);
  
  if (!platform) return null;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 4,
          paddingHorizontal: 8,
          fontSize: 10,
        };
      case 'large':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 14,
        };
      default:
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
          fontSize: 12,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${platform.color}20`,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: platform.color, fontSize: sizeStyles.fontSize },
        ]}
      >
        {platform.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  text: {
    fontWeight: '500',
  },
});