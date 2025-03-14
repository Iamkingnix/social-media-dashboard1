import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '../../../constants/colors';
import { useContentStore } from '../../../store/content-store';
import { PlatformBadge } from '../../../components/PlatformBadge';
import { Button } from '../../../components/Button';

export default function ContentDetailsScreen() {
  const { id } = useLocalSearchParams();
  const content = useContentStore((state) => 
    state.items.find((item) => item.id === id)
  );

  if (!content) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Content not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {content.mediaUrl && (
          <Image
            source={{ uri: content.mediaUrl }}
            style={styles.media}
          />
        )}

        <View style={styles.header}>
          <Text style={styles.title}>{content.title}</Text>
          <Text style={styles.date}>
            Created: {new Date(content.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <Text style={styles.description}>{content.description}</Text>

        <View style={styles.platforms}>
          <Text style={styles.sectionTitle}>Platforms</Text>
          <View style={styles.platformsList}>
            {content.platforms.map((platformId) => (
              <PlatformBadge
                key={platformId}
                platformId={platformId}
                size="large"
              />
            ))}
          </View>
        </View>

        {content.scheduledDate && (
          <View style={styles.scheduling}>
            <Text style={styles.sectionTitle}>Scheduling</Text>
            <Text style={styles.scheduledDate}>
              Scheduled for: {new Date(content.scheduledDate).toLocaleString()}
            </Text>
          </View>
        )}

        {content.analytics && (
          <View style={styles.analytics}>
            <Text style={styles.sectionTitle}>Performance</Text>
            <View style={styles.statsGrid}>
              <StatCard
                label="Views"
                value={content.analytics.views}
              />
              <StatCard
                label="Likes"
                value={content.analytics.likes}
              />
              <StatCard
                label="Shares"
                value={content.analytics.shares}
              />
              <StatCard
                label="Comments"
                value={content.analytics.comments}
              />
            </View>
          </View>
        )}

        <View style={styles.actions}>
          <Button
            title="Edit Content"
            onPress={() => {/* Implement edit logic */}}
            style={styles.actionButton}
          />
          <Button
            title="Delete Content"
            variant="outline"
            onPress={() => {/* Implement delete logic */}}
            style={styles.actionButton}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  media: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  description: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 24,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  platforms: {
    marginBottom: 24,
  },
  platformsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  scheduling: {
    marginBottom: 24,
  },
  scheduledDate: {
    fontSize: 16,
    color: colors.text.primary,
  },
  analytics: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
});