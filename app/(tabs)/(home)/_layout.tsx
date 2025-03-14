import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '../../../constants/colors';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text.primary,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name="content-details"
        options={{
          title: 'Content Details',
        }}
      />
    </Stack>
  );
}