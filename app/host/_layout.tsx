import React, { useEffect } from 'react';
import { Stack, Redirect } from 'expo-router';
import { useStorageState } from '@/hooks/useStorageState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../_layout';

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
    showToast({
      type: 'error',
      title: 'Você é hóspede ou host?',
      message: 'Esse usuário está cadastrado como Hóspede. Faça login como hóspede ou acesse com outra conta.'
    })
    return (
      <Redirect href="/publicScreens/welcome" />
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="screens" options={{ headerShown: false }} />
    </Stack>
  );
}
