import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { User } from '@/redux/slices/user/interfaces';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import defaultImg from '@/assets/images/unnamed.png';
import profileDefault from '@/assets/images/unnamed.png'
import InputSearch from '@/components/inputs/inputSearch';
import { router } from 'expo-router';
import ButtonCreate from '@/components/buttons/ButtonCreate';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/Colors';

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
      <View style={{ minHeight: '100%' }}>
        <ScrollView >
          <View style={styles.banner} />
          <View style={styles.searchBar}>
            <InputSearch
              placeholder='Search guest by @tag or e-mail'
              onPress={() => router.push('/host/(screens)/searchGuest')}
            />
          </View>
        </ScrollView>
        <ButtonCreate
          bottom={170}
          subButtons={[
            {
              text: 'Add guest',
              icon: <FontAwesome name="user-o" size={24} color="white" />,
              onPress: () => router.push('/host/(screens)/searchGuest')
            },
            {
              text: 'New room',
              icon: <MaterialIcons name="bed" size={24} color="white" />,
              onPress: () => router.push('/host/(screens)/rooms')
            },
            {
              text: 'New position',
              icon: <FontAwesome name="desktop" size={18} color="white" />,
              onPress: () => router.push('/host/(screens)/searchGuest')
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  banner: {
    backgroundColor: Colors.light.tint,
    minHeight: 150,
  },
  searchBar: {
    marginTop: -30,
    paddingHorizontal: 20,
    marginBottom: 30
  }
});
