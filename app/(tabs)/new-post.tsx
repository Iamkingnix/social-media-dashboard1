import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PlatformSelector } from '../../components/PlatformSelector';
import { DateTimePicker } from '../../components/DateTimePicker';
import { PostPreview } from '../../components/PostPreview';
import { ImagePreview } from '../../components/ImagePreview';
import { ImageEditor } from '../../components/ImageEditor';
import { ImageMetadataEditor } from '../../components/ImageMetadataEditor';
import { pickImage } from '../../src/utils/imagePicker';  // Add this import
import { extractMetadata, ImageMetadata } from '../../src/utils/imageMetadata';
import { colors } from '../../constants/colors';

interface PostForm {
  title: string;
  description: string;
  platforms: string[];
  scheduledDate?: Date;
  images: Partial<ImageMetadata>[];
}

export default function NewPostScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const currentDate = new Date('2025-03-14T14:48:22Z'); // Using provided UTC time
  const username = 'Iamkingnix'; // Using provided username
  
  const [form, setForm] = useState<PostForm>({
    title: '',
    description: '',
    platforms: [],
    images: [],
  });

  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [editingMetadata, setEditingMetadata] = useState<Partial<ImageMetadata> | null>(null);

  const handleImagePick = async () => {
    try {
      const selectedImages = await pickImage({
        allowsMultiple: true,
        maxImages: 4,
      });
      
      if (selectedImages.length > 0) {
        const metadata = await extractMetadata(selectedImages[0].uri);
        setEditingImage(selectedImages[0].uri);
        setEditingMetadata({
          ...metadata,
          createdAt: currentDate.toISOString(), // Using provided time
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleImageSave = async (uri: string) => {
    setEditingImage(null);
    if (editingMetadata) {
      setEditingMetadata({
        ...editingMetadata,
        uri,
      });
    }
  };

  const handleMetadataSave = (metadata: Partial<ImageMetadata>) => {
    setForm(prev => ({
      ...prev,
      images: [...prev.images, metadata].slice(0, 4),
    }));
    setEditingMetadata(null);
  };

  const handleRemoveImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleEditImageMetadata = (index: number) => {
    setEditingMetadata(form.images[index]);
  };

  const handlePlatformSelect = (platform: string) => {
    setForm(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleScheduleChange = (date?: Date) => {
    setForm(prev => ({
      ...prev,
      scheduledDate: date,
    }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (!form.description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    if (form.platforms.length === 0) {
      Alert.alert('Error', 'Please select at least one platform');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement post creation
      console.log('Creating post:', {
        ...form,
        createdBy: username,
        createdAt: currentDate.toISOString(),
      });
      
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Input
            label="Title"
            value={form.title}
            onChangeText={(text) => setForm(prev => ({ ...prev, title: text }))}
            placeholder="Enter post title"
          />

          <Input
            label="Description"
            value={form.description}
            onChangeText={(text) => setForm(prev => ({ ...prev, description: text }))}
            placeholder="Enter post description"
            multiline
            numberOfLines={4}
            style={styles.descriptionInput}
          />

          <TouchableOpacity
            style={styles.imageButton}
            onPress={handleImagePick}
          >
            <MaterialCommunityIcons
              name="image-plus"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.imageButtonText}>
              Add Images ({form.images.length}/4)
            </Text>
          </TouchableOpacity>

          {form.images.length > 0 && (
            <ImagePreview
              images={form.images as any} // TODO: Fix type
              onRemoveImage={handleRemoveImage}
              onEditMetadata={handleEditImageMetadata}
              maxImages={4}
            />
          )}

          <PlatformSelector
            selectedPlatforms={form.platforms}
            onSelectPlatform={handlePlatformSelect}
          />

          {form.platforms.length > 0 && (
            <PostPreview
              platforms={form.platforms}
              text={form.description}
              username={username}
              images={form.images as any} // TODO: Fix type
            />
          )}

          <DateTimePicker
            value={form.scheduledDate}
            onChange={handleScheduleChange}
            onClear={() => handleScheduleChange(undefined)}
            minimumDate={currentDate}
            label="Schedule Post (Optional)"
          />

          <Button
            title="Create Post"
            onPress={handleSubmit}
            loading={isLoading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>

      <ImageEditor
        visible={!!editingImage}
        imageUri={editingImage || ''}
        onClose={() => setEditingImage(null)}
        onSave={handleImageSave}
        platforms={form.platforms}
      />

      {editingMetadata && (
        <ImageMetadataEditor
          visible={!!editingMetadata}
          metadata={editingMetadata}
          onClose={() => setEditingMetadata(null)}
          onSave={handleMetadataSave}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  imageButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.primary,
  },
  submitButton: {
    marginTop: 24,
  },
});