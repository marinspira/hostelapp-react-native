import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventList from '@/components/eventList'
import ProfilesSlide from '@/components/profilesSlide'
import profileDefault from '@/assets/images/unnamed.png'
import Greetings from '@/components/greetings'
import { useSelector } from 'react-redux';
import { UserState } from '@/redux/slices/user/userSlice';

export default function HomeScreen() {

  const user = useSelector((state: { user: UserState }) => state.user)

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
      imgs: ['', ''],
      date: 'HOJE'
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
      imgs: ['', ''],
      date: 'HOJE'
    },
  ]

  return (
    <SafeAreaView>
      <View>
        <ScrollView style={styles.container}>
          <Greetings user={user} />
          <ProfilesSlide style='' title="Chat with who is staying with you" />
          <EventList title='What is happening near you' data={events} btnText='Join' />
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
