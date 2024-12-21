import { Redirect, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useStorageState } from '@/hooks/useStorageState';

export default function RootLayout() {

  const [[loading, storedUser]] = useStorageState('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (loading) {
    return null;
  }

  if (user?.role === 'host') {
    return <Redirect href="/host/(tabs)" />;
  } else if (user?.role === 'guest') {
    return <Redirect href="/guest/(tabs)" />;
  }

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