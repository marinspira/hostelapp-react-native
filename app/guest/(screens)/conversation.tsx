import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { 
    Image, 
    Pressable, 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard 
} from "react-native";
import profileDefault from '@/assets/images/unnamed.png';
import GoBackButton from '@/components/goBackButton';
import { router } from "expo-router";

export default function Conversation() {
    const [message, setMessage] = useState<string>('');

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
                        <Pressable style={styles.profileSection} onPress={() => router.push('/guest/(screens)/profile')}>
                            <Image source={profileDefault}  style={styles.profileImage}/>
                            <Text>Maria</Text>
                        </Pressable>
                    </View>

                    {/* Corpo do chat */}
                    <View style={styles.chatContainer}>
                        <Text style={[styles.message, styles.received]}>Olá! Como você está?</Text>
                        <Text style={[styles.message, styles.sent]}>Oi! Estou bem, e você?</Text>
                    </View>

                    {/* Campo de entrada fixo */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Digite uma mensagem..."
                            placeholderTextColor='#000'
                            keyboardType="default"
                            multiline
                            value={message}
                            onChangeText={(value) => setMessage(value)}
                        />
                        <TouchableOpacity style={styles.sendButton}>
                        <FontAwesome name="send" size={20} color='white' />
                        </TouchableOpacity>
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
        paddingTop: 50,
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
        width: 40,
        height: 40,
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
