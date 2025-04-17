import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import GoBackButton from '@/components/goBackButton';
import { useTheme } from "@/hooks/useTheme";
import socket from "@/utils/socket";
import { useCreateNewMessage } from '@/services/hostel/createNewMessage';
import { useGetMessages } from '@/services/chat/getMessages';

interface ChatProps {
    conversationId: string,
    participant: {
        userId: string;
        name: string;
        photo: string;
    };
}

export default function Chat({ participant, conversationId }: ChatProps) {

    const { mutateAsync: createNewMessageMutation, isPending, error } = useCreateNewMessage();

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ text: string; sender: 'me' | 'other', time: Date }[]>([]);

    const { mutateAsync: getMessagesMutation } = useGetMessages();

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await getMessagesMutation(conversationId);
                setMessages(response)
            } catch (err) {
                console.error('Error getting messages:', err);
            }
        }

        getMessages()
    }, [])

    useEffect(() => {
        const joinRoom = () => {
            socket.emit("join_room", conversationId);
        };
        joinRoom()
    }, [])

    const sendMessage = async () => {
        if (!message.trim()) return;
        socket.emit("send_message", { message, conversationId });

        setMessages(prev => [...prev, { text: message, sender: 'me', time: new Date() }]);

        try {
            const messageData = {
                conversationId: conversationId ? participant.userId : null,
                recipientId: participant.userId,
                text: message,
            }

            const response = await createNewMessageMutation(messageData);
        } catch (err) {
            console.error('Error sending message:', err);
        }

        setMessage('');
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages(prev => [...prev, { text: data.message, sender: 'other', time: new Date() }]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    const dynamicStyles = useTheme()

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.wrapper}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.wrapper}>
                    {/* Header com perfil e botão de voltar */}
                    <View style={styles.header}>
                        <GoBackButton color='black' absolutePostion={false} />
                        <Pressable style={styles.profileSection}>
                            <Image
                                source={
                                    participant.photo
                                        ? { uri: `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/${participant.photo}` }
                                        :
                                        require('@/assets/images/unnamed.png')
                                }
                                style={styles.profileImage}
                            />
                            <Text style={dynamicStyles.subtitle}>{participant.name}</Text>
                        </Pressable>
                    </View>

                    {/* Corpo do chat */}
                    <View style={styles.chatContainer}>
                        {messages.map((msg, index) => (
                            <Text
                                key={index}
                                style={[
                                    styles.message,
                                    msg.sender === 'me' ? styles.sent : styles.received,
                                ]}
                            >
                                {msg.text}
                            </Text>
                        ))}
                    </View>

                    {/* Campo de entrada fixo */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.inputField, dynamicStyles.text]}
                            placeholder="Digite uma mensagem..."
                            placeholderTextColor='#000'
                            keyboardType="default"
                            multiline
                            value={message}
                            onChangeText={(value) => setMessage(value)}
                        />
                        <Pressable onPress={sendMessage} style={styles.sendButton}>
                            <FontAwesome name="send" size={20} color='white' />
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    header: {
        paddingTop: 75,
        backgroundColor: "#fff",
        paddingBottom: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 100,
    },
    chatContainer: {
        flex: 1,
        padding: 20,
    },
    message: {
        padding: 15,
        borderRadius: 8,
        maxWidth: "80%",
        marginVertical: 8,
        fontSize: 17
    },
    received: {
        backgroundColor: "#fff",
        alignSelf: "flex-start",
    },
    sent: {
        backgroundColor: Colors.light.tint,
        color: "#fff",
        alignSelf: "flex-end",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 20,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    inputField: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    sendButton: {
        backgroundColor: Colors.light.tint,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 10,
    }
});
