import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import SimpleButton from '@/components/buttons/SimpleButton'
import Logo from '@/assets/images/illustrations/undraw/cabin.svg'
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { Colors } from '@/constants/Colors'

function LoginScreen() {

    const { role } = useLocalSearchParams();
    const { t, i18n } = useTranslation();

    return (
        <View style={styles.container}>
            <Logo width={120} height={120} />
            <Text style={styles.title}>Logar como {role === 'guest' ? 'Hóspede' : 'Host'}</Text>
            <SimpleButton
                text={role === "guest" ? t("Sou host") : t("Sou hóspede")}
                onPress={() => router.push("/screens/welcome")}
                backgroundColor="transparent"
                textColor={Colors.purple}
            />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'PoppinsBold',
        marginTop: 50,
        fontSize: 26,
        marginBottom: 150
    }
})