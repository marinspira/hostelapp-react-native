import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Tabs from '@/components/guest/tabs';
import FormUser from '@/components/guest/formGuest';
import FormStaff from '@/components/guest/formStaff';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { updateGuestField } from '@/redux/slices/guest/slice';
import { User } from '@/redux/slices/user/interfaces';
import { RootState } from '@/redux/store';

export default function Profile() {

  const { t, i18n } = useTranslation();

  const user = useSelector((state: RootState) => state.user.data)
  const guest = useSelector((state: RootState) => state.guest.data)
  const dispatch = useDispatch()

  const tabData = [
    { label: 'CHECK IN', content: <FormUser /> },
    { label: t('Área do funcionário'), content: <FormStaff /> },
  ];

  function handleImages(value: string | string[] | null) {
    dispatch(updateGuestField({ key: 'guestPhotos', value }))
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/me.jpg')}
          style={styles.imageProfile}
        />
      }
      onChangeImageInput={handleImages}
    >

      <ThemedView style={styles.userDataContainer}>
        {(user?.name && guest?.birthday) && <ThemedText type="title">Maria Eduarda, 21 </ThemedText>}
        <Tabs tabs={tabData} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  userDataContainer: {
    flexDirection: 'column',
    gap: 8,
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
