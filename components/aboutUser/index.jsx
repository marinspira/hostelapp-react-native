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

    return (
        <View style={styles.container}>
            <ScrollView style={styles.form}>
                <Input label="Your name" placeholder='Your name here' />
                <Input label="Your age" placeholder='' />
                <Input label="Description" placeholder='Describe yourself' />
                <Input label="Interests" />
                <Input label="Where are you from?" />
                <Input label="Which languages do you speak?" />
                <Input label="Are you a digital nomad?" />
                <Input label="Do you smoke?" />
                <Input label="Are you travelling with your pet?" />
                <Input label="Instagram" placeholder='@HostelApp' />
                <Input label="LinkedIn" placeholder='/in/HostelApp' />
                <Input label="Twitter" placeholder='@HostelApp' />
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
        marginTop: 20
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
