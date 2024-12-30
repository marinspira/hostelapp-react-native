import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import SimpleButton from '@/components/buttons/SimpleButton'
import Logo from '@/assets/images/illustrations/undraw/cabin.svg'
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { Colors } from '@/constants/Colors'
import IOSAuthentication from '@/components/authentication/apple';
import { StatusBar } from 'expo-status-bar';
import GoogleAuthentication from '@/components/authentication/google';

function LoginScreen() {

    const { role } = useLocalSearchParams();
    const { t, i18n } = useTranslation();

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Logo width={120} height={120} />
            <Text style={styles.title}>Logar como {role === 'guest' ? 'Hóspede' : 'Host'}</Text>

            {Platform.OS === 'ios' && <IOSAuthentication role={role} />}
            <GoogleAuthentication role={role} />

            <SimpleButton
                text={role === "guest" ? t("Não é hospede? Logar como host") : t("Não é host? Logar como hóspede")}
                onPress={() => router.push("/public")}
                backgroundColor="transparent"
                textColor='#000'
                fontSize={16}
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
        backgroundColor: '#fff'
    },
    title: {
        fontFamily: 'PoppinsRegular',
        marginTop: 30,
        fontSize: 26,
        marginBottom: 40
    },
})