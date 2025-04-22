import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import Tabs from '@/src/components/guest/tabs';
import FormGuest from '@/src/components/guest/formGuest';
import FormStaff from '@/src/components/guest/formStaff';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { AppDispatch, RootState } from '@/src/redux/store';
import { useEffect } from 'react';
import { getGuest } from '@/src/redux/slices/guest'
import { useTheme } from '@/src/hooks/useTheme';
import FormPersonal from '@/src/components/guest/formPersonal';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import converteDateToAge from '@/src/utils/converteDateToAge';
import { StatusBar } from 'expo-status-bar';

export default function Profile() {

  const { t, i18n } = useTranslation();
  const guest = useSelector((state: RootState) => state.guest.data)
  const user = useSelector((state: RootState) => state.user.data)

  const dispatch = useDispatch<AppDispatch>()

  const tabData = [
    { label: 'Check in', content: <FormGuest /> },
    { label: t('Personal'), content: <FormPersonal /> },
    // { label: t('Área do funcionário'), content: <FormStaff /> },
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
      textOverImage={`${user?.name}`} imagesArray={formattedGuestPhotos}
    >
      <StatusBar style='light' />
      <Tabs tabs={tabData} />
    </ParallaxScrollView>
  );
}