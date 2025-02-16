import { Colors } from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'

export default function Title({
    text,
    marginTop = 50,
    marginBottom = 0,
    fontSize = 20,
    color = Colors.black
}) {

    const { t, i18n } = useTranslation();

    return (
        <Text
            style={[styles.text, {
                marginTop: marginTop,
                marginBottom: marginBottom,
                fontSize: fontSize,
                color: color
            }]}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'PoppinsRegular',
        fontWeight: '600',
    }
})