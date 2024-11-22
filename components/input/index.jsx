import React from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';

export default function Input({ label, placeholder, value, onChange }) {
    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.formTitle}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                multiline={true}
            />
        </View>
    )
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
    input: {
        backgroundColor: '#f7f7f7',
        width: '100%',
        padding: 12,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
    },
})