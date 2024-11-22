import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface InputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange?: (text: string) => void;
    onPress?: () => void;
}

const Input: React.FC<InputProps> = ({ label, placeholder, value, onChange, onPress }) => {
    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.formTitle}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onPress={onPress}
                keyboardType="default"
                multiline={true}
                placeholderTextColor="#494949"
            />
        </View>
    );
};

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
    input: {
        backgroundColor: '#f7f7f7',
        width: '100%',
        padding: 16,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 14,
    },
});

export default Input;