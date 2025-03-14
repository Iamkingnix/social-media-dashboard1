import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { useAuthStore } from '../../store/auth-store';

export default function TabsLayout() {
  const user = useAuthStore((state) => state.user);

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text.primary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border.default,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {/* Navigate to profile/settings */}}
          >
            <Text style={styles.username}>@{user?.name || 'Iamkingnix'}</Text>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(user?.name || 'Iamkingnix').charAt(0).toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="platforms"
        options={{
          title: 'Platforms',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  username: {
    color: colors.text.primary,
    marginRight: 8,
    fontSize: 14,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});