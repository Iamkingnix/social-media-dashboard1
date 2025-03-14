import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../../constants/colors';
import { ContentCard } from '../../../components/ContentCard';
import { EmptyState } from '../../../components/EmptyState';
import { useContentStore } from '../../../store/content-store';
import { Button } from '../../../components/Button';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const currentDate = new Date('2025-03-14T05:47:32Z');
  
  const contents = useContentStore((state) => state.items);
  const [filter, setFilter] = useState('all'); // 'all', 'scheduled', 'published', 'draft'

  const filteredContents = contents.filter(content => {
    if (filter === 'all') return true;
    return content.status === filter;
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    // Implement refresh logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  if (contents.length === 0) {
    return (
      <EmptyState
        title="Welcome to Your Content Hub"
        description="Start creating and sharing content across your social media platforms."
        actionLabel="Create First Post"
        onAction={() => router.push('/create')}
        icon={<Ionicons name="add-circle-outline" size={48} color={colors.primary} />}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['all', 'scheduled', 'published', 'draft'].map((filterOption) => (
          <Button
            key={filterOption}
            title={filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            variant={filter === filterOption ? 'primary' : 'outline'}
            onPress={() => setFilter(filterOption)}
            style={styles.filterButton}
          />
        ))}
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        style={styles.contentList}
      >
        {filteredContents.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            onPress={() => router.push({
              pathname: '/content-details',
              params