import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { ImageAsset } from '../../src/utils/imagePicker';

export interface Platform {
  name: string;
  icon: string;
  color: string;
}

interface PreviewBaseProps {
  platform: Platform;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  images?: ImageAsset[];
}

export const PreviewBase: React.FC<PreviewBaseProps> = ({
  platform,
  style,
  children,
  images,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.header, { backgroundColor: platform.color }]}>
        <MaterialCommunityIcons 
          name={platform.icon as any} 
          size={20} 
          color="#FFFFFF" 
        />
        <Text style={styles.platformName}>{platform.name} Preview</Text>
        {images && images.length > 0 && (
          <View style={styles.imageCount}>
            <MaterialCommunityIcons 
              name="image" 
              size={16} 
              color="#FFFFFF" 
            />
            <Text style={styles.imageCountText}>{images.length}</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  platformName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  imageCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  imageCountText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});