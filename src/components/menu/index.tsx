import { router, Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ButtonCreate from '../buttons/ButtonCreate';
import { useTranslation } from 'react-i18next';
import { useFeatureFlag } from '@/src/hooks/useFeatureFlag';

interface MenuProps {
  tabIcons: any,
  role: string
}

export default function Menu({ tabIcons, role }: MenuProps) {

  const { t } = useTranslation()

  const showRoomFeatures = useFeatureFlag('rooms');
  const showEventFeatures = useFeatureFlag('events');
  const showReservationFeatures = useFeatureFlag('reservation');

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
            bottom: 15,
            borderColor: '#000',
            paddingTop: 8
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
            tabBarIcon: ({ color, focused }) => {
              if (role === "host" && route === 'index') {
                return (
                  <>
                    {focused ? (
                      <ButtonCreate
                        menuBtn
                        bottom={0}
                        subButtons={[
                          ...(showRoomFeatures ? [{
                            text: t('Room'),
                            onPress: () => router.push('/host/(screens)/allRooms')
                          }] : []),
                          ...(showReservationFeatures ? [{
                            text: t('Guest'),
                            onPress: () => router.push('/host/(screens)/searchGuest')
                          }] : []),
                          ...(showEventFeatures ? [{
                            text: t('Event'),
                            onPress: () => router.push('/host/(screens)/event/all')
                            // icon: <MaterialIcons name="event" size={16} color="white" />,
                          }] : []),
                        ]}
                      />
                    ) : (
                      <View style={[focused ? styles.activeContainer : styles.iconContainer]}>
                        <AntDesign name="home" size={30} color={focused ? '#fff' : color} />
                      </View>
                    )}
                  </>
                );
              }

              return (
                <TabIcon color={color} focused={focused} name={icon} />
              );
            },
          }}
        />
      ))}
    </Tabs>
  );
}

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
    flex: 1
  },
  activeContainer: {
    backgroundColor: '#9370DB',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: -5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#000',
  },
});
