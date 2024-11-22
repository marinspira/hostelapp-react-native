import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function InputSelect({ selectInputItems, label }) {
    const [selectItem, setSelectItem] = useState()

    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.formTitle}>{label}</Text>
            <View style={styles.selectInputContainer}>
                <Picker
                    selectedValue={selectItem}
                    onValueChange={(itemValue) =>
                        setSelectItem(itemValue)
                    }
                    style={styles.selectInput}
                >
                    {selectInputItems &&
                        selectInputItems.map((itens, index) => {
                            return (
                                <Picker.Item key={index} style={styles.selectInputText} label={itens} value={itens} />
                            )
                        })}
                </Picker>
            </View>
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
})