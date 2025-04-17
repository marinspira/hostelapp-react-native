import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

interface ChatListProps {
    conversations: {
        conversationId: string | null;
        unreadMessages: number;
        participant: {
            userId: string;
            name: string;
            photo: string
        };
        lastMessage: {
            text: string;
            createdAt: Date | null;
        };
    }[];
}

export default function ChatList({ conversations }: ChatListProps) {

    const dynamicStyles = useTheme()
    const user = useSelector((state: RootState) => state.user.data);

    return (
        <>
            {conversations.map((chat, index) => (
                <Pressable
                    key={index}
                    style={styles.chat}
                    onPress={() =>
                        router.push({
                            pathname: `/${user?.role ?? "guest"}/(screens)/chat`,
                            params: {
                                userId: chat.participant.userId,
                                name: chat.participant.name,
                                photo: chat.participant.photo,
                                conversationId: chat.conversationId
                            },
                        } as any)
                    }
                >
                    <Image
                        source={
                            chat.participant.photo
                                ? { uri: `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/${chat.participant.photo}` }
                                :
                                require('@/assets/images/unnamed.png')
                        }
                        style={styles.img}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={dynamicStyles.subtitle}>{chat.participant.name}</Text>
                        <Text>{chat.lastMessage.text}</Text>
                    </View>
                    {/* {chat.unreadMessages && <Text style={styles.unread}>{chat.unreadMessages}</Text>} */}
                    {/* {chat.lastMessage.createdAt && <Text style={styles.date}>{chat.lastMessage.createdAt}</Text>} */}
                </Pressable>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
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
        width: 60,
        height: 60,
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