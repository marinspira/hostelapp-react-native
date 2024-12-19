import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import SimpleButton from '@/components/buttons/SimpleButton'
import Logo from '@/assets/images/illustrations/undraw/cabin.svg'
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { Colors } from '@/constants/Colors'
import * as AppleAuthentication from 'expo-apple-authentication';

function LoginScreen() {

    const { role } = useLocalSearchParams();
    const { t, i18n } = useTranslation();

    return (
        <View style={styles.container}>
            <Logo width={120} height={120} />
            <Text style={styles.title}>Logar como {role === 'guest' ? 'Hóspede' : 'Host'}</Text>
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={styles.button}
                onPress={async () => {
                    try {
                        const credential = await AppleAuthentication.signInAsync({
                            requestedScopes: [
                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                            ],
                        });
                        // signed in
                    } catch (e) {
                        if (e.code === 'ERR_REQUEST_CANCELED') {
                            // handle that the user canceled the sign-in flow
                        } else {
                            // handle other errors
                        }
                    }
                }}
            />
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
    },
    button: {
        width: 200,
        height: 44,
    },
})