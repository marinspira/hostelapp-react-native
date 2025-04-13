import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import InputSelect from '@/components/inputs/inputSelect'
import InputDate from '@/components/inputs/inputDate';
import SimpleButton from '@/components/buttons/SimpleButton';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme'
import { useEffect, useState } from "react";
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { useGetAllRooms } from "@/services/hostel/getRooms";
import { useCreateReservation } from "@/services/hostel/createReservation";

export default function AddGuest({ guest, setModalVisible }) {

    const { t, i18n } = useTranslation();
    const dynamicStyles = useTheme()

    const { mutateAsync: getRoomsMutation } = useGetAllRooms();
    const { mutateAsync: createReservationMutation, isPending, error } = useCreateReservation();

    const [bedsAvailable, setBedsAvailable] = useState(null)
    const [allRooms, setAllRooms] = useState(null)

    const [reservation, setReservation] = useState({
        guest_id: guest._id,
        checkin_date: null,
        checkout_date: null,
        room_number: null,
        bed_number: null,
    })

    useEffect(() => {
        const getAvailableRooms = async () => {
            try {
                const response = await getRoomsMutation();
                const allRooms = response.data;
                const availableBeds = allRooms.flatMap(room =>
                    room.beds
                        .filter(bed => bed.assigned_by === null)
                        .map(bed => ({
                            bed_number: bed.bed_number,
                            roomName: room.name,
                            roomId: room._id
                        }))
                );

                setAllRooms(allRooms);
                setBedsAvailable(availableBeds);
            } catch (err) {
                console.error('Error getting rooms:', err);
            }
        }

        getAvailableRooms()
    }, [])

    useEffect(() => {
        if (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Erro desconhecido";
            showToast({
                type: 'error',
                title: "Error",
                message: t(errorMessage),
            });
        }
    }, [error])

    useEffect(() => {
        console.log(reservation)
    }, [reservation])

    async function handleSubmit() {
        try {
            const response = await createReservationMutation(reservation);
            console.log('Reservation created:', response);
            setModalVisible(false)
            router.push("")
        } catch (err) {
            console.error('Error creating Reservation:', err);
        }
    }

    const uniqueRooms = [...new Set(
        (bedsAvailable || []).map(item => item.roomName)
    )];

    const filteredBeds = (bedsAvailable || [])
        .filter(bed => bed.roomName === reservation.room_number)
        .map(bed => bed.bed_number);

    function isFormValid() {
        return reservation.guest_id &&
            reservation.checkin_date &&
            reservation.checkout_date &&
            reservation.room_number &&
            reservation.bed_number
    }

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
                    <Text style={dynamicStyles.title}>{guest.name}</Text>
                    <Pressable onPress={() => router.push("/")}>
                        <Text style={[dynamicStyles.text, { marginTop: -5 }]}>Ver perfil</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.dates}>
                <InputDate
                    width='48%'
                    label='Check in'
                    minimumDate={new Date()}
                    onChange={(value) => {
                        setReservation(prev => {
                            const shouldResetCheckout = prev.checkout_date && value > prev.checkout_date;

                            return {
                                ...prev,
                                checkin_date: value,
                                checkout_date: shouldResetCheckout ? null : prev.checkout_date
                            }
                        });
                    }}
                />
                <InputDate
                    width='48%'
                    label='Check out'
                    minimumDate={reservation.checkin_date}
                    onChange={(value) => {
                        setReservation(prev => ({
                            ...prev,
                            checkout_date: value
                        }))
                    }}
                />
            </View>
            {bedsAvailable ? (
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
                <Pressable onPress={() => router.push('/host/(screens)/rooms')} style={{ marginBottom: 20 }}>
                    <Text style={dynamicStyles.text}>Você não tem quartos disponíveis, {' '}
                        <Text style={{ color: Colors.light.tint, fontFamily: 'PoppinsBold', fontSize: 16 }}>
                            clique aqui para criar um.
                        </Text>
                    </Text>
                </Pressable>
            )
            }
            {isPending ? (
                <ActivityIndicator size="large" color="#6c63ff" />
            ) : (
                <SimpleButton
                    text='Adicionar guest'
                    disabled={!isFormValid()}
                    onPress={handleSubmit}
                />
            )}
        </View >
    )
}

const styles = StyleSheet.create({
    dates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
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