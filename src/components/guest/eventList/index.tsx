import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Title from '../text/title';
import defaultImg from '@/assets/images/activities.png';
import ProfilesGroup from '@/src/components/guest/profilesGroup';
import SlideImage from '@/src/components/guest/slideImages';
import { useTheme } from '@/src/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@/src/utils/formatDate';
import { router } from 'expo-router';
import useAddMainDomain from "@/src/hooks/useAddMainDomain";

export interface EventData {
    _id: string;
    img: string;
    price: number;
    name: string;
    date: string;
    attendees: any[];
    photos_last_event: any[];
}[]

export interface EventListProps {
    data: EventData[],
    btnText: string,
    title?: string,
}

function EventList({ data, btnText, title }: EventListProps) {

    const dynamicStyles = useTheme()
    const { t } = useTranslation()

    return (
        <View>
            {title && <Title title={title} />}
            {data.map((item, index) => {
                const { fullString } = formatDate(item.date);

                const images = [];

                if (item.img) {
                    images.push(item.img);
                }
                if (item.photos_last_event && Array.isArray(item.photos_last_event)) {
                    images.push(...item.photos_last_event);
                }
                const imagesWithFullUrl = useAddMainDomain(images);

                return (
                    <View style={styles.container} key={index}>
                        <SlideImage images={item.img ? imagesWithFullUrl : [defaultImg]} />

                        <View style={styles.content}>
                            <View style={styles.textContent}>
                                <Text style={[dynamicStyles.h2, { maxWidth: "70%" }]}>{item.name}</Text>
                                <Text style={dynamicStyles.h2}>€ {item.price === 0 ? t("Grátis") : item.price},00</Text>
                            </View>
                            <Text style={[dynamicStyles.text, { fontSize: 14, marginBottom: 5 }]}>{fullString}</Text>
                            <View style={styles.content2}>
                                <ProfilesGroup people={item.attendees} emptyText={t("Nenhuma inscrição")} />
                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname: `/host/(screens)/event/[event]`,
                                            params: {
                                                event: JSON.stringify(item),
                                            },
                                        } as any)
                                    }
                                    style={styles.btn}
                                >
                                    <Text style={styles.btnText}>{btnText}</Text>
                                    <AntDesign name="arrowright" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                )
            })
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        marginTop: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        // boxShadow: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    img: {
        width: 310,
        height: 150,
        borderRadius: 5,
        marginBottom: 20
    },
    textContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    btn: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: "#000",
        borderRadius: 34,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        marginRight: 8,
        fontFamily: "Poppins"
    },
    content: {
        flexDirection: "column",
        alignItems: 'flex-start'
    },
    content2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    }
});

export default EventList;
