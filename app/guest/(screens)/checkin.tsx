import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Tabs from '@/components/guest/tabs';
import FormUser from '@/components/guest/formGuest';
import FormStaff from '@/components/guest/formStaff';
import { useDispatch, useSelector } from 'react-redux';
import { GuestState } from '@/redux/slices/guest/interfaces';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { updateField } from '@/redux/slices/guest/slice';

export default function Checkin() {

  const { t, i18n } = useTranslation();

  const user = useSelector((state: { user: GuestState }) => state.user)
  const dispatch = useDispatch()

  const tabData = [
    { label: 'CHECK IN', content: <FormUser /> },
    { label: t('Área do funcionário'), content: <FormStaff /> },
  ];

  function handleImages(value: string | string[] | null) {
    dispatch(updateField({ key: 'guestPhotos', value }))
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
        {(user.name && user.birthday) && <ThemedText type="title">Maria Eduarda, 21 </ThemedText>}
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
