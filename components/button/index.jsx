import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

export default function SimpleButton({ onPress, text }) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#9370DB',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 4,
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
    },
})