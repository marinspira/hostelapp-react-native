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
        textTransform = ''
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
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { color: textColor, textTransform: textTransform }]}>
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
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'PoppinsRegular',
        textAlign: 'center'
    },
})