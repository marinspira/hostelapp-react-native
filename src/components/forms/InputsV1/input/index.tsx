import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n';
import { useTheme } from '@/src/hooks/useTheme';

interface InputProps {
    label: string;
    placeholder: string;
    value: any;
    onChange?: (text: string) => void;
    onPress?: () => void;
    required?: boolean;
    errorMessage?: string;
    inputTexting?: boolean;
    onBlur?: () => void;
    onlyNumbers?: boolean;
    testID?: string
}

const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    value,
    onChange,
    onPress,
    required = false,
    errorMessage,
    inputTexting = false,
    onBlur,
    onlyNumbers,
    testID
}) => {
    const { t } = useTranslation();
    const dynamicStyles = useTheme()
    const [isTouched, setIsTouched] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);

    const showError = required && isTouched && (value === '');

    const cursorOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const blink = Animated.loop(
            Animated.sequence([
                Animated.timing(cursorOpacity, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(cursorOpacity, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );
        blink.start();

        return () => blink.stop();
    }, []);

    return (
        <View style={styles.fieldContainer}>
            <Text style={dynamicStyles.label}>{t(label)}</Text>
            <View style={styles.inputTextingContainer}>
                <TextInput
                    style={[(inputTexting ? styles.inputTexting : styles.input), showError && styles.inputError]}
                    placeholder={t(placeholder)}
                    value={value ?? ''}
                    onChangeText={(text) => {
                        const cleanText = onlyNumbers ? text.replace(/[^0-9]/g, '') : text;
                        if (onChange) onChange(cleanText);
                    }}
                    onFocus={() => {
                        if (!isTouched) setIsTouched(true);
                        setIsTouched(false)
                    }}
                    onBlur={() => {
                        setIsTouched(true)
                        if (onBlur) onBlur();
                    }}
                    onPress={onPress}
                    keyboardType={onlyNumbers ? 'numeric' : 'default'}
                    multiline={true}
                    placeholderTextColor="#bbb"
                    testID={testID}
                />
                {inputTexting && !inputFocus && (
                    <Animated.View style={[styles.inputCursor, { opacity: cursorOpacity }]} />
                )}
            </View>
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
        minWidth: '100%',
        padding: 18,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
    },
    inputCursor: {
        height: 45,
        width: 4,
        backgroundColor: 'black',
        marginLeft: 10,
        marginBottom: 10,
    },
    inputTexting: {
        fontSize: 45,
        fontFamily: 'PoppinsBold',
    },
    inputTextingContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        minWidth: '100%'
    },
    inputError: {
        borderColor: '#ff4d4f',
    },
    errorText: {
        color: '#ff4d4f',
        fontSize: 14,
        marginTop: 5,
    },
});

export default Input;
