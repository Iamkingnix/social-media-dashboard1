import React from 'react';
import { Stack } from 'expo-router';
import { useAuthStore } from '../store/auth-store';

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => !!state.token);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(auth)"
        redirect={isAuthenticated}
      />
      <Stack.Screen
        name="(tabs)"
        redirect={!isAuthenticated}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}