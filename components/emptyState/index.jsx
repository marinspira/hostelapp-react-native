import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyState({ img, title, text }) {

    const dynamicStyles = useTheme()

    return (
        <View style={styles.emptyScreen}>  
            {img}
            <Text style={[dynamicStyles.title, styles.title]}>{title}</Text>
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
    }
})