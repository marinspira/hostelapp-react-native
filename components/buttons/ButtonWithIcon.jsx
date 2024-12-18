import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ButtonWithIcon
    ({
        onPress,
        text,
        backgroundColor = Colors.purple,
        textColor = Colors.white,
        width = 'auto',
        icon,
        borderColor
    }) {
    return (
        <Pressable
            style={[
                styles.button,
                {
                    backgroundColor: backgroundColor,
                    width: width,
                    borderColor: borderColor,
                    borderWidth: borderColor ? 2 : 0
                }
            ]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { color: textColor }]}>
                {text}
            </Text>
            {icon &&
                <View style={[
                    styles.iconContainer,
                    {
                        borderColor: borderColor ? borderColor : Colors.white,
                        backgroundColor: borderColor ? borderColor : 'transparent'
                    }
                ]}>
                    {icon}
                </View>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 100,
        elevation: 4,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        display: 'flex',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'PoppinsRegular',
    },
    iconContainer: {
        borderWidth: 2,
        borderRadius: 100,
        padding: 8,
        position: 'absolute',
        right: 15,
        top: 10
    }
})