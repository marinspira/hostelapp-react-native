import React, { useState } from 'react';
import { Platform, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '@/constants/Colors';
import '@/assets/translations/i18n';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useThemeColor';

interface InputSelectProps {
    selectInputItems: string[];
    label: string;
    value: string;
    suportText?: string;
    onChange: (value: string) => void;
}

export default function InputSelect({ selectInputItems, label, value, onChange, suportText }: InputSelectProps) {
    const [selectItem, setSelectItem] = useState<string>(value || '');
    const [showModal, setShowModal] = useState<boolean>(false);

    const { t } = useTranslation();
    const dynamicStyles = useTheme()

    const handleValueChange = (itemValue: string) => {
        setSelectItem(itemValue);
        onChange(itemValue);
    };

    return (
        <View style={styles.fieldContainer}>
            <Text style={dynamicStyles.label}>{label}</Text>
            {suportText && <Text style={styles.suportText}>{suportText}</Text>}

            {/* Modal para iOS */}
            {Platform.OS === 'ios' && (
                <>
                    <Pressable
                        style={styles.selectInputContainer}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={styles.selectInputText}>
                            {selectItem || t('Selecione uma opção')}
                        </Text>
                    </Pressable>
                    <Modal
                        visible={showModal}
                        transparent
                        animationType="slide"
                        onRequestClose={() => setShowModal(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>{label}</Text>
                                <Picker
                                    selectedValue={selectItem}
                                    onValueChange={(itemValue) => setSelectItem(itemValue)}
                                    style={styles.selectInput}
                                    itemStyle={{ color: '#000' }}
                                >
                                    {!selectItem && (
                                        <Picker.Item label={t('Selecione uma opção')} value={null} style={{ color: '#aaa' }} />
                                    )}
                                    {selectInputItems.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                                <Pressable
                                    style={styles.closeButton}
                                    onPress={() => {
                                        setShowModal(false);
                                        onChange(selectItem);
                                    }}
                                >
                                    <Text style={styles.closeButtonText}>{t('Selecionar')}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </>
            )}

            {/* Picker padrão para Android */}
            {Platform.OS === 'android' && (
                <View style={styles.selectInputAndroid}>
                    <Picker
                        selectedValue={selectItem}
                        onValueChange={handleValueChange}
                        style={styles.selectInput}
                    >
                        {!selectItem && (
                            <Picker.Item label={t('Selecione uma opção')} value={null} style={{ color: '#aaa' }} />
                        )}
                        {selectInputItems.map((item, index) => (
                            <Picker.Item key={index} label={item} value={item} />
                        ))}
                    </Picker>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 30,
    },
    selectInput: {
        backgroundColor: '#f7f7f7',
        width: '100%',
        borderRadius: 8,
        color: '#000',
    },
    selectInputText: {
        fontSize: 14,
        color: '#555',
    },
    selectInputContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 18,
        backgroundColor: '#f7f7f7',
    },
    selectInputAndroid: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f7f7f7',
    },
    suportText: {
        fontSize: 12,
        marginBottom: 15,
        color: '#b1b1b1',
        marginTop: -3,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: Colors.light.tint,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
