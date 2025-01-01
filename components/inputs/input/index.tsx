import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n';
import { useTheme } from '@/hooks/useThemeColor';

interface InputProps {
    label: string;
    placeholder: string;
    value: any;
    onChange?: (text: string) => void;
    onPress?: () => void;
    required?: boolean;
    errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    value,
    onChange,
    onPress,
    required = false,
    errorMessage
}) => {
    const { t } = useTranslation();
    const dynamicStyles = useTheme()
    const [isTouched, setIsTouched] = useState(false);

    const showError = required && isTouched && !value;

    return (
        <View style={styles.fieldContainer}>
            <Text style={dynamicStyles.label}>{t(label)}</Text>
            <TextInput
                style={[styles.input, showError && styles.inputError]}
                placeholder={t(placeholder)}
                value={value}
                onChangeText={(text) => {
                    if (onChange) onChange(text);
                    if (!isTouched) setIsTouched(true);
                }}
                onBlur={() => setIsTouched(true)}
                onPress={onPress}
                keyboardType="default"
                multiline={true}
                placeholderTextColor="#494949"
            />
            {showError && <Text style={styles.errorText}>{errorMessage || t('Esse campo é obrigatório')}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#f7f7f7',
        width: '100%',
        padding: 18,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
        // lineHeight: 28
    },
    inputError: {
        borderColor: '#ff4d4f', // Cor do erro
    },
    errorText: {
        color: '#ff4d4f',
        fontSize: 14,
        marginTop: 5,
    },
});

export default Input;
