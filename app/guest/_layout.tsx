import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function GuestLayout() {
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    if (!user) {
      return router.push('/public')
    }
  }, [user])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/checkin" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/profile" options={{ headerShown: false }} />
    </Stack>
  );
}
