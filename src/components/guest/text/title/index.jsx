import { Colors } from '@/src/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { useTheme } from '@/src/hooks/useTheme';

export default function Title({
    title,
    marginTop = 50,
    marginBottom = 0,
    fontSize = 20,
    color = Colors.black
}) {

    const { t, i18n } = useTranslation();

    const dynamicStyles = useTheme()

    return (
        <View style={styles.container}>
            <Text
                style={dynamicStyles.h2}>
                {title}
            </Text>
            <View style={styles.line}/>
           
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'PoppinsRegular',
        fontWeight: '600',
    },
    text: {
        marginVertical: 10
    },
    line: {
        width: 100,
        backgroundColor: Colors.light.tint,
        height: 3,
        marginVertical: 10
    }
})