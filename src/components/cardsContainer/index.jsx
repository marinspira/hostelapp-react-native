import { Colors } from "@/src/constants/Colors"
import { useTheme } from "@/src/hooks/useTheme"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from "react-i18next";
import Feather from '@expo/vector-icons/Feather';
import { router, useNavigation } from "expo-router";
import { useRef } from "react";

export default function CardsContainer({ title, children, data, create, seeMore, vertical }) {

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
                    {/* <View style={styles.divisor} /> */}
                    <Text style={[dynamicStyles.textUppercase, styles.title]}>{title}</Text>
                </>
            }
            {data ? (
                <ScrollView
                    style={vertical ? styles.cardsContainer : null}
                    horizontal={!vertical}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={true}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {children}

                    {seeMore &&
                        <View style={styles.seeMore}>
                            {!vertical && <AntDesign name="arrowright" size={40} color="black" />}
                            <Text style={dynamicStyles.text}>{t("Ver todos")}</Text>
                        </View>
                    }
                </ScrollView>
            ) : (
                <Pressable onPress={create} style={styles.emptyStateContainer}>
                    {/* <AntDesign name="pluscircle" size={30} color={Colors.light.tint} />
                    <Text style={dynamicStyles.text}>{t("Vazio por aqui. Toque para criar.")}</Text> */}
                    <Text style={dynamicStyles.text}>{t("Em breve")}</Text>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    cardsContainer: {
        maxHeight: 300,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    divisor: {
        width: 70,
        height: 3,
        backgroundColor: Colors.light.tint,
        marginTop: 10,
        marginBottom: 5,
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
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 20
    }
})