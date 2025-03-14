import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, PLATFORMS } from '../constants/platforms';
import { colors } from '../constants/colors';

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onSelectPlatform: (platformId: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onSelectPlatform,
  style,
}) => {
  const renderPlatform = (platform: Platform) => {
    const isSelected = selectedPlatforms.includes(platform.id);

    return (
      <TouchableOpacity
        key={platform.id}
        style={[
          styles.platformButton,
          isSelected && { backgroundColor: platform.color },
        ]}
        onPress={() => onSelectPlatform(platform.id)}
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
            name="check"
            size={16}
            color="#FFFFFF"
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>Select Platforms</Text>
      <View style={styles.platformsGrid}>
        {PLATFORMS.map(renderPlatform)}
      </View>
      {selectedPlatforms.length === 0 && (
        <Text style={styles.error}>
          Please select at least one platform
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
  },
  platformButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: colors.border.default,
    minWidth: '45%',
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
  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});