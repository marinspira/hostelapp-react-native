import EventList from '@/src/components/guest/eventList'
import ProfilesSlide from '@/src/components/guest/profilesLikes'
import profileDefault from '@/assets/images/unnamed.png'
import Greetings from '@/src/components/greetings'
import { useSelector } from 'react-redux';
import { UserState } from '@/src/interfaces/user';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { useTheme } from '@/src/hooks/useTheme';
import ThemeSwitch from '@/src/components/themeSwitch';
import Container from '@/src/components/container';
import defaultImg from '@/assets/images/unnamed.png';
import { useGetHome } from '@/src/services/guest/getHome';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Title from '@/src/components/guest/text/title';

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
      // supportText={home === null ?
      //   t("Voce nao esta hospedada em nenhum hostel! :(")
      //   :
      //   `${t("Voce esta hospedada em ")} ${home?.hostel?.name}`
      // }
      />
      <Pressable onPress={getHome}>
        {/* <Title title={t('Conecte-se para explorar')} text={t("Hospede-se em um hostel que usa nossos serviços e desfrute das nossas funcionalides")} marginTop={40} /> */}
        {/* <ProfilesSlide /> */}
        {/* <EventList title={t('Eventos perto de você')} data={events} btnText='Join' /> */}

      </Pressable>
    </Container>
  );
}