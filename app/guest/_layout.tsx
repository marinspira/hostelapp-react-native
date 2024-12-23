import React from 'react';
import { Stack } from 'expo-router';

export default function GuestLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/checkin" options={{ headerShown: false }} />
    </Stack>
  );
}
