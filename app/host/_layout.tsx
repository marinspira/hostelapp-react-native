import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function HostLayout() {
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    if (!user) {
      return router.push('/public')
    }
  }, [])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/createHostel" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/waitingApproval" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/searchGuest" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/rooms" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/[chat]" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/createPosition" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/createEvent" options={{ headerShown: false }} />
    </Stack>
  );
}
