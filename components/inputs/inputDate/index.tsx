import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';

interface InputDateProps {
    label?: any;
    placeholder?: string;
    value?: Date;
    onChange?: (date: Date) => void;
    maximumDate?: Date;
    minimumDate?: Date;
    errorMessage?: any;
    suportText?: string;
    width?: any;
}

const formatToDDMMYYYY = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 8);
    const day = cleaned.slice(0, 2);
    const month = cleaned.slice(2, 4);
    const year = cleaned.slice(4, 8);
    let formatted = '';
    if (day) formatted += day;
    if (month) formatted += '/' + month;
    if (year) formatted += '/' + year;
    return formatted;
};

const parseDate = (text: string): Date | null => {
    const [day, month, year] = text.split('/').map(Number);

    if (
        isNaN(day) || isNaN(month) || isNaN(year) ||
        day < 1 || day > 31 ||
        month < 1 || month > 12 ||
        year < 1000 || year > 2050
    ) {
        return null;
    }

    const date = new Date(year, month - 1, day, 12);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    return date;
};

const InputDate: React.FC<InputDateProps> = ({
    label,
    placeholder = 'DD/MM/YYYY',
    value,
    onChange,
    maximumDate,
    minimumDate,
    errorMessage,
    suportText,
    width = '100%'
}) => {
    const [text, setText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dynamicStyles = useTheme();
    const { t } = useTranslation()

    useEffect(() => {
        if (value) {
            const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
            const formatted = value.toLocaleDateString(userLocale);
            setText(formatted);
            console.log(formatted)
        }
    }, [value]);

    const validateDate = (date: Date | null) => {
        if (!date) {
            setError(errorMessage || t('Data inválida'));
            return false;
        }
        if (maximumDate && date > maximumDate) {
            setError(errorMessage || t('Data muito futura'));
            return false;
        }
        if (minimumDate && date < minimumDate) {
            setError(errorMessage || t('Data muito antiga'));
            return false;
        }
        setError(null);
        return true;
    };

    const handleTextChange = (input: string) => {
        const formatted = formatToDDMMYYYY(input);
        setText(formatted);

        if (formatted.length === 10) {
            const date = parseDate(formatted);
            if (validateDate(date)) {
                onChange?.(date!);
            }
        }
    };

    return (
        <View style={[styles.container, { width }]}>
            {label && <Text style={dynamicStyles.label}>{label}</Text>}
            {suportText && <Text style={styles.suportText}>{suportText}</Text>}
            <TextInput
                style={[
                    styles.input,
                    error ? { borderColor: 'red' } : {}
                ]}
                placeholder={placeholder}
                value={text}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={handleTextChange}
                placeholderTextColor="#aaa"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default InputDate;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f7f7f7',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 6,
    },
    suportText: {
        fontSize: 12,
        marginBottom: 6,
        color: '#b1b1b1',
    },
});
