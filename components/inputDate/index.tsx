import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Text, View } from 'react-native';
import Input from '../input';

interface InputDateProps {
    label?: string;
    placeholder?: string;
    value?: Date | undefined; 
    onChange?: (date: Date) => void;
}

const InputDate: React.FC<InputDateProps> = ({
    label = 'Your birthday',
    placeholder = 'DD/MM/YYYY',
    value,
    onChange,
}) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState<Date>(value || new Date());

    const showCalendar = () => {
        setShow(true);
        DateTimePickerAndroid.open({
            value: date,
            onChange: handleChange,
            mode: 'date',
            is24Hour: true,
        });
    };

    const handleChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setShow(false);

            // Atualizar estado interno se `value` não for controlado externamente
            if (!onChange) {
                setDate(selectedDate);
            }

            // Notificar o componente pai sobre a mudança
            onChange?.(selectedDate);
        }
    };

    const displayedValue = value ? value : date; // Priorizar `value` vindo das props

    return (
        <View>
            <Input
                onPress={showCalendar}
                label={label}
                placeholder={placeholder}
                value={displayedValue.toLocaleDateString('en-GB')}
            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={displayedValue}
                    mode="date"
                    is24Hour={true}
                    onChange={handleChange}
                    locale="en-GB"
                />
            )}
        </View>
    );
};

export default InputDate;
