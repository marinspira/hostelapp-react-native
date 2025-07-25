import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, useWindowDimensions, View } from "react-native";

import { useGetAllEvents } from "@/src/services/hostel/events/list";

import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import EmptyScreenImage from "@/assets/images/illustrations/undraw/undraw_dog_jfxm.svg"

import { showToast } from "@/src/components/layout/ToastNotification";
import ButtonCreate from "@/src/components/ui/ButtonCreate";
import Container from "@/src/components/layout/Container";
import EmptyState from "@/src/components/ui/EmptyStateScreen";
import GoBackButton from "@/src/components/layout/GoBackButton";
import EventList, { EventData } from "@/src/components/features/EventList";

export default function AllEventsScreen() {

    const { mutateAsync: getAllEventsMutation, isPending, error } = useGetAllEvents();
    const { t } = useTranslation()
    const { height } = useWindowDimensions()
    const [events, setEvents] = useState<EventData[] | null>(null)
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
                ) : events && events.length > 0 ? (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <EventList
                            horizontalScroll={false}
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