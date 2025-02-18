import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ChatList({ data }) {
    return (
        <>
            {data.map((chat, index) => (
                <Pressable key={index} style={styles.chat} onPress={() => router.push('/guest/(screens)/conversation')}>
                    <Image style={styles.img} source={chat.img} alt={chat.title} />
                    <View>
                        <Text>{chat.title}</Text>
                        <Text>{chat.description}</Text>
                    </View>
                </Pressable>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray
    },
    container2: {
        gap: 20,
        paddingVertical: 30
    },
    chat: {
        display: 'flex',
        flexDirection: "row",
        padding: 20,
        alignItems: 'center',
        gap: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 100
    }
})