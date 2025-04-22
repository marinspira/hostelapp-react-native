import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { Colors } from '@/src/constants/Colors'

export default function SimpleButton
    ({
        onPress,
        text,
        backgroundColor = Colors.light.tint,
        textColor = '#fff',
        width = 'auto',
        textTransform = '',
        fontSize = 18,
        disabled = false,
        borderRadius = 5,
        paddingHorizontal = 20,
        paddingVertical = 12,
        marginTop
    }) {
    return (
        <Pressable
            style={[
                styles.button,
                {
                    backgroundColor: disabled ? '#6c63ff6b' : backgroundColor,
                    width: width,
                    textTransform: 'uppercase',
                    borderRadius,
                    paddingVertical,
                    paddingHorizontal,
                    marginTop
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
        // elevation: 4,
        // shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'PoppinsRegular'
    },
})