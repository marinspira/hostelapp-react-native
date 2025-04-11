import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Widgets({ title, children }) {

    const dynamicStyles = useTheme()

    if (children) {
        return (
            <View>
                <Text style={dynamicStyles.textUppercase}>{title}</Text>
                <View style={styles.containerBox}>
                    <FontAwesome style={styles.expandIcon} name="expand" size={20} color="black" />
                    {children}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerBox: {
        backgroundColor: 'white',
        height: 200,
        borderRadius: 8,
        width: '100%'
    },
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1
    },
    expandIcon: {
        position: 'absolute',
        right: 0
    }
})