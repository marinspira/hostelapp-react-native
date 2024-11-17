import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Input from '../input';
import SimpleButton from '../button';

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
            twitter: '',
        },
        digitalNomad: null,
        smoker: null,
        pets: null,
        interests: [''],
    });

    const formFields = [
        {
            key: 'name',
            label: 'Your name',
            placeholder: 'Your name here',
        },
        {
            key: 'description',
            label: 'Description',
            placeholder: 'Describe yourself',
        },
        {
            key: 'instagram',
            label: 'Instagram',
            placeholder: '@HostelApp',
        },
        {
            key: 'linkedin',
            label: 'LinkedIn',
            placeholder: '/in/HostelApp',
        },
        {
            key: 'twitter',
            label: 'Twitter',
            placeholder: '@HostelApp',
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView style={styles.form}>
                <Input label="Interests" />
                {/* fazer um select de interesses */}
                {formFields.map((field) => (
                    <Input
                        key={field.key}
                        placeholder={field.placeholder}
                        label={field.label}
                    />
                ))}
            </ScrollView>
            <Pressable style={styles.loggoutButton}>
                <Text style={styles.loggoutText}>Logout</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 70,
    },
    form: {
        width: '100%',
        marginTop: 40
    },
    loggoutButton: {
        borderColor: 'red',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        backgroundColor: 'white',
        alignSelf: 'center', 
        marginTop: 30
    },
    loggoutText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 2,
    },
});
