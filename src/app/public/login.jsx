import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native'

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import '@/assets/translations/i18n'
import Logo from '@/assets/images/illustrations/undraw/cabin.svg'

import SimpleButton from '@/src/components/ui/Button'

import IOSAuthentication from '@/src/components/features/Authentication/Apple';
import GoogleAuthentication from '@/src/components/features/Authentication/Google';
import LocalhostLogin from '@/src/components/features/Authentication/Localhost';

function LoginScreen() {

  const { role } = useLocalSearchParams();
  const { t } = useTranslation();

  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    if (!user) {
      return
    } else {
      if (user.role === 'guest') {
        if (user.isNewUser) {
          router.replace('/guest/(screens)/checkin');
        } else {
          router.replace('/guest/(tabs)');
        }
      }

      if (user.role === 'host') {
        if (user.isNewUser) {
          router.replace('/host/hostel/create');
        } else {
          router.replace('/host/(tabs)');
        }
      }
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Logo width={120} height={120} />
      <Text style={styles.title}>Logar como {role === 'guest' ? 'Hóspede' : 'Host'}</Text>

      {Platform.OS === 'ios' && <IOSAuthentication role={role} />}
      <GoogleAuthentication role={role} />
      <LocalhostLogin role={role} />

      <SimpleButton
        text={role === "guest" ? t("Não é hospede? Logar como host") : t("Não é host? Logar como hóspede")}
        onPress={() => router.push("/public")}
        backgroundColor="transparent"
        textColor='#000'
        fontSize={16}
      />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontFamily: 'PoppinsRegular',
    marginTop: 30,
    fontSize: 26,
    marginBottom: 40
  },
})