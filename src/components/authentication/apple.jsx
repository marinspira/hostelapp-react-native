import * as AppleAuthentication from 'expo-apple-authentication';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { appleAuth } from "@/src/redux/slices/user";

function IOSAuthentication({ role }) {

    const dispatch = useDispatch();

    return (
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

                    const fullName = `${credential.fullName.givenName} ${credential.fullName.familyName}`
                    const identityToken = credential.identityToken

                    dispatch(appleAuth({ identityToken, fullName, role })).unwrap();

                } catch (e) {
                    if (e.code === 'ERR_REQUEST_CANCELED') {
                        console.log('User canceled sign-in flow');
                    } else {
                        console.error('Error during Apple Sign-In:', e);
                    }
                }
            }}
        />
    );
}

export default IOSAuthentication;

const styles = StyleSheet.create({
    button: {
        elevation: 2,
        paddingHorizontal: 20,
        width: '80%',
        maxWidth: 280,
        paddingVertical: 26,
        borderRadius: 5,
        marginBottom: 20,
    },
});
