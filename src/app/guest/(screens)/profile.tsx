import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppDispatch, RootState } from '@/src/redux/store';
import { getGuest } from '@/src/redux/slices/guest'

import ParallaxScrollView from '@/src/components/layout/ParallaxScrollView';
import Tabs from '@/src/components/ui/Tabs';
import FormGuest from '@/src/components/forms/FormGuest';
import FormPersonal from '@/src/components/forms/FormPersonal';

export default function Profile() {

  const { t } = useTranslation();
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