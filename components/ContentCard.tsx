import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { PlatformBadge } from './PlatformBadge';
import { Ionicons } from '@expo/vector-icons';

interface ContentCardProps {
  content: {
    id: string;
    title: string;
    description: string;
    platforms: string[];
    scheduledDate?: string;
    status: 'draft' | 'scheduled' | 'published';
    mediaType?: 'text' | 'image' | 'video';
  };
  onPress?: () => void;
}

export function ContentCard({ content, onPress }: ContentCardProps) {
  const getStatusColor = () => {
    switch (content.status) {
      case 'published':
        return colors.status.success;
      case 'scheduled':
        return colors.status.info;
      default:
        return colors.text.secondary;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{content.title}</Text>
        <View style={[styles.status, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>
            {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {content.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.platforms}>
          {content.platforms.map((platform) => (
            <PlatformBadge key={platform} platformId={platform} />
          ))}
        </View>

        {content.scheduledDate && (
          <View style={styles.scheduleInfo}>
            <Ionicons name="calendar-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.scheduleText}>
              {new Date(content.scheduledDate).toLocaleString()}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
    marginRight: 12,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.primary,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platforms: {
    flexDirection: 'row',
    gap: 8,
  },
  scheduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scheduleText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});