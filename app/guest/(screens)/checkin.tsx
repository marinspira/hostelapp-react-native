import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FormUser from '@/components/guest/formGuest';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n';
import { User } from '@/redux/slices/user/interfaces';
import Human from '@/assets/images/illustrations/undraw/human.svg';
import { useStorageState } from '@/hooks/useStorageState';
import SimpleButton from '@/components/buttons/SimpleButton';
import InputDate from '@/components/guest/inputDate';
import { useDispatch, useSelector } from 'react-redux';
import { GuestState } from '@/redux/slices/guest/interfaces';
import { updateField } from '@/redux/slices/guest/slice';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Checkin() {
  const { t } = useTranslation();
  const [[loading, storedUser]] = useStorageState('user');
  const user = storedUser ? (JSON.parse(storedUser) as User) : null;

  const guest = useSelector((state: { guest: GuestState }) => state.guest);
  const dispatch = useDispatch();

  const [isOfAge, setIsOfAge] = useState(false);

  function handleChange(key: any, value: any) {
    dispatch(updateField({ key, value }));

    // Verifica se a pessoa tem mais de 16 anos
    if (key === 'birthday') {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const isOlderThan16 = age > 16 || (age === 16 && today >= new Date(birthDate.setFullYear(today.getFullYear())));
      setIsOfAge(isOlderThan16);
    }
  }

  function handleForm() {
    if (!isOfAge) {
      alert(t('Você deve ter mais de 16 anos para continuar.'));
      return;
    }
    router.push('/guest/(tabs)');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <Text style={styles.checkinText}>Check in</Text>
        <ScrollView style={styles.scrollView}>
          {/* <Text style={styles.text}>Preencha as informações abaixo para agilizar seu checkin na hora da hospedagem e se conectar com outros hóspedes!</Text> */}
          <View style={styles.userContent}>
            {user?.picture ?
              <Image source={{ uri: user.picture }} style={styles.imageProfile} /> :
              <Human width={80} height={80} />
            }
            <View>
              <Text style={styles.userName}>{user?.name} Maria Eduarda</Text>
              <Text>Complete seu perfil</Text>
            </View>
          </View>
          <InputDate
            label={t('Seu aniversário')}
            onChange={(value) => handleChange('birthday', value)}
          />
          <FormUser inputs={{ from: true, passaportImg: true }} />
        </ScrollView>
        <SimpleButton
          text={t('Continuar')}
          onPress={handleForm}
          disabled={!isOfAge || !guest.birthday}
          width='100%'
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: '100%',
    justifyContent: 'space-between'
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    width: '100%',
    marginTop: 20
  },
  imageProfile: {
    height: 100,
    width: 100,
    objectFit: 'cover',
    borderRadius: 100,
  },
  userName: {
    // marginTop: 20,
    fontFamily: 'PoppinsBold',
    fontSize: 25,
  },
  userContent: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
    alignItems: 'center'
  },
  checkinText: {
    fontFamily: 'PoppinsBold',
    color: Colors.purple,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  text: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular'
  }
});
