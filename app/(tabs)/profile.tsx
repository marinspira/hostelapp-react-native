import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Tabs from '@/components/tabs';
import FormUser from '@/components/formUser';
import FormStaff from '@/components/formStaff';

export default function Profile() {

  const tabData = [
    { label: 'CHECK IN', content: <FormUser /> },
    { label: 'STAFF AREA', content: <FormStaff /> },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/me.jpg')}
          style={styles.imageProfile}
        />
      }>
      <ThemedView style={styles.userDataContainer}>
        <ThemedText type="title">Maria Eduarda, 21 </ThemedText>
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
