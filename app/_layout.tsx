import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

import { StatusBar } from 'expo-status-bar';

import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';

import { Provider } from 'react-redux';
import store from '@/redux/store'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStorageState } from '@/hooks/useStorageState';
import { User } from '@/redux/slices/user/interfaces';

SplashScreen.preventAutoHideAsync();

type ToastProps = {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
};

export const showToast = ({ type, title, message }: ToastProps): void => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [[loading, storedUser], setStoredUser] = useStorageState('user');
  const user = storedUser ? (JSON.parse(storedUser) as User) : null;

  const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsBold: Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || loading) {
    return null;
  }

  return (
    <Provider store={store}>
      <Toast />
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {user?.role === 'guest' ? (
            <>
              <Stack.Screen name="guest" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </>
          ) : user?.role === 'host' ? (
            <>
              <Stack.Screen name="host" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </>
          ) : (
            <>
              <Stack.Screen name="publicScreens" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </>
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
