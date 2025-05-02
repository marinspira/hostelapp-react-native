import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from "@/src/hooks/useTheme";
import { Colors } from "@/src/constants/Colors";
import { useEffect, useState } from "react";

interface ButtonCreateProps {
    subButtons?: {
        text: string;
        icon: any;
        onPress: any;
    }[],
    onPress?: () => void,
    bottom?: number,
    right?: number,
    menuBtn: boolean
}

export default function ButtonCreate({ subButtons, onPress, bottom = 120, right = 20, menuBtn }: ButtonCreateProps) {
    const dynamicStyles = useTheme()

    const [open, setOpen] = useState(false)

    return (
        <View style={menuBtn ? styles.containerBtnMenu : [styles.container, { bottom: bottom, right: right }]}>
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
                style={menuBtn ? styles.menuBtn : styles.btn}
            >
                {open ? <AntDesign name="close" size={30} color="white" /> : <AntDesign name="plus" size={30} color="white" />}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    containerBtnMenu: {
        position: 'absolute',
        bottom: -5,
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
    },
    container: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 10,
        zIndex: 4,
    },
    menuBtn: {
        // backgroundColor: '#9370DB',
        backgroundColor: Colors.light.tint,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#000',
    },
    btn: {
        backgroundColor: Colors.light.tint,
        width: 60,
        height: 60,
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