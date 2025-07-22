import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import '@/assets/translations/i18n';
import { router } from 'expo-router';

import { saveGuest, updateGuestField, uploadGuestImage } from '@/src/redux/slices/guest';
import { logout } from '@/src/redux/slices/user';
import { AppDispatch, persistor, RootState } from '@/src/redux/store';

import { useFormatDate } from '@/src/hooks/useFormateDate';
import { useTheme } from '@/src/hooks/useTheme';

import Button from '@/src/components/ui/Button';
import InputDate from '@/src/components/forms/InputsV1/inputDate';
import FormUser from '@/src/components/forms/FormGuest';
import InputImage from '@/src/components/forms/Inputs/Image';
import InputCheckbox from '@/src/components/forms/InputsV1/inputCheckbox';
import { showToast } from '@/src/components/layout/ToastNotification';
import { useUploadGuestImages } from '@/src/services/guest/uploadProfileImages';

export default function Checkin() {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user.data);
  const guest = useSelector((state: RootState) => state.guest.data);
  const dispatch = useDispatch<AppDispatch>();

  const handleUploadGuestImages = useUploadGuestImages();

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
    if (!guest.birthday || !guest.country) {
      showToast({
        type: 'error',
        title: t('Formulário incompleto'),
        message: t('Por favor, preencha sua data de nascimento e origem.')
      })

      return
    }

    if (isTooYoung) {
      const handleLogout = async () => {
        try {
          dispatch(logout()).unwrap();
          await persistor.purge();

        } catch (err) {
          console.error('Logout failed:', err);
        }
      }

      handleLogout()
      return
    }

    save()
  }

  const save = async () => {
    try {
      const result = await dispatch(saveGuest()).unwrap();
      router.replace('/guest/(tabs)');
    } catch (error) {
      console.error("Erro ao salvar convidado:", error);
    }
  };

  const dynamicStyles = useTheme()

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <StatusBar style='dark' />
      <View style={[dynamicStyles.container, styles.container]}>
        <Text style={[styles.checkinText, dynamicStyles.textUppercase]}>Check in</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.userContent}>
            <InputImage
              id='0'
              borderRadius={9999}
              imgWidth={75}
              defaultImg={guest?.guestPhotos?.[0]}
              onUpload={handleUploadGuestImages}
            />
            <View>
              <Text style={dynamicStyles.title}>{user?.name}</Text>
              <Text style={dynamicStyles.text}>{t('Complete seu perfil')}</Text>
            </View>
          </View>
          <InputDate
            label={t('Seu aniversário')}
            onChange={(value) => handleChange('birthday', useFormatDate(value))}
            errorMessage={t('Você deve ser maior que 16 anos para prosseguir.')}
            maximumDate={new Date('2008-01-01')}
            suportText={t('Você só pode alterar esse campo uma vez. Necessário ser +16.')}
          />
          <FormUser />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <InputCheckbox
            text={t('Permitir que outros hóspedes vejam você? (Você só verá outros hóspedes se essa opção estiver ativada)')}
            onChange={(value) => handleChange('showProfileAuthorization', value)}
            initialChecked={true}
          />
          <Button
            text={t('Continuar')}
            onPress={handleForm}
            // disabled={!guest.birthday && !guest.country}
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
    height: '100%',
    justifyContent: 'space-between'
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
    width: '100%',
    textAlign: 'center',
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
