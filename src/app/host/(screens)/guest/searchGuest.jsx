import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';

import { useGetNewGuest } from '@/src/services/hostel/getNewGuest';
import { useTheme } from '@/src/hooks/useTheme';

import CustomModal from '@/src/components/ui/CustomModal';
import Container from '@/src/components/layout/Container'
import GoBackButton from '@/src/components/layout/GoBackButton'
import InputSearch from '@/src/components/forms/Inputs/Search'
import AddGuest from '@/src/components/features/ReservationCreateModal';

import Img from '@/assets/images/illustrations/undraw/travellers.svg'

export default function SearchGuest() {
    const [guests, setGuests] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [guest, setGuest] = useState(null)

    const { mutateAsync: getNewGuestMutation, isPending, error } = useGetNewGuest();

    const dynamicStyles = useTheme()

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const searchUser = async (username) => {
        if (!username.trim()) {
            setGuests([]);
            return;
        }

        try {
            const response = await getNewGuestMutation(username);
            setGuests(response.data)
        } catch (err) {
            console.error('Error in search guest screen:', err);
        }
    };

    const handleSelectGuest = (guest) => {
        setGuest(guest)
        setModalVisible(true)
    }

    return (
        <Container>
            <View style={styles.header}>
                <GoBackButton />
                <InputSearch
                    ref={inputRef}
                    onChange={(username) => searchUser(username)}
                    placeholder='Search by name, @tag or e-mail'
                />
            </View>

            <View style={styles.content}>
                {isPending ? (
                    <ActivityIndicator size="large" color="#6c63ff" />
                ) : guests && guests.length > 0 ? (
                    <ScrollView style={styles.searchContainer}>
                        {guests.map((guest, index) => (
                            <TouchableOpacity onPress={() => handleSelectGuest(guest)} key={index} style={styles.searchItem}>
                                <Image
                                    style={styles.image}
                                    source={
                                        guest.image
                                            ? { uri: `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/${guest.image}` }
                                            : require('@/assets/images/unnamed.png')
                                    }
                                />
                                <View style={styles.username}>
                                    <Text style={dynamicStyles.h3}>{guest.name}</Text>
                                    {guest.username && <Text style={dynamicStyles.text}>{guest.username}</Text>}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : (
                    <View>
                        <Img style={styles.findGuestImg} />
                        <Text style={[dynamicStyles.titleUppercase, styles.textAlign]}>Find your guests</Text>
                        <Text style={[dynamicStyles.text, styles.textAlign]}>Search by name, @tag or e-mail</Text>
                    </View>
                )}
            </View>

            {modalVisible &&
                <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    <AddGuest guest={guest} setModalVisible={setModalVisible} />
                </CustomModal>
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        objectFit: 'cover',
        borderRadius: 100
    },
    username: {
        marginLeft: 20,
        justifyContent: 'center'
    },
    searchContainer: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        maxHeight: 250,
        marginHorizontal: 2
    },
    searchItem: {
        paddingVertical: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    content: {
        marginTop: 20,
        flexDirection: 'column',
        minWidth: '100%'
    },
    textAlign: {
        textAlign: 'center'
    },
    findGuestImg: {
        maxWidth: '100%',
        maxHeight: 400,
        objectFit: 'cover'
    }
});