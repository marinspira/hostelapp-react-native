import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { usePathname } from 'expo-router';

export default function NotFoundScreen() {

  const pathname = usePathname();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text >This screen doesn't exist.</Text>
        <Text>Current path: {pathname}</Text>
        <Link href="/public" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
