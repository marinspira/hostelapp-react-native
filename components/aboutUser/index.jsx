
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function AboutUser() {

    const [dataUser, setDataUser] = useState({
        name: '',
        age: null,
        description: '',
        country: '',
        languages: [''],
        socialMedia: {
            instagram: '',
            linkedin: '',
            twitter: ''
        },
        digitalNomad: null,
        smoker: null,
        pets: null
    })

    return (
        <View>
            <Text>About</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    // onChangeText={}
                    // value={}
                    placeholder="useless placeholder"
                    keyboardType="numeric"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        width: '100%'
    },
    input: {
        backgroundColor: '#ccc',
        width: '100%'
    }
})