import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function SelectItens({ label, options, suportText, onSelectionChange, maxSelections = 1 }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleOption = (option) => {
        const isSelected = selectedOptions.includes(option);
    
        // Calcular a nova lista de seleções
        const newSelection = isSelected
            ? selectedOptions.filter((item) => item !== option) // Remover se já estiver selecionado
            : selectedOptions.length < maxSelections
            ? [...selectedOptions, option] // Adicionar se não atingir o limite
            : selectedOptions; // Manter o mesmo se o limite for atingido
    
        // Atualizar o estado e acionar callback
        setSelectedOptions(newSelection);
        onSelectionChange && onSelectionChange(newSelection);
    };
    

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.formTitle}>{label}</Text>
            {suportText && <Text style={styles.suportText}>{suportText}</Text>}
            <View style={styles.optionsContainer}>
                {options.map((option) => {
                    const isSelected = selectedOptions.includes(option);
                    return (
                        <Pressable
                            key={option}
                            style={[styles.button, isSelected && styles.selectedButton]}
                            onPress={() => toggleOption(option)}
                        >
                            <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
                                {option} {isSelected && "×"}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 60,
        alignSelf: 'flex-start',
        marginVertical: 5,
        marginRight: 10,
        borderColor: '#a1a1a1',
        backgroundColor: 'white',
    },
    selectedButton: {
        backgroundColor: '#9f39ff',
        borderColor: '#9f39ff',
    },
    buttonText: {
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: '800',
        letterSpacing: 1,
        fontFamily: 'PoppinsRegular',
        color: '#333',
    },
    selectedButtonText: {
        color: '#ffffff',
    },
    suportText: {
        fontSize: 12,
        marginBottom: 15,
        color: '#b1b1b1',
        marginTop: -3,
    },
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
    optionsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
});
