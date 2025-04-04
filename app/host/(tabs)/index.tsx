import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Greetings from '@/components/greetings'
import { useSelector } from 'react-redux';
import { User } from '@/redux/slices/user/interfaces';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import defaultImg from '@/assets/images/unnamed.png';
import EventList from '@/components/guest/eventList';
import profileDefault from '@/assets/images/unnamed.png'
import GuestList from '@/components/host/guestList'
import GuestList2 from '@/components/host/guestList/2'

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
          {/* <Text>Lista de guest</Text>
          <GuestList/>
          <GuestList2/>
          <Text>Add a new guest by tag (username), email ou telefone</Text>
          <Text>Posições para voluntariados</Text>
          <Text>Eventos do seu hostel</Text>
          <EventList title={t('Eventos do seu hostel')} data={events} btnText='Join' />

          <Text>Gerenciar voluntários</Text> */}
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
