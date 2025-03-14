import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface ImageEditorProps {
  visible: boolean;
  imageUri: string;
  onClose: () => void;
  onSave: (uri: string) => void;
  aspectRatios?: { [key: string]: { width: number; height: number } };
  platforms?: ('twitter' | 'instagram' | 'facebook' | 'linkedin')[];
}

const DEFAULT_ASPECT_RATIOS = {
  square: { width: 1, height: 1 },
  portrait: { width: 3, height: 4 },
  landscape: { width: 4, height: 3 },
  widescreen: { width: 16, height: 9 },
};

export const ImageEditor: React.FC<ImageEditorProps> = ({
  visible,
  imageUri,
  onClose,
  onSave,
  aspectRatios = DEFAULT_ASPECT_RATIOS,
  platforms,
}) => {
  const [selectedRatio, setSelectedRatio] = useState<string>('square');
  const [selectedPlatform, setSelectedPlatform] = useState<string>(platforms?.[0] || '');

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const handleSave = async () => {
    // For now, just return the original URI
    // We'll implement actual image manipulation later
    onSave(imageUri);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Image</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Animated.View
            style={[
              styles.cropContainer,
              {
                transform: [
                  { translateX: pan.x },
                  { translateY: pan.y },
                  { scale },
                ],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <View style={styles.controls}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.entries(aspectRatios).map(([key, ratio]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.ratioButton,
                  selectedRatio === key && styles.ratioButtonSelected,
                ]}
                onPress={() => setSelectedRatio(key)}
              >
                <Text style={[
                  styles.ratioText,
                  selectedRatio === key && styles.ratioTextSelected,
                ]}>
                  {ratio.width}:{ratio.height}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {platforms && platforms.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.platformsContainer}
            >
              {platforms.map((platform) => (
                <TouchableOpacity
                  key={platform}
                  style={[
                    styles.platformButton,
                    selectedPlatform === platform && styles.platformButtonSelected,
                  ]}
                  onPress={() => setSelectedPlatform(platform)}
                >
                  <MaterialCommunityIcons
                    name={platform as any}
                    size={24}
                    color={selectedPlatform === platform ? colors.primary : colors.text.secondary}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  saveButton: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  cropContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  controls: {
    padding: 16,
    gap: 16,
  },
  ratioButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  ratioButtonSelected: {
    backgroundColor: colors.primary,
  },
  ratioText: {
    color: colors.text.primary,
    fontSize: 14,
  },
  ratioTextSelected: {
    color: '#FFFFFF',
  },
  platformsContainer: {
    marginTop: 8,
  },
  platformButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  platformButtonSelected: {
    backgroundColor: colors.primary + '20',
  },
});