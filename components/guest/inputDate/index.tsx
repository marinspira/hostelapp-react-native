import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { View } from 'react-native';
import Input from '../input';

interface InputDateProps {
    label?: any;
    placeholder?: string;
    value?: Date;
    onChange?: (date: Date) => void;
}

const InputDate: React.FC<InputDateProps> = ({
    label,
    placeholder = 'DD/MM/YYYY',
    value,
    onChange,
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

    return (
        <View>
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
                />
            )}
        </View>
    );
};

export default InputDate;
