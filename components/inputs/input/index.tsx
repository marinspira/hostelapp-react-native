import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TextInput, View } from 'react-native';
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
    inputTexting?: boolean
}

const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    value,
    onChange,
    onPress,
    required = false,
    errorMessage,
    inputTexting
}) => {
    const { t } = useTranslation();
    const dynamicStyles = useTheme()
    const [isTouched, setIsTouched] = useState(false);

    const showError = required && isTouched && !value;

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
                    value={value}
                    onChangeText={(text) => {
                        if (onChange) onChange(text);
                        if (!isTouched) setIsTouched(true);
                    }}
                    onBlur={() => setIsTouched(true)}
                    onPress={onPress}
                    keyboardType="default"
                    multiline={true}
                    placeholderTextColor="#bbb"
                />
                {inputTexting && (
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
        height: 60,
        width: 4,
        backgroundColor: 'black',
        marginLeft: 5
    },
    inputTexting: {
        fontSize: 60,
        fontFamily: 'PoppinsBold',
        paddingRight: 0,
    },
    inputTextingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
