import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { showToast } from '@/src/components/toast';

export default function HostLayout() {
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
      if (user) {
        if (user.isNewUser) {
          router.push(user.role === 'guest' ? '/guest/(screens)/checkin' : '/host/hostel/create');
        } else {
          router.push(user.role === 'guest' ? '/guest/(tabs)' : '/host/(tabs)');
        }
      } else {
        console.log('Nenhum user encontrado. User:', user);
        showToast({
          type: 'error',
          title: 'Any user connected',
          message: 'Please contact the suport.',
        });
        router.push('/public');
      }
    }, [user]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/room/list" options={{ headerShown: false }} />

      <Stack.Screen name="(screens)/hostel/create" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/volunteer/create" options={{ headerShown: false }} />

      <Stack.Screen name="(screens)/waitingApproval" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/guest/searchGuest" options={{ headerShown: false }} />

      <Stack.Screen name="(screens)/[chat]" options={{ headerShown: false }} />

      <Stack.Screen name="(screens)/event/all" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/event/create" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/event/[event]" options={{ headerShown: false }} />
    </Stack>
  );
}
