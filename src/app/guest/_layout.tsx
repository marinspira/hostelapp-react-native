import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { showToast } from '@/src/components/layout/ToastNotification';

export default function GuestLayout() {
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
      <Stack.Screen name="(screens)/checkin" options={{ headerShown: false }} />
      <Stack.Screen name="(screens)/profile" options={{ headerShown: false }} />
    </Stack>
  );
}
