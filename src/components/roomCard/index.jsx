import { StyleSheet, Text, View } from "react-native"
import ButtonOptions from "@/src/components/buttons/ButtonOptions"
import ProfilesGroup from "@/src/components/guest/profilesGroup";
import defaultImg from '@/assets/images/unnamed.png';
import { Colors } from "@/src/constants/Colors";
import { useTheme } from "@/src/hooks/useTheme";
import { useState } from "react";

export default function RoomCard({ room, index, horizontalScroll }) {

    const [optionsVisible, setOptionsVisible] = useState(false)
    const dynamicStyles = useTheme()

    return (
        <View key={index} style={horizontalScroll ? styles.contaienrHorizontal : styles.roomContainer}>
            <Text style={styles.tag}>{room.type}</Text>
            <Text style={dynamicStyles.h2}>{room.name}</Text>
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
    )
}

const styles = StyleSheet.create({
    roomContainer: {
        padding: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        gap: 15,
        marginVertical: 20,
        backgroundColor: "white"
    },
    contaienrHorizontal: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 20,
        width: 320,
        borderRadius: 10,
        gap: 10,
        marginRight: 20
    },
    occupation: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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