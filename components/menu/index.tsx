import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface MenuProps {
  tabIcons: any
}

export default function Menu({ tabIcons }: MenuProps) {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#000',
            margin: 10,
            borderRadius: 25,
            height: 60,
            paddingVertical: 20,
            bottom: 10,
            borderColor: '#000'
          },
          default: {
            backgroundColor: '#000',
            position: 'absolute',
            bottom: 10,
            marginHorizontal: 10,
            borderRadius: 30,
            height: 60,
            paddingVertical: 10,
            paddingHorizontal: 4,
          },
        }),
      }}>
      {Object.entries(tabIcons).map(([route, icon]) => (
        <Tabs.Screen
          key={route}
          name={route}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} focused={focused} name={icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

// Componente para os ícones com o círculo ativo
function TabIcon({ name, color, focused }: { name: any; color: string; focused: boolean }) {
  return (
    <View style={[focused ? styles.activeContainer : styles.iconContainer]}>
      <AntDesign size={25} name={name} color={focused ? '#fff' : color} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  activeContainer: {
    backgroundColor: '#9370DB',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: -10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#000',
  },
});
