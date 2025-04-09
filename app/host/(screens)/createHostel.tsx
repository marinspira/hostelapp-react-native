import MultiStepForm from '@/components/multiStepForm';
import Input from '@/components/inputs/input';
import InputImage from '@/components/inputs/inputImage';
import InputPhone from '@/components/inputs/inputPhone';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import countries from '@/utils/coutries'
import Container from '@/components/container';
import InputCheckbox from '@/components/inputs/inputCheckbox';
import SelectItens from '@/components/inputs/selectItens';
import { useCreateHostel } from '@/services/hostel/create';
import { ActivityIndicator, Text } from 'react-native';
import { Hostel } from '@/services/hostel/interface';
import InputSelect from '@/components/inputs/inputSelect';
import { router } from 'expo-router';

export default function CreateHostel() {

  const { t } = useTranslation();

  const [hostelData, setHostelData] = useState<Hostel>({
    name: '',
    phone: '',
    email: '',
    website: '',
    experience_with_volunteers: null,
    street: '',
    city: '',
    country: '',
    zip: '',
  });

  const steps = [
    {
      fields: [
        {
          component: InputImage,
          id: 'hostelImage',
          borderRadius: '100%',
          borderColor: '#6c63ff',
          borderWidth: 5,
          imgWidth: 200,
          endpoints: { upload: '', delete: '' },
        },
        {
          component: Input,
          name: 'name',
          placeholder: 'HostelApp',
          required: true,
          errorMessage: '',
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
          label: 'CEP',
          placeholder: '2000-000',
          required: true,
        },
        {
          component: Input,
          name: 'street',
          label: 'Endereço',
          placeholder: 'Av. Paulista',
          required: true,
        },
        {
          component: Input,
          name: 'city',
          label: 'Cidade',
          placeholder: 'São Paulo',
          required: true,
        },
        {
          component: InputSelect,
          name: 'country',
          label: 'País',
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
          label: 'Seu número de celular',
        },
        {
          component: Input,
          name: 'email',
          label: 'Your hostel e-mail',
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
          label: 'Hostel Website',
          placeholder: t('Qual é o site do seu hostel?'),
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
  ];

  const { mutateAsync: createHostelMutation, isPending, error } = useCreateHostel();

  const sendForm = async (): Promise<void> => {
    try {
      const response = await createHostelMutation(hostelData);
      console.log('Hostel criado:', response);
      router.push('/host/(screens)/waitingApproval');
    } catch (err) {
      console.error('Erro ao criar hostel:', err);
    }
  };

  return (
    <Container scrollable={false}>
      <MultiStepForm steps={steps} sendForm={sendForm} value={hostelData} setValue={setHostelData} />
      {isPending && <ActivityIndicator size="large" color="#6c63ff" />}
      {error instanceof Error && <Text style={{ color: 'red' }}>{error.message}</Text>}
    </Container>
  );
}
