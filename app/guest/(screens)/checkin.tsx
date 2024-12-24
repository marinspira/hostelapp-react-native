import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FormUser from '@/components/guest/formGuest';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n';
import { User } from '@/redux/slices/user/interfaces';
import { useStorageState } from '@/hooks/useStorageState';
import SimpleButton from '@/components/buttons/SimpleButton';
import InputDate from '@/components/inputs/inputDate';
import { useDispatch, useSelector } from 'react-redux';
import { GuestState } from '@/redux/slices/guest/interfaces';
import { updateField } from '@/redux/slices/guest/slice';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import InputImage from '@/components/inputs/inputImage';
import InputCheckbox from '@/components/inputs/inputCheckbox';

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

  useEffect(() => {
    console.log(isOfAge)
  }, [])

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
          <View style={styles.userContent}>
            <InputImage
              borderRadius='100%'
              onChange={() => console.log('change')}
              imgWidth={75}
              defaultImg={user?.picture}
            />
            <View>
              <Text style={styles.userName}>{user?.name} Maria Eduarda</Text>
              <Text style={styles.suportText}>Complete seu perfil</Text>
            </View>
          </View>
          <InputDate
            label={t('Seu aniversário')}
            onChange={(value) => handleChange('birthday', value)}
          />
          <FormUser inputs={{ from: true, passaportImg: true }} />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <InputCheckbox
            text={t('Permitir que outros hóspedes vejam você? (Você só verá outros hóspedes se essa opção estiver ativada)')}
            onChange={() => console.log('teste')}
            initialChecked={true}
          />
          <SimpleButton
            text={t('Continuar')}
            onPress={handleForm}
            disabled={!isOfAge || !guest.birthday}
            width='100%'
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
    marginTop: 10
  },
  userName: {
    fontFamily: 'PoppinsBold',
    fontSize: 25,
  },
  userContent: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  checkinText: {
    fontFamily: 'PoppinsBold',
    color: Colors.purple,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 10
  },
  text: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular'
  },
  suportText: {
    marginLeft: 5,
    fontSize: 16
  },
  buttonContainer: {
    marginTop: 10,
    gap: 10,
    width: '100%',
  }
});
