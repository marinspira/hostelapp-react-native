import Container from '@/components/container';
import { useTheme } from '@/hooks/useTheme';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function notifications() {

  const dynamicStyles = useTheme();

  return (
    <Container>
      <Text>Notifications</Text>
    </Container>
  )
}
