import { StyleSheet, TextInput, View } from "react-native"
import Feather from '@expo/vector-icons/Feather';
import { forwardRef } from "react";

interface InputSearchProps {
    onChange?: (value: string) => void;
    onPress?: () => void;
    placeholder: string
}

const InputSearch = forwardRef<TextInput, InputSearchProps>(
    ({ onChange, onPress, placeholder, ...rest }, ref) => {
        return (
            <View style={styles.container}>
                <Feather name="search" size={20} color="#bbb" />
                <TextInput
                    ref={ref}
                    style={[styles.input]}
                    placeholder={placeholder}
                    keyboardType="default"
                    placeholderTextColor="#bbb"
                    onChangeText={onChange}
                    onPressIn={onPress}
                    showSoftInputOnFocus={!onPress}
                    {...rest}
                />
            </View>
        );
    }
);

export default InputSearch;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        paddingLeft: 20,
        height: 60,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    input: {
        fontSize: 18,
        flex: 1,
        paddingLeft: 10
    }
})