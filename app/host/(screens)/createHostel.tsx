import MultiStepForm from '@/src/components/multiStepForm';
import Input from '@/src/components/inputs/input';
import InputImage from '@/src/components/inputs/inputImage';
import InputPhone from '@/src/components/inputs/inputPhone';
import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import countries from '@/src/utils/coutries'
import Container from '@/src/components/container';
import InputCheckbox from '@/src/components/inputs/inputCheckbox';
import SelectItens from '@/src/components/inputs/selectItens';
import { ActivityIndicator, Text } from 'react-native';
import { Hostel } from '@/src/interfaces/hostel';
import InputSelect from '@/src/components/inputs/inputSelect';
import { router } from 'expo-router';
import { updateUserField } from '@/src/redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { createHostel } from '@/src/redux/slices/hostel';

export default function CreateHostel() {

  const { t } = useTranslation();

  const [hostelData, setHostelData] = useState<Hostel>({
    name: '',
    username: "",
    currency: "",
    zip: '',
    street: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    experience_with_volunteers: undefined,
    policies: false,
    logo: ""
  });
  const { loading: isPending, error } = useSelector((state: RootState) => state.hostel);

  const [image, setImage] = useState(null)

  const handleImageUpload = useCallback((img: any) => {
    setImage(img);
    
    setHostelData(prev => ({
      ...prev,
      logo: img?.name || img?.uri || 'uploaded-image'
    }));
  }, []);

  const steps = useMemo(() => [
    {
      fields: [
        {
          component: InputImage,
          id: 'hostelImage',
          borderRadius: '100%',
          borderColor: '#6c63ff',
          borderWidth: 5,
          imgWidth: 250,
          onUpload: handleImageUpload,
          name: "logo",
          required: true,
        },
        {
          component: Input,
          name: 'name',
          placeholder: 'HostelApp',
          label: t("Nome e logo do seu hostel"),
          required: true,
          inputTexting: true,
        },
      ],
    },
    {
      title: t('Qual endereço do seu hostel?'),
      fields: [
        {
          component: Input,
          name: 'zip',
          label: t('CEP'),
          placeholder: '2000-000',
          required: true,
        },
        {
          component: Input,
          name: 'street',
          label: t('Endereço'),
          placeholder: 'Av. Paulista',
          required: true,
        },
        {
          component: Input,
          name: 'city',
          label: t('Cidade'),
          placeholder: 'São Paulo',
          required: true,
        },
        {
          component: InputSelect,
          name: 'country',
          label: t('País'),
          required: true,
          selectInputItems: countries
        },
      ]
    },
    {
      title: t('Como podemos entrar em contato com você?'),
      fields: [
        {
          component: InputPhone,
          name: 'phone',
          label: t('Telefone do seu hostel'),
          required: true,
        },
        {
          component: Input,
          name: 'email',
          label: t('E-mail do seu hostel'),
          placeholder: 'admin@hostelApp.com',
          required: true,
        },
      ],
    },
    {
      title: t('Só mais algumas informações...'),
      fields: [
        {
          component: Input,
          name: 'website',
          label: t('Qual é o site do seu hostel?'),
          placeholder: "www.hostelapp.io",
          required: true,
          errorMessage: '',
        },
        {
          component: SelectItens,
          boolean: true,
          name: 'experience_with_volunteers',
          label: t('Você já teve voluntários antes?'),
        },
        {
          component: InputCheckbox,
          boolean: true,
          name: 'policies',
          text: t('Ao continuar você concorda com as políticas de privacidade e cookies.'),
        },
      ],
    },
  ], [t])

  const dispatch = useDispatch<AppDispatch>();

  const sendForm = async (): Promise<void> => {
    try {
      const response = await dispatch(createHostel({ hostelData, image })).unwrap();

      if (response.success) {
        dispatch(updateUserField({ key: 'isNewUser', value: false }));
      }

      router.push('/host/(screens)/waitingApproval');

    } catch (err) {
      console.error('Erro ao criar hostel:', err);
    }
  };

  return (
    <Container scrollable={false}>
      <MultiStepForm
        steps={steps}
        sendForm={sendForm}
        value={hostelData}
        setHostel={setHostelData}
        sendBtnText={t("Criar hostel")}
      />
      {isPending && <ActivityIndicator size="large" color="#6c63ff" />}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </Container>
  );
}
