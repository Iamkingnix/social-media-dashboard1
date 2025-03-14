import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/colors';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PlatformBadge } from '../../components/PlatformBadge';
import { useContentStore } from '../../store/content-store';
import { usePlatformStore } from '../../store/platform-store';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateScreen() {
  const router = useRouter();
  const createContent = useContentStore((state) => state.createContent);
  const connectedPlatforms = usePlatformStore((state) => state.getConnectedPlatforms());

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediaUrl, setMediaUrl] = useState('');
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(current =>
      current.includes(platformId)
        ? current.filter(id => id !== platformId)
        : [...current, platformId]
    );
  };

  const handleScheduleChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setScheduleDate(selectedDate);
    }
  };

  const handleCreateContent = async () => {
    if (!title || !description || selectedPlatforms.length === 0) {
      Alert.alert('Error', 'Please fill in all required fields and select at least one platform');
      return;
    }

    try {
      await createContent({
        title,
        description,
        mediaUrl,
        platforms: selectedPlatforms,
        scheduledDate: scheduleDate?.toISOString(),
        status: scheduleDate ? 'scheduled' : 'draft',
        mediaType: mediaUrl ? 'image' : 'text',
      });

      Alert.alert('Success', 'Content created successfully', [{
        text: 'OK',
        onPress: () => router.back(),
      }]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create content');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Input
          label="Title"
          placeholder="Enter content title"
          value={title}
          onChangeText={setTitle}
        />

        <Input
          label="Description"
          placeholder="Enter content description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={styles.descriptionInput}
        />

        <Input
          label="Media URL (Optional)"
          placeholder="Enter media URL"
          value={mediaUrl}
          onChangeText={setMediaUrl}
        />

        <View style={styles.platformsSection}>
          <Text style={styles.sectionTitle}>Select Platforms</Text>
          <View style={styles.platformsGrid}>
            {connectedPlatforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                onPress={() => handlePlatformToggle(platform.id)}
                style={[
                  styles.platformItem,
                  selectedPlatforms.includes(platform.id) && styles.platformSelected
                ]}
              >
                <PlatformBadge platformId={platform.id} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.schedulingSection}>
          <Text style={styles.sectionTitle}>Schedule (Optional)</Text>
          <Button
            title={scheduleDate ? scheduleDate.toLocaleString() : "Set Schedule Time"}
            variant="outline"
            onPress={() => setShowDatePicker(true)}
          />
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={scheduleDate || new Date('2025-03-14T05:43:13Z')} // Using current UTC time
            mode="datetime"
            onChange={handleScheduleChange}
            minimumDate={new Date()}
          />
        )}

        <Button
          title="Create Content"
          onPress={handleCreateContent}
          style={styles.createButton}
        />
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  platformsSection: {
    marginVertical: 24,
  },
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  platformItem: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  platformSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}20`,
  },
  schedulingSection: {
    marginBottom: 24,
  },
  createButton: {
    marginTop: 24,
  },
});