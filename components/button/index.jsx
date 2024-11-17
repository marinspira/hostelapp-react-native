import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

export default function SimpleButton({ onPress, text, backgroundColor = '#9370DB', textColor= '#fff' }) {
    return (
        <Pressable style={[styles.button, { backgroundColor: backgroundColor }]} onPress={onPress}>
            <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 4,
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        textAlign: 'center'
    },
})