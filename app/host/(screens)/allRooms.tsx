import Container from "@/src/components/container";
import GoBackButton from "@/src/components/goBackButton";
import { useTheme } from "@/src/hooks/useTheme";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import ButtonCreate from '@/src/components/buttons/ButtonCreate'
import defaultImg from '@/assets/images/unnamed.png';
import ProfilesGroup from "@/src/components/guest/profilesGroup";
import { Colors } from "@/src/constants/Colors";
import EmptyScreenImage from "@/assets/images/illustrations/undraw/undraw_dog_jfxm.svg"
import PopUp from "@/src/components/modal";
import CreateRoomModal from "@/src/components/modaisContent/createRoom"
import { useTranslation } from "react-i18next";
import ButtonOptions from "@/src/components/buttons/ButtonOptions"
import { useGetAllRooms } from "@/src/services/hostel/getRooms";
import { showToast } from "@/src/components/toast";
import EmptyState from "@/src/components/emptyState"

export default function RoomsScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [rooms, setRooms] = useState([
        {
            type: "",
            name: "",
            capacity: null,
            beds: [{
                bed_number: '',
                reservation_id: null
            }]
        }
    ])
    const { height } = useWindowDimensions()
    const dynamicStyles = useTheme()
    const { t } = useTranslation()
    const { mutateAsync: getRoomsMutation, isPending, error } = useGetAllRooms();

    useEffect(() => {
        if (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Erro desconhecido";
            showToast({
                type: 'error',
                title: "Error",
                message: errorMessage,
            });
        }
    }, [error])

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await getRoomsMutation();
                setRooms(response.data)
            } catch (err) {
                console.error('Error getting rooms:', err);
            }
        }

        getRooms()
    }, [])

    return (
        <Container scrollable={false}>
            <View style={{ height: height }}>
                <View style={dynamicStyles.header}>
                    <GoBackButton />
                    <Text style={dynamicStyles.textUppercase}>Rooms</Text>
                </View>
                <View style={styles.filtros}>
                    <Text style={[styles.filtro]}>Shared</Text>
                    <Text style={[styles.filtro]}>Staff</Text>
                    <Text style={[styles.filtro]}>Private</Text>
                </View>
                {isPending ? (
                    <ActivityIndicator size="large" color="#6c63ff" />
                ) : rooms && rooms.length > 0 ? (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {rooms.map((room, index) => (
                            <View key={index} style={styles.roomContainer}>
                                <Text style={styles.tag}>{room.type}</Text>
                                <Text style={dynamicStyles.subtitle}>{room.name}</Text>
                                <ButtonOptions
                                    optionsVisible={optionsVisible}
                                    setOptionsVisible={setOptionsVisible}
                                />
                                <View style={styles.occupation}>
                                    {room.beds.filter((bed) => bed.reservation_id !== null).length < 1 ? (
                                        <Text style={dynamicStyles.text}>Quarto vazio</Text>
                                    ) : (
                                        <ProfilesGroup
                                            people={room.beds
                                                .filter((bed) => bed.reservation_id !== null)
                                                .map((bed) => ({
                                                    avatar: bed?.guestPhoto ? { uri: bed?.guestPhoto } : defaultImg,
                                                }))
                                            }
                                            maxVisible={10}
                                        />
                                    )}
                                    <Text style={dynamicStyles.text}>
                                        {room.beds.filter((bed) => bed.reservation_id !== null).length}/{room.capacity}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <EmptyState
                        img={<EmptyScreenImage width={300} />}
                        title="Nenhum quarto encontrado"
                        text="Clique no botão flutuante para criar"
                    />
                )}
                <ButtonCreate right={0} onPress={() => setIsModalVisible(true)} />
                {isModalVisible === true &&
                    <PopUp setModalVisible={setIsModalVisible} modalVisible={isModalVisible}>
                        <CreateRoomModal setModalVisible={setIsModalVisible} />
                    </PopUp>
                }
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        height: "100%"
    },
    roomContainer: {
        padding: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        gap: 15,
        marginVertical: 20,
        backgroundColor: "white"
    },
    filtros: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 20
    },
    filtro: {
        borderRadius: 8,
        color: "white",
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: Colors.light.tint,
        textTransform: "uppercase",
        fontFamily: "PoppinsBold",
        fontSize: 14
    },
    occupation: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    emptyScreen: {
        alignItems: "center",
        gap: 10
    },
    tag: {
        fontFamily: "PoppinsBold",
        fontSize: 12,
        backgroundColor: Colors.light.tint,
        color: "white",
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 5,
        alignSelf: "flex-start",
        textTransform: "uppercase"
    }
})