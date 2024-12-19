import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { useEffect } from "react";
import google from '@/assets/images/google.png'

WebBrowser.maybeCompleteAuthSession()

function GoogleAuthentication() {

    // const web = process.env.GOOGLE_WEB_CLIENT_ID
    // const expo = process.env.GOOGLE_EXPO_CLIENT_ID
    // const ios = process.env.GOOGLE_IOS_CLIENT_ID
    // const android = process.env.GOOGLE_ANDROID_CLIENT_ID

    const web = '697065224322-mg9quhpnau32dh43upf230l1d78oa8q7.apps.googleusercontent.com'
    const expo = '697065224322-i9nkjrv2jr3s2aquklc4ot142j6u5nco.apps.googleusercontent.com'
    const ios = '697065224322-aq3rj0f550aekmer7dn3g16e5la22ces.apps.googleusercontent.com'
    const android = '697065224322-isjlgjm6ird06jvpgttr2q8fltr4f8b8.apps.googleusercontent.com'

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: expo,
        iosClientId: Platform.OS === 'ios' ? ios : undefined,
        androidClientId: Platform.OS === 'android' ? android : undefined,
        webClientId: web,
        scopes: ["profile", "email"]
    });

    const handleToken = () => {
        if (response?.type === 'success') {
            const { authentication } = response;
            const token = authentication?.accessToken;
            console.log("Access Token", token);
        }
    }

    useEffect(() => {
        handleToken();
    }, [])

    return (
        <TouchableOpacity style={styles.container} onPress={() => promptAsync()}>
            <Image source={google} style={styles.logo}/>
            <Text style={styles.text}>Sign in with Google</Text>
        </TouchableOpacity>
    )
}

export default GoogleAuthentication;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        elevation: 2,
        shadowOpacity: 0.2,
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