import SimpleButton from "@/components/buttons/SimpleButton";
import Container from "@/components/container";
import GoBackButton from "@/components/goBackButton";
import ProfilesGroup from "@/components/guest/profilesGroup";
import { useTheme } from "@/hooks/useTheme";
import { formatDate } from "@/utils/formatDate";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

export default function EventScreen() {

    const dynamicStyles = useTheme()
    const { event } = useLocalSearchParams();
    const { t } = useTranslation()
    const { width } = useWindowDimensions()

    let loadedEvent = null;
    try {
        loadedEvent = event ? JSON.parse(event as string) : null;
    } catch (error) {
        console.warn("Failed to parse event param", error);
    }
    if (!loadedEvent) return <Text>Evento não encontrado</Text>;

    const { time, day, weekday, year, month } = formatDate(loadedEvent.date);

    return (
        <Container scrollable={false}>
            <View style={[dynamicStyles.header]}>
                <GoBackButton />
            </View>

            <Image
                source={
                    loadedEvent?.img
                        ? { uri: `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/${loadedEvent.img}` }
                        :
                        require('@/assets/images/unnamed.png')
                }
                style={styles.img}
            />
            <Text style={[dynamicStyles.title, styles.title]}>{loadedEvent.name}</Text>
            <Text style={[dynamicStyles.text]}>{loadedEvent.description}</Text>

            <ProfilesGroup people={loadedEvent.attendees} emptyText={t("Nenhuma inscrição")} />

            <View style={styles.dateContainer}>
                <View style={styles.icon}>
                    <Entypo name="calendar" size={20} color="#000" />
                </View>
                <View style={styles.dates}>
                    <Text style={[styles.text]}>{`${month} ${day}, ${year}`}</Text>
                    <Text style={[dynamicStyles.text]}>{`${time} - ${time}`}</Text>
                </View>
            </View>
            <View style={styles.dateContainer}>
                <View style={styles.icon}>
                    <Entypo name="location-pin" size={20} color="#000" />
                </View>
                <View style={styles.dates}>
                    <Text style={[styles.text]}>Rua Biguatinga, 37</Text>
                    <Text style={[dynamicStyles.text]}>Abrir no mapa</Text>
                </View>
            </View>

            <View style={styles.lastEventPhotos}>
                <Text style={[dynamicStyles.subtitle]}>{t("Imagens do último evento")}</Text>
            </View>

            <View style={[styles.bottomContainer, { width }]}>
                <Text style={[dynamicStyles.subtitle, styles.price]}>£ {loadedEvent.price},00</Text>
                <SimpleButton
                    text="Editar"
                />
            </View>

        </Container>
    )
}

const styles = StyleSheet.create({
    img: {
        width: "100%",
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8
    },
    title: {
        marginTop: 20
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        position: "absolute",
        bottom: 60,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20
    },
    price: {
        fontSize: 25
    },
    dateContainer: {
        padding: 15,
        backgroundColor: "#ecebfe",
        borderRadius: 8,
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center"
    },
    icon: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 100,
        justifyContent: "center"
    },
    dates: {
        justifyContent: "center",
        marginHorizontal: 15,
    },
    text: {
        fontFamily: "PoppinsBold",
        fontSize: 16,
        color: "#000"
    },
    lastEventPhotos: {
        marginTop: 20
    }
})