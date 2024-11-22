import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Text, View } from 'react-native';
import Input from '../input'

export default function InputDate() {

    const [show, setShow] = useState(false)
    const [date, setDate] = useState(new Date(1598051730000))

    const showCalendar = () => {
        setShow(true)

        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: 'date',
            is24Hour: true,
        });
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
      };

    return (
        <View>
            <Input
                onPress={showCalendar}
                label='Your birthday'
                placeholder='DD/MM/YYYY'
                value={date.toLocaleDateString("en-GB")}
            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    onChange={onChange}
                    locale=""
                />
            )}
        </View>
    )
}
