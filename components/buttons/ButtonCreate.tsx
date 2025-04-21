import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

interface ButtonCreateProps {
    subButtons?: {
        text: string;
        icon: any;
        onPress: any;
    }[],
    onPress?: () => void,
    bottom?: number,
    right?: number
}

export default function ButtonCreate({ subButtons, onPress, bottom = 120, right = 20 }: ButtonCreateProps) {
    const dynamicStyles = useTheme()

    const [open, setOpen] = useState(false)

    return (
        <View style={[styles.container, { bottom, right }]}>
            {open && subButtons?.map((subBtn, index) => (
                <View key={index} style={styles.subButtons}>
                    <TouchableOpacity style={styles.subBtn} onPress={subBtn.onPress}>
                        {subBtn.icon}
                        <Text style={[dynamicStyles.text, styles.subBtnText]}>{subBtn.text}</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <Pressable
                onPress={subButtons ? () => setOpen(!open) : onPress}
                style={styles.btn}
            >
                {open ? <AntDesign name="close" size={30} color="white" /> : <AntDesign name="plus" size={30} color="white" />}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 20,
        zIndex: 4
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
    },
    subBtn: {
        backgroundColor: Colors.light.tint,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 40,
        flexDirection: "row",
        gap: 6
    },
    subBtnText: {
        color: "white",
        fontSize: 14
    }
})