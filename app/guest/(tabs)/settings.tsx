import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppDispatch, RootState } from '@/redux/store';
import { Feather, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import IconTextList from '@/components/IconTextList'
import { logout } from '@/redux/slices/user/slice';
import { router } from 'expo-router';
import profileDefault from '@/assets/images/unnamed.png';
import { StatusBar } from 'expo-status-bar';

export default function Settings() {

  const { t } = useTranslation();

  const user = useSelector((state: RootState) => state.user.data);
  const guest = useSelector((state: RootState) => state.guest.data);
  const dispatch = useDispatch<AppDispatch>()

  const settings = [
    {
      icon: <SimpleLineIcons name="plane" size={24} color="black" />,
      title: t('Suas viagens'),
      description: t('Relembre os lugares por onde você passou'),
      onPress: () => router.push('/')
    },
    {
      icon: <Feather name="star" size={24} color="black" />,
      title: t('Reviews'),
      description: t('Veja o que seus hosts falaram sobre você'),
      onPress: () => router.push('/')
    },
    {
      icon: <Feather name="user-check" size={24} color="black" />,
      title: t('Configurar assinatura'),
      description: t('Gerencie sua assinatura, planos e pagamentos.'),
      onPress: () => router.push('/')
    },
    {
      icon: <AntDesign name="questioncircleo" size={24} color="black" />,
      title: t('Como isso funciona'),
      description: t('Saiba mais sobre o funcionamento do aplicativo e seus recursos.'),
      onPress: () => router.push('/')
    },
    {
      icon: <Feather name="lock" size={24} color="black" />,
      title: t('Politicas e privacidade'),
      description: t('Conheça nossas políticas de privacidade e como seus dados são tratados.'),
      onPress: () => router.push('/')
    },
    {
      icon: <Feather name="headphones" size={24} color="black" />,
      title: t('Suporte'),
      description: t('Fale com nossa equipe de suporte para ajuda e dúvidas.'),
      onPress: () => router.push('/')
    },
    {
      icon: <SimpleLineIcons name="logout" size={24} color="black" />,
      title: t('Logout'),
      onPress: { handleLogout }
    },
  ];

  async function handleLogout() {
    try {
      dispatch(logout()).unwrap();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style='dark' />
      <ScrollView style={styles.container}>
        <View style={{ paddingBottom: 80 }}>
          <TouchableOpacity onPress={() => router.push('/guest/(screens)/profile')} style={styles.profile}>
            <Image source={{ uri: guest.guestPhotos?.[0] }} />
            <Image style={styles.image} source={profileDefault} />
            <View style={{paddingLeft: 20}}>
              <Text style={styles.name}>{user?.name}</Text>
              <Text style={styles.description}>{t('Ver perfil')}</Text>
            </View>
          </TouchableOpacity>
          <IconTextList content={settings} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100
  },
  name: {
    fontFamily: 'PoppinsBold',
    fontSize: 22,
  },
  description: {
    fontSize: 16
  }
});
