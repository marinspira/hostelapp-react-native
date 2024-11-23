import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface InputSelectProps {
    selectInputItems: string[];
    label: string;
    value: string;
    suportText?: string;
    onChange: (value: string) => void;
}

export default function InputSelect({ selectInputItems, label, value, onChange, suportText }: InputSelectProps) {
    const [selectItem, setSelectItem] = useState<string>(value);

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.formTitle}>{label}</Text>
            {suportText && <Text style={styles.suportText}>{suportText}</Text>}
            <View style={styles.selectInputContainer}>
                <Picker
                    selectedValue={selectItem}
                    onValueChange={(itemValue) => {
                        setSelectItem(itemValue);
                        onChange(itemValue);
                    }}
                    style={styles.selectInput}
                >
                    <Picker.Item label="Select an option" value={null} />
                    {selectInputItems.map((item, index) => (
                        <Picker.Item key={index} style={styles.selectInputText} label={item} value={item} />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 30,
    },
    formTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    selectInput: {
        backgroundColor: '#f7f7f7',
        width: '100%',
        borderRadius: 8,
    },
    selectInputText: {
        fontSize: 14,
    },
    selectInputContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    suportText: {
        fontSize: 12,
        marginBottom: 15,
        color: '#b1b1b1',
        marginTop: -3,
    },
});
