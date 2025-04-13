import Container from "@/components/container";
import GoBackButton from "@/components/goBackButton";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import ButtonCreate from '@/components/buttons/ButtonCreate'
import defaultImg from '@/assets/images/unnamed.png';
import ProfilesGroup from "@/components/guest/profilesGroup";
import { Colors } from "@/constants/Colors";
import EmptyScreenImage from "@/assets/images/illustrations/undraw/undraw_dog_jfxm.svg"
import PopUp from "@/components/modal";
import CreateRoomModal from "@/components/modaisContent/createRoom"
import { useTranslation } from "react-i18next";
import ButtonOptions from "@/components/buttons/ButtonOptions"
import { useGetAllRooms } from "@/services/hostel/getRooms";
import { showToast } from "@/components/toast";

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
                assigned_by: null
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
            <View style={{ height: height}}>
                <View style={styles.header}>
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
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.rooms}>
                        {rooms.map((room, index) => (
                            <View key={index} style={styles.roomContainer}>
                                <Text style={styles.tag}>{room.type}</Text>
                                <Text style={dynamicStyles.subtitle}>{room.name}</Text>
                                <ButtonOptions
                                    optionsVisible={optionsVisible}
                                    setOptionsVisible={setOptionsVisible}
                                />
                                <View style={styles.occupation}>
                                    {room.beds.filter((bed) => bed.assigned_by !== null).length < 1 ? (
                                        <Text style={dynamicStyles.text}>Quarto vazio</Text>
                                    ) : (
                                        <ProfilesGroup
                                            people={room.beds
                                                .filter((bed) => bed.assigned_by !== null)
                                                .map((bed) => ({
                                                    avatar: bed.guestPhoto ? { uri: bed.guestPhoto } : defaultImg,
                                                }))
                                            }
                                            maxVisible={10}
                                        />
                                    )}
                                    <Text style={dynamicStyles.text}>
                                        {room.beds.filter((bed) => bed.assigned_by !== null).length}/{room.capacity}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <View style={styles.emptyScreen}>
                        <EmptyScreenImage width={300} />
                        <Text style={dynamicStyles.title}>Nem quarto encontrado</Text>
                        <Text style={dynamicStyles.text}>Clique no botão flutuante para criar</Text>
                    </View>
                )}
                <ButtonCreate onPress={() => setIsModalVisible(true)} />
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
    header: {
        flexDirection: "row",
        gap: 20,
        paddingBottom: 20,
        alignItems: "center"
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