import { StyleSheet, View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '@/src/interfaces/user';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import defaultImg from '@/assets/images/unnamed.png';
import profileDefault from '@/assets/images/unnamed.png'
import InputSearch from '@/src/components/inputs/inputSearch';
import { router } from 'expo-router';
import ButtonCreate from '@/src/components/buttons/ButtonCreate';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/src/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/src/hooks/useTheme';
import { AppDispatch } from '@/src/redux/store';
import { getHostel } from '@/src/redux/slices/hostel';
import { useEffect } from 'react';

export default function HostHomeScreen() {

  const { t } = useTranslation();
  const dynamicStyles = useTheme()
  const user = useSelector((state: { user: User }) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  const fetchHostel = async () => {
    const result = await dispatch(getHostel())
  }

  useEffect(() => {
    fetchHostel()
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: Colors.light.tint, flex: 1 }}>
      <StatusBar style="light" />
      <View style={{ minHeight: '100%', backgroundColor: "white" }}>
        <ScrollView >
          <View style={styles.banner} />
          <View style={styles.searchBar}>
            <InputSearch
              placeholder='Search guest by @tag or e-mail'
              onPress={() => router.push('/host/(screens)/searchGuest')}
            />
          </View>
          <Pressable onPress={fetchHostel}>
            <Text>aqui</Text>
          </Pressable>
        </ScrollView>
        <ButtonCreate
          bottom={170}
          subButtons={[
            {
              text: t('Guest'),
              icon: <FontAwesome name="user-o" size={16} color="white" />,
              onPress: () => router.push('/host/(screens)/searchGuest')
            },
            {
              text: t('Room'),
              icon: <MaterialIcons name="bed" size={16} color="white" />,
              onPress: () => router.push('/host/(screens)/allRooms')
            },
            {
              text: t('Rol'),
              icon: <FontAwesome name="desktop" size={14} color="white" />,
              onPress: () => router.push('/host/(screens)/searchGuest')
            },
            {
              text: t('Event'),
              icon: <MaterialIcons name="event" size={16} color="white" />,
              onPress: () => router.push('/host/(screens)/event/all')
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  banner: {
    backgroundColor: Colors.light.tint,
    minHeight: 150,
  },
  searchBar: {
    marginTop: -30,
    paddingHorizontal: 20,
    marginBottom: 30
  }
});
