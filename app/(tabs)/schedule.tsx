import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import { ContentCard } from '../../components/ContentCard';
import { useContentStore } from '../../store/content-store';
import { Calendar } from 'react-native-calendars';

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(
    new Date('2025-03-14').toISOString().split('T')[0] // Current date
  );
  
  const contents = useContentStore((state) => 
    state.items.filter(item => 
      item.scheduledDate && 
      new Date(item.scheduledDate).toISOString().split('T')[0] === selectedDate
    )
  );

  const markedDates = useContentStore((state) => {
    const dates: Record<string, { marked: boolean, dotColor: string }> = {};
    state.items.forEach(item => {
      if (item.scheduledDate) {
        const date = new Date(item.scheduledDate).toISOString().split('T')[0];
        dates[date] = {
          marked: true,
          dotColor: colors.primary,
        };
      }
    });
    return dates;
  });

  return (
    <View style={styles.container}>
      <Calendar
        theme={{
          backgroundColor: colors.surface,
          calendarBackground: colors.surface,
          textSectionTitleColor: colors.text.primary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.text.primary,
          todayTextColor: colors.primary,
          dayTextColor: colors.text.primary,
          textDisabledColor: colors.text.disabled,
          monthTextColor: colors.text.primary,
          arrowColor: colors.primary,
        }}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...markedDates[selectedDate],
            selected: true,
          },
        }}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />

      <ScrollView style={styles.contentList}>
        <Text style={styles.dateTitle}>
          {new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        {contents.length === 0 ? (
          <Text style={styles.emptyText}>
            No content scheduled for this date
          </Text>
        ) : (
          contents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onPress={() => {/* Navigate to content details */}}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentList: {
    flex: 1,
    padding: 16,
  },
  dateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 24,
  },
});