import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from 'expo-router'

import { Colors } from '@/src/constants/Colors'

import { useTheme } from '@/src/hooks/useTheme'
import { useEffect, useMemo, useState } from "react";
import { useCreateReservation } from "@/src/services/hostel/reservations/create";
import { useGetBedsAvailable } from "@/src/services/hostel/getBedsAvailable";
import { useDispatch, useSelector } from 'react-redux';
import { getAllGuests } from '@/src/redux/slices/hostelGuests';

import InputSelect from '@/src/components/forms/InputsV1/inputSelect'
import InputDate from '@/src/components/forms/InputsV1/inputDate';
import SimpleButton from '@/src/components/ui/Button';
import { showToast } from '@/src/components/layout/ToastNotification';


export default function AddGuest({ guest, setModalVisible }) {

    const { t } = useTranslation();
    const dynamicStyles = useTheme()
    const dispatch = useDispatch()
    const hostel = useSelector((state) => state.hostel.data)

    const { mutateAsync: createReservationMutation, isPending, error } = useCreateReservation();
    const { mutateAsync: getBedsAvailableMutation } = useGetBedsAvailable();


    const [bedsAvailable, setBedsAvailable] = useState(null)

    const [reservation, setReservation] = useState({
        user_id_guest: guest.user_id_guest,
        checkin_date: null,
        checkout_date: null,
        room_number: null,
        bed_number: null,
    })

    useEffect(() => {
        if (reservation.checkin_date && reservation.checkout_date) {

            const dates = {
                checkin_date: reservation.checkin_date,
                checkout_date: reservation.checkout_date
            };

            const getAvailableRooms = async () => {
                try {
                    const response = await getBedsAvailableMutation(dates);
                    if (response.data && response.data.length > 0) {
                        setBedsAvailable(response.data);
                    } else {
                        setBedsAvailable([]);
                    }
                } catch (err) {
                    console.error('Error getting rooms:', err);
                }
            }

            getAvailableRooms()
        }

    }, [reservation.checkin_date, reservation.checkout_date])

    async function handleSubmit() {
        try {
            const response = await createReservationMutation(reservation);
            console.log('Reservation created:', response);

            dispatch(getAllGuests());

            showToast({
                type: "success",
                title: t("Reserva criada com sucesso!"),
                message: t("Guest pronto para conversar e gerenciar")
            })

            setModalVisible(false)

            // TODO: fazer redirect para chat do guest
            router.push("/host/chat")
            // router.push(`/host/chat/${reservation.user_id_guest}`)

        } catch (err) {
            console.error('Error creating Reservation:', err);
        }
    }

    function isFormValid() {
        return reservation.user_id_guest &&
            reservation.checkin_date &&
            reservation.checkout_date &&
            reservation.room_number &&
            reservation.bed_number
    }

    function addOneDay(date) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    }

    const uniqueRooms = useMemo(() => {
        if (!bedsAvailable) return [];

        return bedsAvailable.map(room => room.room_number);
    }, [bedsAvailable]);

    const filteredBeds = useMemo(() => {
        if (!bedsAvailable || !reservation.room_number) return [];

        const selectedRoom = bedsAvailable.find(room => room.room_number === reservation.room_number);
        if (!selectedRoom) return [];

        const rooms = selectedRoom.beds.map(bed => bed);
        return rooms

    }, [bedsAvailable, reservation.room_number]);

    return (
        <View>
            <View style={styles.guestInfo}>
                <Image
                    style={styles.image}
                    source={
                        guest.image
                            ? { uri: `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/${guest.image}` }
                            : require('@/assets/images/unnamed.png')
                    }
                />
                <View>
                    <Text style={[dynamicStyles.title]}>{guest.name}</Text>
                    <Pressable onPress={() => router.push("/")}>
                        <Text style={[dynamicStyles.text, { marginTop: -5 }]}>{t("Ver perfil")}</Text>
                    </Pressable>
                </View>
            </View>

            {hostel.rooms.length > 0 ? (
                <>
                    <View style={styles.dates}>
                        <InputDate
                            width='48%'
                            label='Check in'
                            onChange={(value) => {
                                setReservation(prev => ({
                                    ...prev,
                                    checkin_date: value,
                                }));
                            }}
                            value={reservation.checkin_date}
                        />
                        <InputDate
                            width='48%'
                            label='Check out'
                            onChange={(value) => {
                                setReservation(prev => ({
                                    ...prev,
                                    checkout_date: value,
                                }));
                            }}
                            minimumDate={reservation.checkin_date ? addOneDay(reservation.checkin_date) : null}
                            errorMessage={t("Data de checkout precisa ser pelo menos 1 dia após o check-in")}
                        />
                    </View>

                    {bedsAvailable ? (
                        bedsAvailable.length > 0 ? (
                            <>
                                <InputSelect
                                    label='Room'
                                    selectInputItems={uniqueRooms}
                                    value={reservation.room_number}
                                    onChange={(value) => {
                                        setReservation(prev => ({
                                            ...prev,
                                            room_number: value,
                                            bed_number: null
                                        }))
                                    }}
                                />
                                {reservation.room_number && (
                                    <InputSelect
                                        label='Bed'
                                        selectInputItems={filteredBeds}
                                        selectedValue={reservation.bed_number}
                                        onChange={(value) => {
                                            setReservation(prev => ({
                                                ...prev,
                                                bed_number: value
                                            }))
                                        }}
                                    />
                                )}
                            </>
                        ) : (
                            <Text style={[dynamicStyles.text, { marginBottom: 20 }]}>
                                Nenhum quarto disponível para essa data
                            </Text>
                        )
                    ) : null}

                    {isPending ? (
                        <ActivityIndicator size="large" color="#6c63ff" />
                    ) : (
                        <SimpleButton
                            text='Adicionar guest'
                            disabled={!isFormValid()}
                            onPress={handleSubmit}
                        />
                    )}
                </>
            ) : (
                <Pressable
                    onPress={() => {
                        router.push('/host/room/list');
                        setModalVisible(false);
                    }}
                    style={{ marginBottom: 20 }}
                >
                        <Text style={{ color: Colors.light.tint, fontFamily: 'PoppinsBold', fontSize: 16, textAlign: "center" }}>
                            {t("Clique aqui para criar um quarto")}.
                        </Text>
                </Pressable>
            )}
        </View >
    )
}

const styles = StyleSheet.create({
    dates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    guestInfo: {
        flexDirection: 'row',
        marginBottom: 40,
        alignItems: 'center',
        gap: 20,
        marginTop: 20
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 100
    }
})