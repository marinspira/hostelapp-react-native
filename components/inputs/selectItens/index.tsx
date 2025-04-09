import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import '@/assets/translations/i18n'
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';

interface SelectItensProps {
    label: string;
    onChange: (selectedOptions: string[]) => void;
    options?: any;
    suportText?: string;
    maxSelections?: number;
    selectInputItems?: string[];
    value: string[] | boolean | null,
    boolean?: boolean
}

const SelectItens: React.FC<SelectItensProps> = ({
    label,
    options: initialOptions = [],
    suportText,
    onChange,
    maxSelections = 1,
    selectInputItems,
    value,
    boolean = false
}) => {

    const { t, i18n } = useTranslation();
    const dynamicStyles = useTheme()

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>(initialOptions);
    const [selectedItem, setSelectedItem] = useState<any>(value);

    const toggleOption = (option: any) => {

        if (maxSelections === 1) {
            setSelectedItem(option)
            onChange && onChange(option);
        } else {
            const isSelected = selectedOptions.includes(option);
            let newSelection: string[];

            if (isSelected) {
                newSelection = selectedOptions.filter((item) => item !== option);
                if (selectInputItems) {
                    setOptions(newSelection);
                }
            } else {
                if (selectedOptions.length < maxSelections) {
                    newSelection = [...selectedOptions, option];
                } else {
                    newSelection = selectedOptions;
                }
            }

            setSelectedOptions(newSelection);
            onChange && onChange(newSelection);
        }

    };

    const handleSelectInput = (item: string) => {
        setSelectedItem(item);

        if ((!options.includes(item) && (options.length <= maxSelections))) {
            // Adicionar ao options se não existir
            const updatedOptions = [...options, item];
            setOptions(updatedOptions);
            setSelectedOptions(updatedOptions);
            onChange && onChange(updatedOptions);
        }
    };

    return (
        <View style={styles.fieldContainer}>
            {/* label and support text */}
            <Text style={dynamicStyles.label}>{label}</Text>
            {suportText && <Text style={styles.suportText}>{suportText}</Text>}

            {/* select input */}
            {selectInputItems && (
                <View style={styles.selectInputContainer}>
                    <Picker
                        selectedValue={selectedItem}
                        onValueChange={handleSelectInput}
                        style={styles.selectInput}
                    >
                        <Picker.Item label={t('Selecione uma opção')} value={null} />
                        {selectInputItems.map((option, index) => {
                            return (
                                <Picker.Item key={index} style={styles.selectInputText} label={option} value={option} />
                            );
                        })}
                    </Picker>
                </View>
            )}

            {/* options */}
            <View style={styles.optionsContainer}>
                {boolean ? (
                    <>
                        <Pressable
                            style={[
                                styles.button,
                                selectedItem === true && styles.selectedButton,
                            ]}
                            onPress={() => toggleOption(true)}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedItem === true && styles.selectedButtonText,
                                ]}
                            >
                                {t('Sim')} {selectedItem === true && '×'}
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.button,
                                selectedItem === false && styles.selectedButton,
                            ]}
                            onPress={() => toggleOption(false)}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedItem === false && styles.selectedButtonText,
                                ]}
                            >
                                {t('Não')} {selectedItem === false && '×'}
                            </Text>
                        </Pressable>
                    </>
                ) : (
                    options?.map((option) => {
                        const isSelected = selectedOptions.includes(option);
                        return (
                            <Pressable
                                key={option}
                                style={[styles.button, isSelected && styles.selectedButton]}
                                onPress={() => toggleOption(option)}
                            >
                                <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
                                    {option} {isSelected && '×'}
                                </Text>
                            </Pressable>
                        );
                    })
                )}
            </View>

        </View>
    );
};

export default SelectItens;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginVertical: 5,
        marginRight: 10,
        borderColor: '#a1a1a1',
        backgroundColor: 'white',
    },
    selectedButton: {
        backgroundColor: Colors.light.tint,
        borderColor: ''
    },
    buttonText: {
        fontSize: 14,
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
        width: '100%'
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
        display: 'flex',
        alignItems: 'center',
    },
    selectInputText: {
        fontSize: 14,
    },
});