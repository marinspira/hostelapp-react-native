import { useTheme } from "@/src/hooks/useTheme";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

interface GoBackButtonProps {
    absolutePostion?: boolean;
    color?: string;
}

export default function GoBackButton({ absolutePostion, color }: GoBackButtonProps) {
    const dynamicStyles = useTheme()
    return (
        <Pressable style={absolutePostion ? styles.position : ''} onPress={() => router.back()}>
            <FontAwesome5 name="arrow-left" size={22} color={dynamicStyles.icon} />
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