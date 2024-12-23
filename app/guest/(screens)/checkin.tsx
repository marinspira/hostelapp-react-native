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

export default function Checkin() {
  const { t } = useTranslation();
  const [[loading, storedUser]] = useStorageState('user');
  const user = storedUser ? (JSON.parse(storedUser) as User) : null;
  const teste = JSON.stringify(user)

  const getFromSecureStore = async () => {
    const result = await AsyncStorage.getItem('user');
    console.log('value:', result);
  };
  const guest = useSelector((state: { guest: GuestState }) => state.guest);
  const dispatch = useDispatch();

  useEffect(() => {
    getFromSecureStore()
  }, [])

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
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        {user?.picture ? (
          <Image source={{ uri: user.picture }} style={styles.imageProfile} />
        ) : (
          <Human width={100} height={100} />
        )}
        <Text>{teste}</Text>
        <Text style={styles.userName}>{user?.name}</Text>
        <InputDate
          label={t('Seu aniversário')}
          onChange={(value) => handleChange('birthday', value)}
        />
        <FormUser />
        <SimpleButton
          text={t('Continuar')}
          onPress={handleForm}
          disabled={!isOfAge || !guest.birthday}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  imageProfile: {
    height: 100,
    width: 100,
    objectFit: 'cover',
    borderRadius: 100,
  },
  userName: {
    marginTop: 20,
    fontFamily: 'PoppinsBold',
    fontSize: 25,
  },
});
