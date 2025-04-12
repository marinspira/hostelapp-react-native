import { useTheme } from '@/hooks/useTheme';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function ButtonOptions({ optionsVisible, setOptionsVisible }) {

    const dynamicStyles = useTheme()

    return (
        <View style={styles.options}>
            <TouchableOpacity onPress={() => setOptionsVisible(!optionsVisible)}>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
            </TouchableOpacity>
            {optionsVisible && (
                <View style={styles.optionsOpened}>
                    <Text style={dynamicStyles.text}>Deletar</Text>
                    <Text style={dynamicStyles.text}>Editar</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    options: {
        position: "absolute",
        right: 20,
        top: 10,
    },
    optionsOpened: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        position: "absolute",
        right: -10,
        top: 25,
        width: 100,
        backgroundColor: "white",
        zIndex: 9,
        borderRadius: 10,
        gap: 10,
        borderWidth: 1,
        borderColor: "#ccc"
    },
})