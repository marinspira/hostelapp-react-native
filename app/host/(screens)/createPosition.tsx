import Container from "@/src/components/container";
import Input from "@/src/components/inputs/input";
import InputCheckbox from "@/src/components/inputs/inputCheckbox";
import InputImage from "@/src/components/inputs/inputImage";
import InputPhone from "@/src/components/inputs/inputPhone";
import InputSelect from "@/src/components/inputs/inputSelect";
import SelectItens from "@/src/components/inputs/selectItens";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";
import countries from '@/src/utils/coutries'
import { useState } from "react";

export default function CreatePosition() {

    const { t } = useTranslation()

    const steps = [
        {
            title: t('Para qual serviço você precisa de ajuda?'),
            fields: [
                {
                    component: SelectItens,
                    name: 'experience_with_volunteers',
                    maxSelections: 1,
                    options: [
                        t('Limpeza'),
                        t('Recepção'),
                        t('Fotografia'),
                        t('Moda'),
                        t('Filmes'),
                        t('Futebol'),
                        t('Jogos'),
                        t('Veganismo'),
                        t('Trilhas'),
                        '🧘🏽 Yoga',
                    ]
                  },
            ],
        },
        {
            title: t('Crie as tasks que a posição precisa'),
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
            title: t('O que você oferece?'),
            fields: [
                
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

    const sendForm = async () => {
        return null
    }

    const [hostelData, setHostelData] = useState({
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

    return (
        <Container scrollable={false}>
            <Text>Test</Text>
            {/* <MultiStepForm steps={steps} sendForm={sendForm} value={hostelData} setValue={setHostelData} /> */}
            {/* {isPending && <ActivityIndicator size="large" color="#6c63ff" />} */}
        </Container>
    )
}