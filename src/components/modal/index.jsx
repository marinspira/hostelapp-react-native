import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useTheme } from '@/src/hooks/useTheme';

const { width, height } = Dimensions.get('window');

export default function PopUp({ modalVisible, setModalVisible, children }) {
    const dynamicStyles = useTheme();

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            transparent
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalContainer, { width: width * 0.95, maxHeight: height * 0.80 }]}>
                            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={dynamicStyles.text}>X</Text>
                            </Pressable>
                            <ScrollView>
                                {children}
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
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
        minHeight: 150,
        maxWidth: 500
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    }
})