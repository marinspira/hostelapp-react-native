import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FormUser from '@/components/guest/formGuest';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n';
import SimpleButton from '@/components/buttons/SimpleButton';
import InputDate from '@/components/inputs/inputDate';
import { useDispatch, useSelector } from 'react-redux';
import { GuestState } from '@/redux/slices/guest/interfaces';
import { updateGuestField } from '@/redux/slices/guest/slice';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import InputImage from '@/components/inputs/inputImage';
import InputCheckbox from '@/components/inputs/inputCheckbox';
import { useFormatDate } from '@/hooks/useFormateDate';
import { logout } from '@/redux/slices/user/slice';
import { AppDispatch, RootState } from '@/redux/store';

export default function Checkin() {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user.data);
  const guest = useSelector((state: { guest: GuestState }) => state.guest);
  const dispatch = useDispatch<AppDispatch>();

  const [isTooYoung, setIsTooYoung] = useState(false);

  function handleChange(key: any, value: any) {
    // Verify if +16
    if (key === 'birthday') {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const isOlderThan16 = age > 16 || (age === 16 && today >= new Date(birthDate.setFullYear(today.getFullYear())));
      setIsTooYoung(isOlderThan16);
    }

    dispatch(updateGuestField({ key, value }));
  }

  function handleForm() {
    if (isTooYoung) {
      alert(t('Você deve ter mais de 16 anos para continuar.'));

      const handleLogout = async () => {
        try {
          dispatch(logout()).unwrap();
        } catch (err) {
          console.error('Logout failed:', err);
        }
      }

      handleLogout()
      return
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <Text style={styles.checkinText}>Check in</Text>
        <ScrollView style={styles.scrollView}>
          <View style={styles.userContent}>
            <InputImage
              id='0'
              borderRadius='100%'
              imgWidth={75}
              defaultImg={guest?.guestPhotos?.[0]}
              endpoit='/api/guest/saveGuestProfileImages'
            />
            <View>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.suportText}>{t('Complete seu perfil')}</Text>
            </View>
          </View>
          <InputDate
            label={t('Seu aniversário')}
            onChange={(value) => handleChange('birthday', useFormatDate(value))}
            errorMessage={t('Você deve ser maior que 16 anos para prosseguir.')}
            maximumDate={new Date('2008-01-01')}
            suportText={t('Você só pode alterar esse campo uma vez. Necessário ser +16.')}
          />
          <FormUser inputs={{ from: true, passaportImg: true }} />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <InputCheckbox
            text={t('Permitir que outros hóspedes vejam você? (Você só verá outros hóspedes se essa opção estiver ativada)')}
            onChange={(value) => handleChange('showProfileAuthorization', value)}
            initialChecked={true}
          />
          <SimpleButton
            text={t('Continuar')}
            onPress={handleForm}
            disabled={!guest.birthday}
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
