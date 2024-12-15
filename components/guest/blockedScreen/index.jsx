import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SimpleButton from '@/components/guest/button';
import access from '@/assets/images/access.png'
import activities from '@/assets/images/activities.png'

export default function BlockedScreen({ btn }) {
    return (
        <View style={styles.blockedOverlay}>
            <View style={styles.blockedContent}>
                <Image
                    source={activities}
                    style={styles.lockImage}
                />
                <Text style={styles.blockedText}>
                    Be part of our community!
                </Text>
                <SimpleButton onPress={btn.onPress} text={btn.text} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    blockedOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Camada branca com transparência
        backdropFilter: 'blur(5px)', // Suporte ao CSS para Web ou componentes adicionais
    },
    blockedContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Branco quase opaco
        width: '100%',
    },
    lockImage: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    blockedText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
});
