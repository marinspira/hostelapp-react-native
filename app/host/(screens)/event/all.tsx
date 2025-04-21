import ButtonCreate from "@/components/buttons/ButtonCreate";
import Container from "@/components/container";
import EmptyState from "@/components/emptyState";
import GoBackButton from "@/components/goBackButton";
import EventList from "@/components/guest/eventList";
import { useTheme } from "@/hooks/useTheme";
import { useGetAllEvents } from "@/services/hostel/getAllEvents";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EmptyScreenImage from "@/assets/images/illustrations/undraw/undraw_dog_jfxm.svg"
import { ActivityIndicator, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { showToast } from "@/components/toast";

export default function AllEventsScreen() {

    const { mutateAsync: getAllEventsMutation, isPending, error } = useGetAllEvents();
    const { t } = useTranslation()
    const { height } = useWindowDimensions()
    const [events, setEvents] = useState()
    const dynamicStyles = useTheme()

    useEffect(() => {
        const getAllEvents = async () => {
            try {
                const response = await getAllEventsMutation();
                setEvents(response)
            } catch (err: any) {
                console.error('Error getting rooms:', err);

                const errorMessage = err?.response?.data?.message || err?.message || "Unknown error";

                showToast({
                    type: 'error',
                    title: "Error",
                    message: errorMessage,
                });
            }
        }

        getAllEvents()
    }, [])

    return (
        <Container scrollable={false}>
            <View style={{ height, paddingBottom: 100 }}>
                <View style={[dynamicStyles.header]}>
                    <GoBackButton />
                    <Text style={dynamicStyles.textUppercase}>Events</Text>
                </View>
                {isPending ? (
                    <ActivityIndicator size="large" color="#6c63ff" />
                ) : events ? (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <EventList
                            data={events || []}
                            btnText={t("Ver")}
                        />
                    </ScrollView>
                ) : (
                    <EmptyState
                        img={<EmptyScreenImage width={300} />}
                        title={t("Nenhum evento encontrado")}
                        text={t("Clique no botão flutuante para criar")}
                    />
                )}
                <ButtonCreate right={0} onPress={() => router.push("/host/event/create")} />
            </View>
        </Container>
    )
}