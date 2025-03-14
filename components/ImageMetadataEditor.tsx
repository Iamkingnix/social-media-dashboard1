import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { ImageMetadata } from '../src/utils/imageMetadata';

interface ImageMetadataEditorProps {
  visible: boolean;
  metadata: Partial<ImageMetadata>;
  onClose: () => void;
  onSave: (metadata: Partial<ImageMetadata>) => void;
}

export const ImageMetadataEditor: React.FC<ImageMetadataEditorProps> = ({
  visible,
  metadata,
  onClose,
  onSave,
}) => {
  const [editedMetadata, setEditedMetadata] = useState<Partial<ImageMetadata>>(metadata);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim()) {
      setEditedMetadata(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setEditedMetadata(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag),
    }));
  };

  const handleSave = () => {
    onSave(editedMetadata);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Image Details</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.imagePreview}>
            <Image
              source={{ uri: metadata.uri }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Alt Text</Text>
            <TextInput
              style={styles.input}
              value={editedMetadata.altText}
              onChangeText={(text) => setEditedMetadata(prev => ({ ...prev, altText: text }))}
              placeholder="Describe this image..."
              multiline
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Tags</Text>
            <View style={styles.tagInput}>
              <TextInput
                style={styles.input}
                value={newTag}
                onChangeText={setNewTag}
                placeholder="Add a tag..."
                onSubmitEditing={handleAddTag}
              />
              <TouchableOpacity
                style={styles.addTagButton}
                onPress={handleAddTag}
              >
                <MaterialCommunityIcons name="plus" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.tagContainer}>
              {editedMetadata.tags?.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveTag(tag)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialCommunityIcons name="close" size={16} color={colors.text.secondary} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>File Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Size:</Text>
              <Text style={styles.infoValue}>
                {(metadata.fileSize / (1024 * 1024)).toFixed(2)} MB
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Dimensions:</Text>
              <Text style={styles.infoValue}>
                {metadata.width} × {metadata.height}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type:</Text>
              <Text style={styles.infoValue}>{metadata.type}</Text>
            </View>
          </View>
        </ScrollView>
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
  content: {
    flex: 1,
    padding: 16,
  },
  imagePreview: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  tagInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addTagButton: {
    padding: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  tagText: {
    color: colors.primary,
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border.default,
  },
  infoLabel: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  infoValue: {
    color: colors.text.primary,
    fontSize: 14,
  },
});