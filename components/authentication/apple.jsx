import * as AppleAuthentication from 'expo-apple-authentication';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { appleAuth } from "@/redux/slices/user/slice";
import { useStorageState } from '@/hooks/useStorageState';

function IOSAuthentication({ role }) {

    const dispatch = useDispatch();
    const [[loading, storedUser], setStoredUser] = useStorageState('user');

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

                    // Dispatch para autenticar e salvar os dados no Redux
                    const result = await dispatch(appleAuth({ identityToken, fullName, role })).unwrap();

                    // Armazena os dados retornados do dispatch no armazenamento seguro
                    setStoredUser(JSON.stringify(result));

                    console.log('Dados armazenados com sucesso:', result);

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
