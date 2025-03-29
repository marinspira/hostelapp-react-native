import MultiStepForm from '@/components/multiStepForm';
import Input from '@/components/inputs/input';
import InputImage from '@/components/inputs/inputImage';
import InputPhone from '@/components/inputs/inputPhone';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useFindAdress from '@/utils/useFindAdress';
import Container from '@/components/container'
import InputCheckbox from '@/components/inputs/inputCheckbox';
import SelectItens from '@/components/inputs/selectItens'

export default function HostelRegister() {
  const [zip, setZip] = useState('');
  const { address, loading } = useFindAdress(zip);

  const { t, i18n } = useTranslation();

  const handleZipcodeChange = (value) => {
    setHostel((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        zip: value,
        street: address?.street,
        city: address?.city,
        state: address?.state,
        country: address?.country
      }
    }));
  }

  function handleChange(name, value) {
    setHostel((prev) => ({
      ...prev,
      [name]: value
    }));
  }

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
          placeholder: "HostelApp",
          required: true,
          errorMessage: '',
          inputTexting: true
        },
      ],
    },
    {
      title: t('Qual endereço do seu hostel?'),
      fields: [
        {
          component: Input,
          name: 'zip',
          label: 'Your zipcode',
          placeholder: '2000-000',
          required: true,
          // onChange: setZip,
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
          placeholder: "5",
          required: true,
          errorMessage: '',
        },
        {
          component: SelectItens,
          boolean: true,
          name: 'experience_with_volunteers',
          label: (t('Você já teve voluntários antes?'))
        },
        {
          component: InputCheckbox,
          boolean: true,
          text: t('Ao continuar você concorda com as políticas de privacidade e cookies.'),
        },
      ],
    },
  ];

  return (
    <Container scrollable={false}>
      <MultiStepForm steps={steps} />
    </Container>
  )
}
