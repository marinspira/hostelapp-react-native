import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface CheckboxProps {
    text: string;
    onChange: (isChecked: boolean) => void;
    initialChecked?: boolean;
}

const InputCheckbox: React.FC<CheckboxProps> = ({ text, onChange, initialChecked = false }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handlePress = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange(newValue);
    };

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <View style={styles.checkbox}>
                {isChecked && <MaterialIcons style={styles.check} name="check" size={20} color={Colors.purple} />}
            </View>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

export default InputCheckbox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        maxWidth: '100%',
        paddingRight: 20
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginRight: 10,
    },
    text: {
        fontSize: 14,
        color: '#333',
    },
    check: {
        position: 'absolute',
        paddingBottom: 3,
    }
});
