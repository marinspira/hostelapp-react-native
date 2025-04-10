import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { User } from '@/redux/slices/user/interfaces';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import defaultImg from '@/assets/images/unnamed.png';
import profileDefault from '@/assets/images/unnamed.png'
import InputSearch from '@/components/inputs/inputSearch';
import { router } from 'expo-router';

export default function HostHomeScreen() {

  const { t, i18n } = useTranslation();

  const user = useSelector((state: { user: User }) => state.user)

  type Person = {
    avatar: string;
  };

  type Event = {
    img: string;
    name: string;
    people: Person[];
    imgs: string[];
    date: string;
  };

  const events: Event[] = [
    {
      img: '',
      name: 'Aula de surf',
      people: [
        { avatar: profileDefault },
        { avatar: profileDefault },
        { avatar: profileDefault },
        { avatar: profileDefault },
      ],
      imgs: [defaultImg, defaultImg],
      date: 'HOJE',
    },
    {
      img: '',
      name: 'Aula de surf',
      people: [
        { avatar: profileDefault },
        { avatar: profileDefault },
        { avatar: profileDefault },
        { avatar: profileDefault },
      ],
      imgs: [defaultImg, defaultImg],
      date: 'HOJE'
    },
  ]

  return (
    <SafeAreaView>
      <View>
        <ScrollView style={styles.container}>
          <View>
            <InputSearch
              onPress={() => router.push('/host/(screens)/searchGuest')}
              placeholder='Find a new guest'
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  }
});
