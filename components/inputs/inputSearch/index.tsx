import { StyleSheet, TextInput, View } from "react-native"
import Feather from '@expo/vector-icons/Feather';

interface InputSearchProps {
    onChange?: (value: string) => void;
    onPress?: () => void;
    placeholder: string
}

export default function InputSearch({ onChange, onPress, placeholder }: InputSearchProps) {
    return (
        <View style={[styles.container]}>
            <Feather name="search" size={24} color="black" />
            <TextInput
                style={[styles.input]}
                placeholder={placeholder}
                keyboardType="default"
                placeholderTextColor="#bbb"
                onChangeText={onChange}
                onPress={onPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        paddingLeft: 20,
        height: 60,
        borderRadius: 100,
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