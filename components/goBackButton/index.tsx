import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

interface GoBackButtonProps {
    absolutePostion?: string;
    color?: string;
}

export default function GoBackButton({ absolutePostion, color }: GoBackButtonProps) {
    return (
        <Pressable style={absolutePostion ? styles.position : ''} onPress={() => router.back()}>
            <FontAwesome5 name="arrow-left" size={22} color={color} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    position: {
        position: 'absolute',
        top: 80,
        left: 20,
        zIndex: 9
    }
})