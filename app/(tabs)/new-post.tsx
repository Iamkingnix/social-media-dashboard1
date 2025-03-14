import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PlatformSelector } from '../../components/PlatformSelector';
import { useContentStore } from '../../store/content-store';
import { colors } from '../../constants/colors';

interface PostForm {
  title: string;
  description: string;
  platforms: string[];
  scheduledDate?: string;
}

export default function NewPostScreen() {
  const router = useRouter();
  const createContent = useContentStore((state) => state.createContent);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<PostForm>({
    title: '',
    description: '',
    platforms: [],
  });

  const handlePlatformSelect = (platformId: string) => {
    setForm(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(id => id !== platformId)
        : [...prev.platforms, platformId],
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (form.platforms.length === 0) {
      Alert.alert('Error', 'Please select at least one platform');
      return;
    }

    setIsLoading(true);
    try {
      await createContent({
        ...form,
        status: 'draft',
        mediaType: 'text',
      });
      
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

        <PlatformSelector
          selectedPlatforms={form.platforms}
          onSelectPlatform={handlePlatformSelect}
        />

        {/* TODO: Add date/time picker for scheduling */}

        <View style={styles.buttons}>
          <Button
            title="Cancel"
            onPress={() => router.back()}
            variant="outline"
            style={styles.button}
          />
          <Button
            title={isLoading ? "Creating..." : "Create Post"}
            onPress={handleSubmit}
            disabled={isLoading || form.platforms.length === 0}
            style={styles.button}
          />
        </View>
      </View>
    </ScrollView>
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
    height: 120,
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});