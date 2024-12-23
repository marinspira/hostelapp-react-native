import { Image, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { useEffect } from "react";
import google from '@/assets/images/google.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser, googleAuth } from "@/redux/slices/user/slice";
import { router } from "expo-router";

WebBrowser.maybeCompleteAuthSession()

// const web = process.env.GOOGLE_WEB_CLIENT_ID
// const expo = process.env.GOOGLE_EXPO_CLIENT_ID
// const ios = process.env.GOOGLE_IOS_CLIENT_ID
// const android = process.env.GOOGLE_ANDROID_CLIENT_ID

const web = '697065224322-mg9quhpnau32dh43upf230l1d78oa8q7.apps.googleusercontent.com'
const expo = '697065224322-i9nkjrv2jr3s2aquklc4ot142j6u5nco.apps.googleusercontent.com'
const ios = '697065224322-aq3rj0f550aekmer7dn3g16e5la22ces.apps.googleusercontent.com'
const android = '697065224322-isjlgjm6ird06jvpgttr2q8fltr4f8b8.apps.googleusercontent.com'

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

            try {
                const userInfo = await getGoogleUserInfo(token);
                const userData = {
                    name: userInfo.name,
                    email: userInfo.email,
                    googleId: userInfo.id,
                    picture: userInfo.picture,
                    role
                };

                // Atualizar estado global
                dispatch(setUser(userData));

                // Enviar ao backend
                dispatch(googleAuth({ user: userData }));

            } catch (error) {
                console.error('Error handling token:', error);
            }
        }
    }

    // Função para buscar dados do usuário no Google API
    async function getGoogleUserInfo(token) {
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Failed to fetch user info');
            return await response.json();
        } catch (error) {
            console.error('Error fetching Google user info:', error);
            throw error;
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