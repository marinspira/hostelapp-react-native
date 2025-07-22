import InputImage from '@/src/components/inputs/inputImage';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import countries from '@/src/utils/coutries'
import Container from '@/src/components/container';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { createHostel } from '@/src/redux/slices/hostel';
import { MultiStepFormContainer } from '@/src/components/multiForm/MultiStepFormContainer';
import { MultiStepFormStep } from '@/src/components/multiForm/MultiStepFormStep';
import z from 'zod';
import { FormInput } from '@/src/components/inputs/FormInput';
import { FormSelect } from '@/src/components/inputs/FormSelect';
import { FormMultiSelect } from '@/src/components/inputs/FormMultiSelect';
import { FormCheckbox } from '@/src/components/inputs/FormCheckbox';
import { Hostel } from '@/src/interfaces/hostel';
import { useRouter } from 'expo-router';

export default function CreateHostel() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState(null)
  const router = useRouter()

  const step1Schema = z.object({
    name: z.string().min(1, t("O nome do hostel é obrigatório")),
    email: z.string().email()
  });

  const step2Schema = z.object({
    zip: z.string().min(5, t("CEP inválido")),
    street: z.string().min(1, t("Endereço obrigatório")),
    city: z.string().min(1, t("Cidade obrigatória")),
    country: z.string().min(1, t("País obrigatório")),
  });

  const step3Schema = z.object({
    website: z
      .string()
      .min(1, t("O site é obrigatório"))
      .url(t("URL inválida")),
    experience_with_volunteers: z.union([
      z.boolean(),
      z.string().array().nonempty(t("Escolha pelo menos uma opção")),
    ]),
    policies: z.literal(true, {
      errorMap: () => ({ message: t("Você deve aceitar as políticas de privacidade") }),
    }),
  });

  const handleImageUpload = useCallback((img: any) => {
    setImage(img);
  }, []);

  const sendForm = async (data: Hostel): Promise<void> => {
    try {
      const response = await dispatch(createHostel({ data, image })).unwrap();
      router.push(`/host/(tabs)`)
    } catch (err) {
      console.error('Erro ao criar hostel:', err);
    }
  };

  return (
    <Container scrollable={false}>
      <MultiStepFormContainer
        onSubmit={(data) => sendForm(data)}
        steps={[
          {
            id: "step1",
            schema: step1Schema,
            component: (
              <MultiStepFormStep title={t("Registre seu Hostel")}>
                <View style={{ alignItems: "center" }}>
                  <InputImage
                    id='hostelImage'
                    borderRadius={9999}
                    onUpload={handleImageUpload}
                    imgWidth={150}
                    imgPickerBtnText="LOGO"
                  />
                </View>
                <FormInput
                  name="name"
                  key="name"
                  label={t("Nome do seu hostel")}
                  placeholder="HostelApp"
                />
                <FormInput
                  name="email"
                  key="email"
                  label={t("E-mail do seu hostel")}
                  placeholder="help@hostelapp.io"
                />
              </MultiStepFormStep>
            ),
          },
          {
            id: "step2",
            schema: step2Schema,
            component: (
              <MultiStepFormStep title={t("Qual endereço do seu hostel?")}>
                <FormInput
                  name="zip"
                  key="zip"
                  label={t("CEP")}
                  placeholder="2000-000"
                />
                <FormInput
                  name="street"
                  key="street"
                  label={t("Endereço")}
                  placeholder="Av. Paulista"
                />
                <FormInput
                  name="city"
                  key="city"
                  label={t("Cidade")}
                  placeholder="São Paulo"
                />
                <FormSelect
                  name="country"
                  label={t("País")}
                  options={countries}
                />
              </MultiStepFormStep>
            ),
          },
          {
            id: "step3",
            schema: step3Schema,
            component: (
              <MultiStepFormStep title={t("Só mais algumas informações...")}>
                <Text></Text>
                <FormInput
                  name="website"
                  key="website"
                  label={t("Qual é o site do seu hostel?")}
                  placeholder="https://hostelapp.io"
                />
                <FormMultiSelect
                  name="experience_with_volunteers"
                  label={t("Você já teve voluntários antes?")}
                  boolean
                />
                <FormCheckbox
                  name="policies"
                  label={t("Ao continuar você concorda com as políticas de privacidade e cookies.")}
                />
              </MultiStepFormStep>
            ),
          },
        ]}
      />
    </Container>
  );
}
