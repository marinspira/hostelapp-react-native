import ParallaxScrollView from '@/components/ParallaxScrollView';
import Tabs from '@/components/guest/tabs';
import FormGuest from '@/components/guest/formGuest';
import FormStaff from '@/components/guest/formStaff';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { getGuest } from '@/redux/slices/guest/slice'
import { useTheme } from '@/hooks/useTheme';
import FormPersonal from '@/components/guest/formPersonal';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import converteDateToAge from '@/utils/converteDateToAge';
import { StatusBar } from 'expo-status-bar';

export default function Profile() {

  const { t, i18n } = useTranslation();
  const guest = useSelector((state: RootState) => state.guest.data)
  const user = useSelector((state: RootState) => state.user.data)

  const dispatch = useDispatch<AppDispatch>()

  const tabData = [
    { label: 'Check in', content: <FormGuest /> },
    { label: t('Personal'), content: <FormPersonal /> },
    { label: t('Área do funcionário'), content: <FormStaff /> },
  ];

  const fetchUserData = async () => {
    const result = await dispatch(getGuest())
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const formattedGuestPhotos = guest?.guestPhotos?.map((photo, index) => ({
    id: index.toString(),
    url: photo,
  }));

  return (
    <ParallaxScrollView
      button={true}
      textOverImage={`${user?.name}, ${converteDateToAge(guest?.birthday as string)}`} imagesArray={formattedGuestPhotos}
    >
      <StatusBar style='light' />
      <Tabs tabs={tabData} />
    </ParallaxScrollView>
  );
}