import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import { useContentStore } from '../../store/content-store';
import { usePlatformStore } from '../../store/platform-store';
import { LineChart } from 'react-native-chart-kit';

export default function AnalyticsScreen() {
  const currentDate = new Date('2025-03-14T05:47:32Z');
  const contents = useContentStore((state) => state.items);
  const connectedPlatforms = usePlatformStore((state) => state.getConnectedPlatforms());

  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', 'year'

  // Generate date labels for the chart based on current date
  const getDateLabels = () => {
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    return labels;
  };

  // Sample engagement data
  const engagementData = {
    labels: getDateLabels(),
    datasets: [{
      data: [65, 78, 90, 84, 102, 95, 120], // Sample data
      color: () => colors.primary,
    }],
  };

  const platformMetrics = connectedPlatforms.map(platform => ({
    id: platform.id,
    name: platform.name,
    metrics: {
      followers: Math.floor(Math.random() * 10000),
      engagement: (Math.random() * 5 + 2).toFixed(1) + '%',
      reach: Math.floor(Math.random() * 50000),
    }
  }));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Overview</Text>
        <Text style={styles.subtitle}>
          Last updated: {currentDate.toLocaleString()}
        </Text>
      </View>

      <View style={styles.timeRangeSelector}>
        {['week', 'month', 'year'].map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              styles.timeRangeButton,
              timeRange === range && styles.timeRangeButtonActive,
            ]}
            onPress={() => setTimeRange(range)}
          >
            <Text
              style={[
                styles.timeRangeText,
                timeRange === range && styles.timeRangeTextActive,
              ]}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Engagement Over Time</Text>
        <LineChart
          data={engagementData}
          width={styles.chart.width}
          height={220}
          chartConfig={{
            backgroundColor: colors.surface,
            backgroundGradientFrom: colors.surface,
            backgroundGradientTo: colors.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
            labelColor: () => colors.text.secondary,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.metricsGrid}>
        {platformMetrics.map((platform) => (
          <View key={platform.id} style={styles.platformCard}>
            <Text style={styles.platformName}>{platform.name}</Text>
            <View style={styles.metricsList}>
              <MetricItem
                label="Followers"
                value={platform.metrics.followers.toLocaleString()}
              />
              <MetricItem
                label="Engagement"
                value={platform.metrics.engagement}
              />
              <MetricItem
                label="Reach"
                value={platform.metrics.reach.toLocaleString()}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Content Performance</Text>
        <View style={styles.summaryGrid}>
          <SummaryCard
            title="Total Posts"
            value={contents.length.toString()}
          />
          <SummaryCard
            title="Avg. Engagement"
            value="4.2%"
          />
          <SummaryCard
            title="Best Time"
            value="3 PM"
          />
          <SummaryCard
            title="Top Platform"
            value="Instagram"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const MetricItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.metricItem}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

const SummaryCard = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.summaryCard}>
    <Text style={styles.summaryCardTitle}>{title}</Text>
    <Text style={styles.summaryCardValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  timeRangeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  timeRangeButtonActive: {
    backgroundColor: colors.primary,
  },
  timeRangeText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  timeRangeTextActive: {
    color: colors.text.primary,
  },
  chartContainer: {
    padding: 16,
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  chart: {
    width: '100%',
    borderRadius: 12,
  },
  metricsGrid: {
    padding: 16,
    gap: 16,
  },
  platformCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  platformName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  metricsList: {
    gap: 12,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  summary: {
    padding: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  summaryCardTitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  summaryCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
});