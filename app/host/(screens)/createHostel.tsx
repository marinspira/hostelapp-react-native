import MultiStepForm from '@/components/multiStepForm';
import Input from '@/components/inputs/input';
import InputImage from '@/components/inputs/inputImage';
import InputPhone from '@/components/inputs/inputPhone';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useFindAdress from '@/hooks/useFindAdress';
import Container from '@/components/container';
import InputCheckbox from '@/components/inputs/inputCheckbox';
import SelectItens from '@/components/inputs/selectItens';
import { useCreateHostel } from '@/services/hostel/create';
import { ActivityIndicator, Text } from 'react-native';
import { Hostel } from '@/services/hostel/interface';

export default function CreateHostel() {
  const [zip, setZip] = useState('');
  const { address, loading } = useFindAdress(zip);
  const { t } = useTranslation();

  const [hostelData, setHostelData] = useState<Hostel>({
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zip: '',
    },
    phone: '',
    email: '',
    website: '',
    experience_with_volunteers: false,
    rooms: [
      {
        number: '',
        beds: [
          {
            bed_number: '',
            assigned_by: null,
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if (zip && address) {
      setHostelData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          // zip,
          street: address.street,
          city: address.city,
          state: address.state,
          country: address.country,
        },
      }));
      console.log(hostelData)
    }
  }, [address]);

  const handleZipcodeChange = (value: string) => {
    setZip(value);
    // setHostelData((prev) => ({
    //   ...prev,
    //   address: {
    //     ...prev.address,
    //     zip: value,
    //   },
    // }));
  };

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
          value: zip,
          component: Input,
          name: 'zip',
          label: 'CEP',
          placeholder: '2000-000',
          required: true,
          onChange: handleZipcodeChange,
        },
        ...(address && !loading
          ? [
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
                component: Input,
                name: 'country',
                label: 'País',
                placeholder: 'Brazil',
                required: true,
              },
            ]
          : []),
      ],
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
          label: 'Your e-mail',
          placeholder: 'admin@hostelApp.com',
          required: true,
        },
      ],
    },
    {
      title: t('Quais serviços você precisa de voluntário?'),
      fields: [
        {
          component: SelectItens,
          options: [
            t('Recepção'),
            t('Limpeza'),
            t('Assistente de cozinha'),
            t('Jardinagem'),
            t('Babá'),
            t('Ensino de esportes'),
            t('Cuidados de animais'),
            t('Construção'),
            t('Ensino de idiomas'),
            'Bartender',
          ],
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
          component: Input,
          name: 'rooms',
          label: t('Quantos quartos tem no seu hostel?'),
          placeholder: '5',
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
      // router.push('/host/(tabs)');
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
