import '@/assets/translations/i18n'
import { Pressable } from 'react-native';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '@/src/interfaces/user';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/hooks/useTheme';
import { useGetHome } from '@/src/services/guest/getHome';

import EventList from '@/src/components/features/EventCardList'
import ProfilesSlide from '@/src/components/features/MatchesCarrousel'
import Greetings from '@/src/components/ui/Greetings'
import Container from '@/src/components/layout/Container';

type Person = {
  avatar: string;
};

type Event = {
  _id: string,
  img: string,
  price: number,
  name: string,
  date: string,
  attendees: any[],
  photos_last_event: any[]
};

export default function HomeScreen() {

  const { t, i18n } = useTranslation();
  const dynamicStyles = useTheme();

  const user = useSelector((state: { user: UserState }) => state.user.data)

  const { mutateAsync: getHomeMutation, isPending, error } = useGetHome()

  const [home, setHome] = useState()

  const guestsDefault = [
    { id: "1", img: '', name: 'Maria Fernanda', likes: ["3", "2", "4"] },
    { id: "2", img: '', name: 'João', likes: ["3", "4"] },
    { id: "3", img: '', name: 'Ana Cecília', likes: ["1", "2"] },
    { id: "4", img: '', name: 'Claudia', likes: ["1"] },
    { id: "5", img: '', name: 'José', likes: ["2", "3"] },
    { id: "6", img: '', name: 'Ana', likes: ["3", "4"] },
    { id: "7", img: '', name: 'Leila', likes: [] },
    { id: "8", img: '', name: 'Arthur', likes: [] },
    { id: "9", img: '', name: 'Ana', likes: [] },
  ];

  const getHome = async () => {
    try {
      const response = await getHomeMutation();
      setHome(response.data)
    } catch (err) {
      console.error('Error getting rooms:', err);
    }
  }
  // useEffect(() => {

  //   getHome()
  // }, [])

  return (
    <Container>
      <Greetings
        username={user?.name}
      />
      <Pressable onPress={getHome}>
        {/* <Title title={t('Conecte-se para explorar')} text={t("Hospede-se em um hostel que usa nossos serviços e desfrute das nossas funcionalides")} marginTop={40} /> */}
        {/* <ProfilesSlide /> */}
        {/* <EventList title={t('Eventos perto de você')} data={events} btnText='Join' /> */}

      </Pressable>
    </Container>
  );
}