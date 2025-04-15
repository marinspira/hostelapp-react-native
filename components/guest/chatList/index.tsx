import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ChatListProps {
    conversations: {
        title: string,
        description: string,
        unread: number,
        img: string,
        userId: string
    }[]
}

export default function ChatList({ conversations }: ChatListProps) {
    return (
        <>
            {conversations.map((chat, index) => (
                <Pressable key={index} style={styles.chat} onPress={() => router.push('/guest/(screens)/conversation')}>
                    <Image
                        source={
                            // chat.img
                            //     ? { uri: `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/${chat.img}` }
                            //     : 
                            require('@/assets/images/unnamed.png')
                        }
                        style={styles.img}
                    />
                    <View style={{ flex: 1 }}>
                        <Text>{chat.title}</Text>
                        <Text>{chat.description}</Text>
                    </View>
                    <Text style={styles.unread}>1</Text>
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
    },
    unread: {
        backgroundColor: Colors.light.tint,
        borderRadius: 100,
        paddingVertical: 4,
        paddingHorizontal: 8,
        color: "#fff",
        textAlign: 'center'
    },
    contentContainer: {
        flex: 1
    }
})