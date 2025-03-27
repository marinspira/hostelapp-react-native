import MultiStepForm from '@/components/multiStepForm';
import Input from '@/components/inputs/input';
import InputImage from '@/components/inputs/inputImage';
import InputPhone from '@/components/inputs/inputPhone';
import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useFindAdress from '@/utils/useFindAdress';
import Container from '@/components/container'

export default function Checkin() {
  const [zip, setZip] = useState('');
  const { address, loading } = useFindAdress(zip);

  const { t, i18n } = useTranslation();

  const [hostel, setHostel] = useState({
    name: '',
    description: '',
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: ""
    },
    phone: '',
    email: '',
    website: '',
    rooms: [{
      number: '',
      beds: [{
        bed_number: '',
        assigned_by: null
      }]
    }]
  })

  useEffect(() => {
    console.log(hostel)
    console.log('dsds', address)
  }, [hostel, address])


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

  const fakeHostel = {
    name: "Sunset Beach Hostel",
    address: {
      street: "123 Ocean Drive",
      city: "Rio de Janeiro",
      state: "RJ",
      country: "Brazil",
      zip: "22000-000"
    },
    phone: "+55 21 98765-4321",
    email: "contact@sunsethostel.com",
    website: "https://www.sunsethostel.com",
    description: "Um hostel aconchegante de frente para o mar, perfeito para viajantes e nômades digitais.",
    rooms: [
      {
        number: "101",
        beds: [
          { bed_number: "A", assigned_by: "661f1c1234abcd567890ef12" },
          { bed_number: "B", assigned_by: null }
        ]
      },
      {
        number: "102",
        beds: [
          { bed_number: "A", assigned_by: "661f1c9876abcd123450ef34" },
          { bed_number: "B", assigned_by: null }
        ]
      }
    ],
    owners: [
      { _id: "661f1c45abcd67890123ef56", name: "Carlos Oliveira", email: "carlos@sunsethostel.com" }
    ],
    guests: [
      { _id: "661f1c7890abcd567890ef78", name: "Alice Johnson", email: "alice@example.com" },
      { _id: "661f1c9876abcd123450ef34", name: "Michael Smith", email: "michael@example.com" }
    ],
    staffs: [
      { _id: "661f1c2345abcd678901ef90", name: "Julia Mendes", email: "julia@sunsethostel.com" }
    ],
    events: [
      {
        _id: "661f1c5678abcd123456efab",
        title: "Festa na Praia",
        description: "Uma noite de música ao vivo e drinks à beira-mar.",
        price: 30,
        date: new Date("2024-04-15T20:00:00Z"),
        suggested_by: "661f1c7890abcd567890ef78",
        attendees: ["661f1c7890abcd567890ef78", "661f1c9876abcd123450ef34"],
        status: "aprovado",
        icon: "https://example.com/event-icon.png",
        photos_last_event: [
          "https://example.com/photo1.jpg",
          "https://example.com/photo2.jpg"
        ],
        photos_this_event: [
          "https://example.com/photo3.jpg"
        ],
        created_at: new Date()
      }
    ],
    volunteer_opportunities: [
      {
        _id: "661f1c8765abcd234567efcd",
        title: "Recepcionista Voluntário",
        description: "Ajude na recepção e ganhe estadia gratuita.",
        requirements: ["Inglês avançado", "Boa comunicação"],
        candidates: ["661f1c7890abcd567890ef78"],
        opportunities: [
          {
            assigned_staff: "661f1c2345abcd678901ef90",
            status: "open",
            shift: {
              start_time: "08:00",
              end_time: "14:00",
              days: ["monday", "wednesday", "friday"]
            }
          }
        ],
        tasks: [],
        created_at: new Date()
      }
    ],
    created_at: new Date()
  };

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
          name: 'hostelImage',
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
          label: 'Your Hostel Logo and Name',
          placeholder: "HostelApp",
          required: true,
          errorMessage: '',
          inputTexting: true
        },
        // {
        //   component: Input,
        //   name: 'name',
        //   label: 'Describe your hostel vibe',
        //   placeholder: "Nice enviroment, bike activities and dinner for 3€.",
        //   required: true,
        //   errorMessage: '',
        // },
      ],
    },
    {
      title: "What is your Hostel's address?",
      fields: [
        {
          component: Input,
          name: 'zip',
          label: 'Your zipcode',
          placeholder: '2000-000',
          required: true,
          onChange: setZip,
        },
      ]
    },
    {
      title: "How can we contact you?",
      fields: [
        {
          component: InputPhone,
          name: 'phoneNumber',
          label: 'Seu número de celular',
        },
        {
          component: Input,
          name: 'email',
          label: 'Your e-mail',
          placeholder: 'admin@hostelApp.com',
          required: true,
          onChange: setZip,
        },
      ],
    },
    {
      title: "What services do you need?",
      fields: [
        // {
        //   component: SelectItens,
        //   options:[
        //     t('Recepção'),
        //     t('Limpeza'),
        //     t('Assistente de cozinha'),
        //     t('Jardinagem'),
        //     t('Babá'),
        //     t('Ensino de esportes'),
        //     t('Cuidados de animais'),
        //     t('Ensino de idiomas'),
        //     t('Construção'),
        //     'Bartender',
        //   ],
        //   // label:{t('Habilidades')},
        //   suportText:'Select up to 5 options',
        //   // maxSelections={5},
        //   // value: {staff.skills},
        //   // onChange={(value) => handleChange('skills', value)}
        // },
      ],
    },
    {
      title: "Now just few more informations...",
      fields: [
        {
          component: Input,
          name: 'website',
          label: 'Hostel Website',
          placeholder: "Your hostel's website",
          required: true,
          errorMessage: '',
        },
        {
          component: Input,
          name: 'rooms',
          label: 'How many rooms?',
          placeholder: "5",
          required: true,
          errorMessage: '',
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
