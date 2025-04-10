import { Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '@/hooks/useTheme';

const { width } = Dimensions.get('window');

export default function PopUp({ modalVisible, setModalVisible, children }) {
    const dynamicStyles = useTheme();

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            transparent
        >
            <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
                <View style={[styles.modalContainer, { width: width * 0.95 }]}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.buttonText}>X</Text>
                    </TouchableOpacity>
                    {children}
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        minHeight: 150
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20
    }
})