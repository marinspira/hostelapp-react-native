import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import InputSelect from '@/components/inputs/inputSelect'
import InputDate from '@/components/inputs/inputDate';
import SimpleButton from '@/components/buttons/SimpleButton';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme'
import { useEffect, useState } from "react";

export default function AddGuest({ guest }) {

    const [roomsAvailable, setRoomsAvailable] = useState(null)

    const [reservation, setReservation] = useState({
        guest: guest,
        checkin_date: null,
        checkout_date: null,
        room_number: null,
        bed_number: null,
    })

    useEffect(() => {

    }, [])

    const checkRoomsAvailable = () => {

    }

    const { t, i18n } = useTranslation();
    const dynamicStyles = useTheme()

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
                    <Text style={[dynamicStyles.text, { marginTop: -5 }]}>Ver perfil</Text>
                </View>
            </View>
            <View style={styles.dates}>
                <InputDate
                    width='48%'
                    label='Check in'
                    minimumDate={new Date()}
                // onChange={(value) => handleChange('birthday', useFormatDate(value))}
                />
                <InputDate
                    width='48%'
                    label='Check out'
                    maximumDate={new Date()}
                    minimumDate={new Date()}
                // onChange={(value) => handleChange('birthday', useFormatDate(value))}
                />
            </View>
            {roomsAvailable ? (
                <>
                    <InputSelect
                        label='Room'
                        selectInputItems={[]}
                    />
                    {reservation.room_number &&
                        <InputSelect
                            label='Bed'
                            selectInputItems={[]}
                        />
                    }
                </>
            ) : (
                <Pressable style={{marginBottom: 20}}>
                    <Text style={dynamicStyles.text}>Você não tem quartos disponíveis, clique aqui para criar um.</Text>
                </Pressable>
            )}
            <SimpleButton
                text='Adicionar guest'
                disabled={!roomsAvailable}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    dates: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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