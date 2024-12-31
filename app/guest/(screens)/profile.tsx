import { Image, StyleSheet, Text, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Tabs from '@/components/guest/tabs';
import FormUser from '@/components/guest/formGuest';
import FormStaff from '@/components/guest/formStaff';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { getGuest } from '@/redux/slices/guest/slice'
import Slide from '@/components/slide';

export default function Profile() {

  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.user.data)
  const guest = useSelector((state: RootState) => state.guest.data)

  const dispatch = useDispatch<AppDispatch>()

  const tabData = [
    { label: 'CHECK IN', content: <FormUser /> },
    { label: t('Área do funcionário'), content: <FormStaff /> },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await dispatch(getGuest())
      if (result) {
        console.log('guest', guest)
      } else {
        console.error('Error fetching guest data')
      }
    }
    console.log('fotos', guest.guestPhotos)
    fetchUserData()
  }, [])

  const formattedGuestPhotos = guest?.guestPhotos?.map((photo, index) => ({
    id: index.toString(),
    url: photo,
  }));

  return (
    <ParallaxScrollView imagesArray={formattedGuestPhotos} >
      <View style={styles.userDataContainer}>
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
    backgroundColor: 'white'
  },
  imageProfile: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
