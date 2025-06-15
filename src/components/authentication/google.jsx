import { Image, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session';
import { useEffect } from "react";
import google from '@/assets/images/google.png'
import { useDispatch } from 'react-redux';
import { googleAuth } from "@/src/redux/slices/user";

WebBrowser.maybeCompleteAuthSession()

const web = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
const expo = process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID
const ios = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
const android = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID

function GoogleAuthentication({ role }) {

    const dispatch = useDispatch()

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: expo,
        iosClientId: Platform.OS === 'ios' ? ios : undefined,
        androidClientId: Platform.OS === 'android' ? android : undefined,
        webClientId: web,
        scopes: ["profile", "email"]
    });

    useEffect(() => {
        handleToken();
    }, [response])

    async function handleToken() {
        if (response?.type === 'success') {
            const { authentication } = response;
            const token = authentication?.accessToken;

            dispatch(googleAuth({ token, role })).unwrap();
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => promptAsync()}>
            <Image source={google} style={styles.logo} />
            <Text style={styles.text}>Sign in with Google</Text>
        </TouchableOpacity>
    )
}

export default GoogleAuthentication;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        elevation: 2,
        // boxShadow: 0.2,
        shadowOffset: 10,
        paddingHorizontal: 20,
        width: '80%',
        maxWidth: 280,
        paddingVertical: 15,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    logo: {
        width: 20,
        height: 20
    },
    text: {
        fontSize: 22,
        fontWeight: 600
    }
})
