import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import InputSelect from '@/src/components/inputs/inputSelect'
import InputDate from '@/src/components/inputs/inputDate';
import SimpleButton from '@/src/components/buttons/SimpleButton';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/hooks/useTheme'
import { useEffect, useState } from "react";
import { Colors } from '@/src/constants/Colors'
import { router } from 'expo-router'
import { useGetAllRooms } from "@/src/services/hostel/getRooms";
import { useCreateReservation } from "@/src/services/hostel/createReservation";
import { useDispatch, useSelector } from 'react-redux';
import { getAllGuests } from '@/src/redux/slices/hostelGuests';
import { showToast } from '@/src/components/toast';

export default function AddGuest({ guest, setModalVisible }) {

    const { t } = useTranslation();
    const dynamicStyles = useTheme()

    const hostel = useSelector((state) => state.hostel.data)

    const { mutateAsync: getRoomsMutation } = useGetAllRooms();
    const { mutateAsync: createReservationMutation, isPending, error } = useCreateReservation();

    const [bedsAvailable, setBedsAvailable] = useState(null)
    const [allRooms, setAllRooms] = useState(null)

    const dispatch = useDispatch()

    const [reservation, setReservation] = useState({
        user_id_guest: guest.user_id_guest,
        checkin_date: null,
        checkout_date: null,
        room_number: null,
        bed_number: null,
    })

    function see() {
        console.log("1: ", reservation)
        console.log("2: ", bedsAvailable)
        console.log("3: ", hostel.rooms)
        console.log("4: ", allRooms)
    }

    useEffect(() => {
        const getAvailableRooms = async () => {
            try {
                const response = await getRoomsMutation();
                const allRooms = response.data;
                const availableBeds = allRooms.flatMap(room =>
                    room.beds
                        .filter(bed => bed.reservation_id === null)
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
    // TODO: Refazer a logica de camas disponiveis
    const uniqueRooms = [...new Set(
        (bedsAvailable || []).map(item => item.roomName)
    )];

    const filteredBeds = (bedsAvailable || [])
        .filter(bed => bed.roomName === reservation.room_number)
        .map(bed => bed.bed_number);



    function addOneDay(date) {
        const newDate = new Date(date);
        newDate.setHours(12);
        newDate.setDate(newDate.getDate() + 1);
        console.log("new date: ", newDate)
        return newDate;
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
            <Pressable onPress={see}>
                <Text>aQUIS</Text>
            </Pressable>
            <View style={styles.dates}>
                <InputDate
                    width='48%'
                    label='Check in'
                    onChange={(value) => { console.log(value) }}
                />
                <InputDate
                    width='48%'
                    label='Check out'
                    minimumDate=""
                    onChange={(value) => {
                        setReservation(prev => ({
                            ...prev,
                            checkout_date: value
                        }))
                    }}
                    errorMessage={t("Data de checkout precisa ser pelo menos 1 dia após o check-in")}
                />
            </View>
            {hostel.rooms.lenght > 0 && bedsAvailable ? (
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
                <Pressable
                    onPress={() => {
                        router.push('/host/allRooms');
                        setModalVisible(false);
                    }}
                    style={{ marginBottom: 20 }}
                >
                    <Text style={dynamicStyles.text}>Você não tem quartos disponíveis, {' '}
                        <Text style={{ color: Colors.light.tint, fontFamily: 'PoppinsBold', fontSize: 16 }}>
                            clique aqui para criar um.
                        </Text>
                    </Text>
                </Pressable>
            )}
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