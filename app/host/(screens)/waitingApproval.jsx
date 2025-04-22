import { StyleSheet, Text, View } from 'react-native'
import Container from '@/src/components/container';
import SimpleButton from '@/src/components/buttons/SimpleButton'
import { useTheme } from '@/src/hooks/useTheme';
import { router } from 'expo-router';
import Floating from '@/assets/images/illustrations/undraw/floating.svg';

export default function WaitingApprovalScreen() {

    const dynamicStyles = useTheme();

    return (
        <Container>
            <View style={styles.container}>
                <Floating width={350} height={280} />
                <View>
                    <Text style={dynamicStyles.title}>Sua conta está em análise!</Text>
                    <Text style={dynamicStyles.text}>Obrigada por usar nosso aplicativo! Estamos verificando sua conta e retornaremos em breve. Fique de olho no e-mail cadastrado.</Text>
                </View>
                <SimpleButton width='100%' text="Explorar" onPress={() => router.push('/host/(tabs)')}/>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: '100%',
        paddingBottom: 20,
        paddingTop: 100
    },
    content: {
        gap: 50
    }
})