import React from 'react';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store'
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsBold: Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Slot />
          <Toast
            position='top'
            topOffset={60}
            visibilityTime={4000}
          />
      </PersistGate>
    </Provider>
  );
}
