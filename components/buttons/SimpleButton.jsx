import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { Colors } from '@/constants/Colors'

export default function SimpleButton
    ({
        onPress,
        text,
        backgroundColor = Colors.purple,
        textColor = Colors.white,
        width = 'auto',
        textTransform = '',
        fontSize = 18,
        disabled
    }) {
    return (
        <Pressable
            style={[
                styles.button,
                {
                    backgroundColor: backgroundColor,
                    width: width,
                    textTransform: 'uppercase'
                }
            ]}
            onPress={!disabled ? onPress : null}
        >
            <Text style={[styles.buttonText, { color: textColor, textTransform, fontSize }]}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        // elevation: 4,
        // shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'PoppinsRegular'
    },
})