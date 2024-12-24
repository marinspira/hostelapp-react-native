import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { StyleSheet, View } from 'react-native';
import Input from '../input';
import { Platform } from 'react-native';

interface InputDateProps {
    label?: any;
    placeholder?: string;
    value?: Date;
    onChange?: (date: Date) => void;
    maximumDate?: Date,
    minimumDate?: Date
}

const InputDate: React.FC<InputDateProps> = ({
    label,
    placeholder = 'DD/MM/YYYY',
    value,
    onChange,
    maximumDate,
    minimumDate
}) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState<Date | undefined>(value || undefined);

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
        if (selectedDate) {
            setShow(false);
            setDate(selectedDate);
            onChange?.(selectedDate);
        }
    };

    const displayedValue = value ? value : date;

    if (Platform.OS === 'ios') {
        return (
            <View style={styles.inputDateIos}>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={displayedValue ? displayedValue : new Date()}
                    mode="date"
                    is24Hour={true}
                    onChange={handleChange}
                    locale="en-GB"
                    style={styles.datePickerIos}
                />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Input
                    onPress={showCalendar}
                    label={label}
                    placeholder={placeholder}
                    value={displayedValue?.toLocaleDateString('en-GB')}
                />
                {show &&
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
                }
            </View>
        )
    }
};

export default InputDate;

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    inputDateIos: {
        backgroundColor: '#f7f7f7',
        width: '100%', // Ocupa toda a largura disponível
        padding: 0, // Remove padding para evitar deslocamento
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 14,
    },
    datePickerIos: {
        width: '100%', // Garante que o DatePicker ocupe toda a largura
        height: '100%', // Ajusta a altura ao tamanho do input
    },
})