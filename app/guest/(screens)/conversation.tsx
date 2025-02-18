import Container from "@/components/container";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useThemeColor";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

export default function Conversation() {

    const [message, setMessage] = useState<string>('')

    return (
        <Container>
            <View style={styles.container}>
                <View style={styles.messagesContainer}>
                    <Text style={[styles.message, styles.received]}>Olá! Como você está?</Text>
                    <Text style={[styles.message, styles.sent]}>Oi! Estou bem, e você?</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Digite uma mensagem..."
                        placeholderTextColor='#000'
                        keyboardType="default"
                        multiline={true}
                        value={message}
                        onChangeText={(value) => setMessage(value)}
                    />
                    <TouchableOpacity style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        // minHeight: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        // paddingBottom: 60,
    },
    messagesContainer: {
        flex: 1,
        top: 0
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
        gap: 10,
        paddingVertical: 10,
        // position: 'absolute',
        // bottom: 0
    },
    input: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    sendButton: {
        backgroundColor: Colors.light.tint,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    sendButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
