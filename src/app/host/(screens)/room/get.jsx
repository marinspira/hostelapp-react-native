import { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { useTranslation } from "react-i18next";

import EmptyScreenImage from "@/assets/images/illustrations/undraw/undraw_dog_jfxm.svg"

import { useTheme } from "@/src/hooks/useTheme";

import Container from "@/src/components/layout/Container";
import GoBackButton from "@/src/components/layout/GoBackButton";
import ButtonCreate from '@/src/components/ui/ButtonCreate'
import EmptyState from "@/src/components/ui/EmptyStateScreen"
import CustomModal from "@/src/components/ui/CustomModal";
import CreateRoomModal from "@/src/components/features/RoomCreateModal"
import RoomCard from "@/src/components/features/RoomCard"

import { useGetAllRooms } from "@/src/services/hostel/rooms/getAll";

export default function RoomsScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rooms, setRooms] = useState([])

    // const [rooms, setRooms] = useState([
    //     {
    //         type: "",
    //         name: "",
    //         capacity: null,
    //         beds: [{
    //             bed_number: '',
    //             reservation_id: null
    //         }]
    //     }
    // ])

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
                            <RoomCard horizontalScroll={false} key={index} room={room} index={index} />
                        ))}
                    </ScrollView>
                ) : (
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            showsVerticalScrollIndicator={false}
                        >
                            <EmptyState
                                img={<EmptyScreenImage width={300} />}
                                title={t("Nenhum quarto encontrado")}
                                text={t("Clique no botão + para criar")}
                            />
                        </ScrollView>
                )}
                <ButtonCreate right={0} onPress={() => setIsModalVisible(true)} />

                {isModalVisible === true &&
                    <CustomModal setModalVisible={setIsModalVisible} modalVisible={isModalVisible}>
                        <CreateRoomModal callback={getRooms} setModalVisible={setIsModalVisible} />
                    </CustomModal>
                }
            </View>
        </Container>
    )
}