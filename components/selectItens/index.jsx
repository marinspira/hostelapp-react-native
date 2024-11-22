import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SelectItens({
    label,
    options: initialOptions,
    suportText,
    onSelectionChange,
    maxSelections = 1,
    selectInputItems
}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState(initialOptions || []);
    const [selectItem, setSelectItem] = useState()

    const toggleOption = (option) => {
        const isSelected = selectedOptions.includes(option);

        // Calcular a nova lista de seleções
        let newSelection;

        if (isSelected) {
            // Se já estiver selecionado, remover da lista 
            newSelection = selectedOptions.filter((item) => item !== option);
            if (selectInputItems) {
                setOptions(newSelection)
            }

        } else {
            // Se não tiver atingido o limite, adicionar à lista ou manter a mesma seleção
            if (selectedOptions.length < maxSelections) {
                newSelection = [...selectedOptions, option];
            } else {
                newSelection = selectedOptions;
            }
        }

        // Atualizar o estado e acionar callback
        setSelectedOptions(newSelection);
        onSelectionChange && onSelectionChange(newSelection);
    };

    const handlePickerChange = (item) => {
        setSelectItem(item)

        if (!options.includes(item)) {
            // Adicionar ao options se não existir
            const updatedOptions = [...options, item];
            setOptions(updatedOptions);
            setSelectedOptions(updatedOptions);
        }
    }

    return (
        <View style={styles.fieldContainer}>

            {/* label and suport text */}
            <Text style={styles.formTitle}>{label}</Text>
            {suportText && <Text style={styles.suportText}>{suportText}</Text>}

            {/* select input */}
            {selectInputItems &&
                <View style={styles.selectInputContainer}>
                    <Picker
                        selectedValue='Select an option'
                        onValueChange={handlePickerChange}
                        style={styles.selectInput}
                    >
                        <Picker.Item label="Select an option" value={null} />
                        {selectInputItems.map((options, index) => {
                            return (
                                <Picker.Item key={index} style={styles.selectInputText} label={options} value={options} />
                            )
                        })}
                    </Picker>
                </View>
            }

            {/* options */}
            <View style={styles.optionsContainer}>
                {options && options.map((option) => {
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
    selectInputContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 0,
        marginBottom: 15,
    },
    selectInput: {
        backgroundColor: '#f7f7f7',
        width: '100%',
        borderRadius: 8,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: 0,
    },
    selectInputText: {
        fontSize: 14,
    }
});
