import React, { useEffect } from 'react';
import { Stack, Redirect } from 'expo-router';
import { useStorageState } from '@/hooks/useStorageState';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HostLayout() {
  const [[loading, storedUser], setStoredUser] = useStorageState('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const handleInvalidUser = async () => {
      if (!loading && (!user || user.role !== 'host')) {
        await AsyncStorage.removeItem('user');
        setStoredUser(null);
      }
    };

    handleInvalidUser();
  }, [loading, user, setStoredUser]);

  if (loading) {
    return null;
  }

  if (!user || user.role !== 'host') {
    return <Redirect href="/publicScreens/welcome" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="screens" options={{ headerShown: false }} />
    </Stack>
  );
}
