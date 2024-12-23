import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';

import { Provider } from 'react-redux';
import store from '@/redux/store'
import Toast from 'react-native-toast-message';
import { useStorageState } from '@/hooks/useStorageState';
import { User } from '@/redux/slices/user/interfaces';

SplashScreen.preventAutoHideAsync();

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
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        <Toast
          position='top'
          topOffset={60}
          visibilityTime={4000}
        />
      </ThemeProvider>
    </Provider>
  );
}
