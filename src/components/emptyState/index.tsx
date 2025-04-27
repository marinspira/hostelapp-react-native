import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";

interface EmptyStateProps {
    img?: any,
    title?: string,
    text?: string
}

export default function EmptyState({ img, title, text }: EmptyStateProps) {

    const dynamicStyles = useTheme()

    return (
        <View style={[styles.emptyScreen, !img && styles.margin]}>  
            {img && img}
            <Text style={[dynamicStyles.title, styles.title]}>{title && title}</Text>
            <Text style={dynamicStyles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyScreen: {
        alignItems: "center",
        gap: 10,
        flex: 1
    },
    title: {
        textAlign: "center"
    },
    margin: {
        marginTop: 150
    }
})