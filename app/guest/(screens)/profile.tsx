import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Tabs from '@/components/guest/tabs';
import FormUser from '@/components/guest/formGuest';
import FormStaff from '@/components/guest/formStaff';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { getGuest } from '@/redux/slices/guest/slice'
import Slide from '@/components/slide';
import Input from '@/components/inputs/input';
import FormGuest from '@/components/guest/formGuest';
import { useTheme } from '@/hooks/useThemeColor';
import FormPersonal from '@/components/guest/formPersonal';

export default function Profile() {

  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.user.data)
  const guest = useSelector((state: RootState) => state.guest.data)
  const dynamicStyles = useTheme()

  const dispatch = useDispatch<AppDispatch>()

  const tabData = [
    { label: 'Check in', content: <FormUser /> },
    { label: 'Personal', content: <FormPersonal /> },
    { label: t('Área do funcionário'), content: <FormStaff /> },
  ];

  const fetchUserData = async () => {
    const result = await dispatch(getGuest())
    if (result) {
      console.log('guest', guest)
    } else {
      console.error('Error fetching guest data')
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const formattedGuestPhotos = guest?.guestPhotos?.map((photo, index) => ({
    id: index.toString(),
    url: photo,
  }));

  return (
    <ParallaxScrollView imagesArray={formattedGuestPhotos} >
      <View style={[styles.userDataContainer, dynamicStyles.container]}>
        <Text>{user?.name}</Text>
        <Tabs tabs={tabData} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  userDataContainer: {
    flexDirection: 'column',
    gap: 8,
  },
});
