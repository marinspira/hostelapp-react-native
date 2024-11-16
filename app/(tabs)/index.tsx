import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Tabs from '@/components/tabs';
import AboutUser from '@/components/aboutUser';

export default function HomeScreen() {

  const tabData = [
    { label: 'About', content: <AboutUser /> },
    { label: 'Reviews', content: 'Este é o conteúdo da Tab 2. Você pode personalizar esse texto conforme sua necessidade.' },
    { label: 'Staff', content: 'Este é o conteúdo da Tab 3. Aproveite para adicionar mais informações ou funcionalidades aqui.' },
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
        <ThemedText type="title">Maria</ThemedText>
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
