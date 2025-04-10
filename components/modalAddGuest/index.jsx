import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '@/hooks/useTheme'

export default function ModalAddGuest({modalVisible, setModalVisible}) {

    const dynamicStyles = useTheme()

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Esse é um modal!</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {

    }
})