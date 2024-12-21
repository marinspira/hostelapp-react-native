import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {

  return (
    <>
    <StatusBar style="dark" />
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="introduction" options={{ headerShown: false }} />
    </Stack>
  </>
  );
}