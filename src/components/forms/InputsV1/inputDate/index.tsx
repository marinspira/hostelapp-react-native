import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
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
    time?: boolean;
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

const parseDate = (dateText: string): Date | null => {
    const [day, month, year] = dateText.split('/').map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return null;
    }

    const utcTimestamp = Date.UTC(year, month - 1, day);
    const date = new Date(utcTimestamp);

    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
        return null;
    }

    return date;
};

const parseDateTime = (dateText: string, timeText: string): Date | null => {
    const [day, month, year] = dateText.split('/').map(Number);
    const [hour, minute] = timeText.split(':').map(Number);

    if (
        isNaN(day) || isNaN(month) || isNaN(year) ||
        day < 1 || day > 31 ||
        month < 1 || month > 12 ||
        year < 1000 || year > 2050 ||
        isNaN(hour) || isNaN(minute) ||
        hour > 23 || minute > 59
    ) {
        return null;
    }

    const utcTimestamp = Date.UTC(year, month - 1, day, hour, minute);
    const date = new Date(utcTimestamp);

    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day ||
        date.getUTCHours() !== hour ||
        date.getUTCMinutes() !== minute
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
    width = '100%',
    time = false
}) => {
    const [dateText, setDateText] = useState('');
    const [timeText, setTimeText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dynamicStyles = useTheme();
    const { t } = useTranslation();

    useEffect(() => {
        if (value) {
            const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
            const dateFormatted = value.toLocaleDateString(userLocale);
            const timeFormatted = value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setDateText(dateFormatted);
            setTimeText(timeFormatted);
        }
    }, [value]);

    const validateDate = (date: Date | null, skipRangeCheck: boolean = false) => {
        if (!date) {
            setError(errorMessage || t('Data inválida'));
            return false;
        }
        if (!skipRangeCheck) {
            if (maximumDate && date > maximumDate) {
                setError(errorMessage || t('Data muito futura'));
                return false;
            }
            if (minimumDate && date < minimumDate) {
                setError(errorMessage || t('Data muito antiga'));
                return false;
            }
        }
        setError(null);
        return true;
    };
    
    const handleChange = (currentDateText: string, currentTimeText: string) => {

        let date = parseDate(currentDateText);

        const isTimeIncomplete = time && currentTimeText.length < 5;
        if (time && currentTimeText.length === 5) {
            date = parseDateTime(currentDateText, currentTimeText);
        }

        const isValid = validateDate(date, isTimeIncomplete);
        
        if (isValid && !isTimeIncomplete) {
            setError(null); 
            onChange?.(date!);
        }
        
        if (isValid && isTimeIncomplete) {
            setError(null);
        }
    };
    
    const handleDateChange = (input: string) => {
        const formatted = formatToDDMMYYYY(input);
        setDateText(formatted);
        if (formatted.length === 10) handleChange(formatted, timeText);
    };

    const handleTimeChange = (input: string) => {
        const cleaned = input.replace(/\D/g, '').slice(0, 4);
        let hour = cleaned.slice(0, 2);
        let minute = cleaned.slice(2, 4);

        if (hour && parseInt(hour) > 23) hour = '23';
        if (minute && parseInt(minute) > 59) minute = '59';

        const formatted = `${hour}${minute ? ':' + minute : ''}`;
        setTimeText(formatted);

        if (formatted.length === 5) handleChange(dateText, formatted);
    };

    return (
        <View style={[styles.container, { width }]}>
            {typeof label === 'string' && <Text style={dynamicStyles.label}>{label}</Text>}
            {typeof suportText === 'string' && <Text style={styles.suportText}>{suportText}</Text>}
            <View style={time ? styles.row : {}}>
                <TextInput
                    style={[styles.input, error ? { borderColor: 'red' } : {}, time && { marginRight: 8, flex: 1 }]}
                    placeholder={placeholder}
                    value={dateText}
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={handleDateChange}
                    placeholderTextColor="#aaa"
                />
                {time && (
                    <TextInput
                        style={[styles.input, error ? { borderColor: 'red' } : {}, { flex: 1 }]}
                        placeholder="HH:MM"
                        value={timeText}
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={handleTimeChange}
                        placeholderTextColor="#aaa"
                    />
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default InputDate;

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
