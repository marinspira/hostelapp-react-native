import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../input';
import { Platform } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

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
    const [show, setShow] = useState(false);
    const [date, setDate] = useState<Date | undefined>(value || undefined);
    const [error, setError] = useState<string | null>(null);

    const dynamicStyles = useTheme()

    const validateDate = (selectedDate?: Date) => {
        if (selectedDate) {
            if (maximumDate && selectedDate > maximumDate || minimumDate && selectedDate < minimumDate) {
                setError(errorMessage);
                return false;
            }
        }
        setError(null);
        return true;
    };

    const showCalendar = () => {
        setShow(true);
        DateTimePickerAndroid.open({
            value: date || new Date(),
            onChange: handleChange,
            mode: 'date',
            is24Hour: true,
        });
    };

    const handleChange = (event: any, selectedDate?: Date) => {
        setShow(false);
        if (validateDate(selectedDate)) {
            setDate(selectedDate);
            onChange?.(selectedDate!);
        }
    };

    const displayedValue = value || date;

    if (Platform.OS === 'ios') {
        return (
            <View style={[styles.inputDateIos, { width }]}>
                <Text style={dynamicStyles.label}>{label}</Text>
                {suportText && <Text style={styles.suportText}>{suportText}</Text>}
                <DateTimePicker
                    testID="dateTimePicker"
                    value={displayedValue ? displayedValue : new Date()}
                    mode="date"
                    is24Hour={true}
                    onChange={handleChange}
                    locale="en-GB"
                    style={styles.datePickerIos}
                    textColor="#000"
                    themeVariant="light"
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    } else {
        return (
            <View style={[styles.container, { width }]}>
                <Input
                    onPress={showCalendar}
                    label={label}
                    placeholder={placeholder}
                    value={displayedValue?.toLocaleDateString('en-GB')}
                />
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={displayedValue ? displayedValue : new Date()}
                        mode="date"
                        is24Hour={true}
                        onChange={handleChange}
                        locale="en-GB"
                        minimumDate={minimumDate}
                        maximumDate={maximumDate}
                    />
                )}
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    }
};

export default InputDate;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputDateIos: {
        padding: 0,
        marginBottom: 4
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    datePickerIos: {
        left: -10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        // position: 'absolute',
        // top: 75
        marginTop: 10
    },
    suportText: {
        fontSize: 12,
        marginBottom: 10,
        color: '#b1b1b1',
        marginTop: -3,
    },
});
