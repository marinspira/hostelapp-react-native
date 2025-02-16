import EventList from '@/components/guest/eventList'
import ProfilesSlide from '@/components/guest/profilesLikes'
import profileDefault from '@/assets/images/unnamed.png'
import Greetings from '@/components/greetings'
import { useSelector } from 'react-redux';
import { UserState } from '@/redux/slices/user/interfaces';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { useTheme } from '@/hooks/useThemeColor';
import ThemeSwitch from '@/components/themeSwitch';
import Container from '@/components/container';

export default function HomeScreen() {

  const { t, i18n } = useTranslation();
  const dynamicStyles = useTheme();

  const user = useSelector((state: { user: UserState }) => state.user.data)

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
    <Container>
      <Greetings username={user?.name} />
      <ProfilesSlide title={t('Converse com quem está hospedado com você')} />
      <EventList title={t('Eventos perto de você')} data={events} btnText='Join' />
    </Container>
  );
}