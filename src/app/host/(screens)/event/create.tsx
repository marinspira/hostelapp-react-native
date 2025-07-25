import { useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { Text } from "react-native";

import Container from "@/src/components/layout/Container";
import Input from "@/src/components/forms/InputsV1/input";
import InputDate from "@/src/components/forms/InputsV1/inputDate";
import InputImage from "@/src/components/forms/Inputs/Image";
import SelectItens from "@/src/components/forms/InputsV1/selectItens";
import EventStripeSettings from "@/src/components/features/EventStripeSettings"

import { createStripeAccount } from "@/src/services/hostel/createStripeAccount";
import { createEvent } from "@/src/services/hostel/events/create";

export interface Event {
    name: string,
    description: string,
    price: number | null,
    street?: string,
    city?: string,
    zip?: string,
    hostel_location: boolean | null,
    date: Date | null,
    img: string,
    photos_last_event: string[] | null,
    spots_available: number | null,
    limited_spots: boolean | null,
    paid_event: boolean | null,
    payment_to_hostel: boolean | null,
    receive_online: boolean | null
}

export default function CreateEventScreen() {

    const [event, setEvent] = useState({
        name: "",
        description: "",
        price: 0,
        street: "",
        city: "",
        zip: "",
        hostel_location: null,
        date: null,
        photos_last_event: null,
        spots_available: null,
        limited_spots: null,
        paid_event: null,
        payment_to_hostel: null,
        receive_online: null
    })

    const [img, setImage] = useState()

    // TODO V2: Validar se é o hostel que tá criando o evento ou o hospede, pra mostrar apenas determinados campos
    const hostel = true

    //TODO: Fazer GET do hostel e ver se ja possui stripeAccountId no banco
    let stripeAccountId = null

    const { t } = useTranslation()

    const steps = [
        {
            title: t('Defina um nome e foto que descreva seu evento'),
            fields: [
                {
                    component: InputImage,
                    id: 'eventImg',
                    borderColor: '#6c63ff',
                    defaultImg: "",
                    borderWidth: 5,
                    imgWidth: 365,
                    imgHeight: 200,
                    onUpload: (img: any) => setImage(img)
                },
                // TODO: linkar post do blog sobre tipos de eventos que podem render dinheiro para hostel e voluntarios
                {
                    component: Input,
                    name: 'name',
                    label: t("Nome do evento"),
                    placeholder: t("Aula de surf"),
                    required: true,
                },
                {
                    component: Input,
                    name: 'description',
                    label: t("Descrição"),
                    placeholder: t("Nível intermediário"),
                    required: true,
                },
            ],
        },
        {
            title: t('Onde e quando?'),
            fields: [
                {
                    component: SelectItens,
                    boolean: true,
                    name: 'hostel_location',
                    label: t('O evento acontecerá no hostel?'),
                    required: true
                },
                ...(event?.hostel_location === false ? [
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
                    }
                ] : []),
                {
                    component: InputDate,
                    label: t('Data e hora do evento'),
                    name: "date",
                    errorMessage: t('A data precisa estar entre 2 horas a partir de agora e os próximos 30 dias.'),
                    maximumDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
                    minimumDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // em 2 horas 
                    time: true,
                    required: true
                },
            ]
        },
        {
            title: t('Quantas pessoas podem participar?'),
            fields: [
                {
                    component: SelectItens,
                    boolean: true,
                    name: 'limited_spots',
                    label: t('É limitado o número de pessoas que pode participar?'),
                    required: true,
                },
                ...(event?.limited_spots === true ? [
                    {
                        component: Input,
                        name: 'spots_available',
                        label: 'Número máximo de pessoas que pode participar',
                        placeholder: '6',
                        required: true,
                        onlyNumbers: true
                    },
                ] : []),
            ]
        },
        {
            title: t('É um evento pago?'),
            fields: [
                {
                    component: SelectItens,
                    boolean: true,
                    name: 'paid_event',
                    label: t('O convidado precisa pagar para participar?'),
                    required: true
                },
                ...(event?.paid_event === true ? [
                    // TODO: habilitar decimal
                    {
                        component: Input,
                        name: 'price',
                        label: t("Qual o valor do ingresso?"),
                        placeholder: '$ 6.50',
                        required: true,
                        onlyNumbers: true
                    },
                    // TODO: Fazer required funcionar
                    {
                        component: SelectItens,
                        name: 'payment_methods',
                        maxSelections: 2,
                        label: t('Quais métodos de pagamento disponíveis?'),
                        options: [
                            t('Dinheiro'),
                            t('Cartão'),
                        ],
                        required: true,
                    },
                    {
                        component: SelectItens,
                        name: 'payment_to_hostel',
                        label: t('O hostel quem vai receber?'),
                        boolean: true,
                        required: true,
                    },
                    ...(event?.payment_to_hostel === true ? [
                        {
                            component: SelectItens,
                            name: 'receive_online',
                            label: t('Habilitar que seus hóspedes paguem pelo aplicativo'),
                            suportText: t('Até 8x mais conversões!'),
                            boolean: true,
                            required: true,
                        },
                    ] : [])
                ] : []),
            ],
        },
        ...(event?.receive_online === true && hostel && !stripeAccountId ? [
            {
                title: t('Permita pagamentos pelo app e receba 100% do valor. 💸'),
                fields: [
                    {
                        component: EventStripeSettings
                    }
                ],
            },
        ] : [])
    ];

    const handleCreateEventAndConnectAccount = async () => {
        try {
            const response = createStripeAccount()
        } catch (error) {
            console.error("Error handleCreateEventAndConnectAccount", error)
        }
        return null
    }

    const handleCreateEvent = async () => {
        try {
            const eventData = Object.fromEntries(
                Object.entries(event).filter(([_, v]) => v !== null && v !== "" && v !== undefined)
            );

            const response = await createEvent(img, eventData)

            if (response?.success) {
                router.push("/host/event/all")
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container scrollable={false}>
            <Text>Teste</Text>
            {/* <MultiStepForm
                steps={steps}
                value={event}
                setValue={setEvent}
                sendForm={event?.receive_online && hostel && !stripeAccountId ? handleCreateEventAndConnectAccount : handleCreateEvent}
                sendBtnText={event?.receive_online && hostel && !stripeAccountId ? t("Criar evento e configurar Stripe") : t("Criar evento")}
            /> */}
        </Container>
    )
}