import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from '../../constants/platforms';
import { colors } from '../../constants/colors';

interface PreviewBaseProps {
  platform: Platform;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const PreviewBase: React.FC<PreviewBaseProps> = ({
  platform,
  style,
  children,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.header, { backgroundColor: platform.color }]}>
        <MaterialCommunityIcons name={platform.icon as any} size={20} color="#FFFFFF" />
        <Text style={styles.platformName}>{platform.name} Preview</Text>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  platformName: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    padding: 12,
  },
});