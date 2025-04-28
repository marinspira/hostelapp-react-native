import Container from "@/src/components/container";
import GoBackButton from "@/src/components/goBackButton";
import { useTheme } from "@/src/hooks/useTheme";
import { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import ButtonCreate from '@/src/components/buttons/ButtonCreate'
import EmptyScreenImage from "@/assets/images/illustrations/undraw/undraw_dog_jfxm.svg"
import PopUp from "@/src/components/modal";
import CreateRoomModal from "@/src/components/modaisContent/createRoom"
import { useTranslation } from "react-i18next";
import { useGetAllRooms } from "@/src/services/hostel/getRooms";
import EmptyState from "@/src/components/emptyState"
import RoomCard from "@/src/components/roomCard"

export default function RoomsScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
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

    const getRooms = async () => {
        try {
            const response = await getRoomsMutation();
            setRooms(response.data)
        } catch (err) {
            console.error('Error getting rooms:', err);
        }
    }

    useEffect(() => {
        getRooms()
    }, [])

    const onRefresh = async () => {
        setRefreshing(true);
        await getRooms();
        setRefreshing(false);
    };

    return (
        <Container scrollable={false}>
            <View style={{ height: height }}>
                <View style={dynamicStyles.header}>
                    <GoBackButton />
                    <Text style={dynamicStyles.textUppercase}>Rooms</Text>
                </View>

                {isPending ? (
                    <ActivityIndicator size="large" color="#6c63ff" />
                ) : rooms && rooms.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {rooms.map((room, index) => (
                            <RoomCard key={index} room={room} index={index} />
                        ))}
                    </ScrollView>
                ) : (
                    <EmptyState
                        img={<EmptyScreenImage width={300} />}
                        title={t("Nenhum quarto encontrado")}
                        text={t("Clique no botão + para criar")}
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