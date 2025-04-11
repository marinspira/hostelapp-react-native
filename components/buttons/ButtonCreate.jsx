import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

export default function ButtonCreate({ subButtons }) {
    const dynamicStyles = useTheme()

    const [open, setOpen] = useState(false)

    return (
        <View style={styles.container}>
            {open && subButtons?.map((subBtn, index) => (
                <View key={index} style={styles.subButtons}>
                    <Text style={dynamicStyles.text}>{subBtn.text}</Text>
                    <TouchableOpacity style={styles.subBtn} onPress={subBtn.onPress}>
                        {subBtn.icon}
                    </TouchableOpacity>
                </View>
            ))}
            <Pressable onPress={() => setOpen(!open)} style={styles.btn}>
                {open ? <AntDesign name="close" size={30} color="white" /> : <AntDesign name="plus" size={30} color="white" />}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 30,
        bottom: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 20
    },
    btn: {
        backgroundColor: Colors.light.tint,
        width: 70,
        height: 70,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginRight: 12
    },
    subBtn: {
        backgroundColor: Colors.light.tint,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45
    }
})