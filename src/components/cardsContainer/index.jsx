import { Colors } from "@/src/constants/Colors"
import { useTheme } from "@/src/hooks/useTheme"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from "react-i18next";
import Feather from '@expo/vector-icons/Feather';
import { router, useNavigation } from "expo-router";
import { useRef } from "react";

export default function CardsContainer({ title, children, data, create, seeMore }) {

    const dynamicStyles = useTheme()
    const { t } = useTranslation()
    const overscrollTriggered = useRef(false);

    const handleScroll = (e) => {
        const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
        const isAtEnd = contentOffset.x + layoutMeasurement.width >= contentSize.width - 5;

        if (isAtEnd && !overscrollTriggered.current) {
            overscrollTriggered.current = true;

            setTimeout(() => {
                router.push(seeMore);
                overscrollTriggered.current = false;
            }, 150);
        }
    };

    return (
        <View style={styles.container}>
            {title &&
                <>
                    <Text style={[dynamicStyles.h2, styles.title]}>{title}</Text>
                    <View style={styles.divisor} />
                </>
            }
            {data ? (
                <ScrollView
                    style={styles.cardsContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {children}

                    <View style={styles.seeMore}>
                        <AntDesign name="arrowright" size={40} color="black" />
                        <Text style={dynamicStyles.text}>{t("Ver todos")}</Text>
                    </View>
                </ScrollView>
            ) : (
                <Pressable onPress={() => router.push(seeMore)} style={styles.seeMore}>
                    <AntDesign name="pluscircle" size={30} color={Colors.light.tint} />
                    <Text style={dynamicStyles.text}>{t("Ver todos")}</Text>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    title: {
        paddingLeft: 20
    },
    divisor: {
        width: 100,
        height: 3,
        backgroundColor: Colors.light.tint,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20
    },
    emptyStateContainer: {
        borderWidth: 1,
        width: "100%",
        height: 120,
        borderColor: "#ccc",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        alignSelf: "center"
    },
    seeMore: {
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    }
})