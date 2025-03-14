import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PLATFORMS } from '../constants/platforms';
import type { Platform } from './previews/PreviewBase';
import { colors } from '../constants/colors';

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onSelectPlatform: (platformId: string) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onSelectPlatform,
}) => {
  const currentDate = new Date('2025-03-14T14:56:04Z'); // Using provided UTC time

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Platforms</Text>
      <View style={styles.platforms}>
        {Object.entries(PLATFORMS).map(([id, platform]) => {
          const isSelected = selectedPlatforms.includes(id);
          return (
            <TouchableOpacity
              key={id}
              style={[
                styles.platform,
                isSelected && { backgroundColor: platform.color },
              ]}
              onPress={() => onSelectPlatform(id)}
            >
              <MaterialCommunityIcons
                name={platform.icon as any}
                size={24}
                color={isSelected ? '#FFFFFF' : platform.color}
              />
              <Text
                style={[
                  styles.platformName,
                  isSelected && styles.platformNameSelected,
                ]}
              >
                {platform.name}
              </Text>
              {isSelected && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color="#FFFFFF"
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.helperText}>
        Select the platforms where you want to share your post
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  platforms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  platform: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    minWidth: '48%',
    flex: 1,
  },
  platformName: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
  platformNameSelected: {
    color: '#FFFFFF',
  },
  checkIcon: {
    marginLeft: 4,
  },
  helperText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 8,
  },
});