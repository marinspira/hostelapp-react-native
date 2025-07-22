import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Feather, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import '@/assets/translations/i18n'

import { AppDispatch, RootState } from '@/src/redux/store';
import { useTheme } from '@/src/hooks/useTheme';
import { logout } from '@/src/redux/slices/user';

import IconTextList from '@/src/components/ui/IconTextList'
import ThemeSwitch from '@/src/components/ui/ThemeSwitch';
import Container from '@/src/components/layout/Container';

export default function Settings() {

  const { t } = useTranslation();

  const user = useSelector((state: RootState) => state.user.data);
  const guest = useSelector((state: RootState) => state.guest.data);
  const dispatch = useDispatch<AppDispatch>()

  const dynamicStyles = useTheme();

  const settings = [
    {
      icon: <Feather name="star" size={24} color={dynamicStyles.icon} />,
      title: t('Reviews'),
      description: t('Veja o que seus guests falaram sobre você'),
      onPress: () => router.push('/')
    },
    {
      icon: <Feather name="user-check" size={24} color={dynamicStyles.icon} />,
      title: t('Configurar assinatura'),
      description: t('Gerencie sua assinatura, planos e pagamentos'),
      onPress: () => router.push('/')
    },
    {
      icon: <AntDesign name="questioncircleo" size={24} color={dynamicStyles.icon} />,
      title: t('Como isso funciona'),
      description: t('Saiba mais sobre o funcionamento do aplicativo e seus recursos'),
      onPress: () => router.push('/')
    },
    {
      icon: <Feather name="headphones" size={24} color={dynamicStyles.icon} />,
      title: t('Suporte'),
      description: t('Fale com nossa equipe de suporte para ajuda e dúvidas'),
      onPress: () => router.push('/')
    },
    {
      icon: <AntDesign name="tool" size={24} color={dynamicStyles.icon} />,
      title: t('Reportar problema ou sugerir melhoria'),
      description: t('Encontrou algo que não está funcionando ou tem uma ideia para melhorar? Envie seu feedback aqui'),
      onPress: () => router.push('/')
    },
    {
      icon: <Feather name="lock" size={24} color={dynamicStyles.icon} />,
      title: t('Politicas e privacidade'),
      description: t('Conheça nossas políticas de privacidade e como seus dados são tratados'),
      onPress: () => router.push('/')
    },
    {
      icon: <SimpleLineIcons name="logout" size={24} color={dynamicStyles.icon} />,
      title: t('Logout'),
      onPress: () => handleLogout()
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
    <Container>
      <View style={{ paddingBottom: 80 }}>
        {/* <TouchableOpacity onPress={() => router.push('/guest/(screens)/profile')} style={styles.profile}>
          <Image
            style={styles.image}
            source={guest.guestPhotos?.[0] ? { uri: guest.guestPhotos?.[0] } : require('../../../assets/images/unnamed.png')}
          />
          <View style={{ paddingLeft: 20 }}>
            <Text style={[styles.name, dynamicStyles.text]}>{user?.name}</Text>
            <Text style={dynamicStyles.suportText}>{t('Ver perfil')}</Text>
          </View>
        </TouchableOpacity> */}
        <ThemeSwitch />
        <IconTextList content={settings} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
