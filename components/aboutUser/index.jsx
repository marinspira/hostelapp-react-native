import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Input from '../input';
import SimpleButton from '../button';
import SelectItens from '@/components/selectItens'

export default function AboutUser() {
    const [dataUser, setDataUser] = useState({
        name: '',
        age: null,
        country: '',
        passaportPhoto: '',
        interests: [''],
        description: '',
        languages: [''],
        digitalNomad: null,
        smoker: null,
        pets: null,
        socialMedia: {
            instagram: '',
            linkedin: '',
            twitter: '',
        },
    });

    const options = ['💻 IT', ' 📖 Books', '🌊 Surf', '📸 Photograph', '👗 Fashion', '🎥 Movie', '⚽ Futebol', '🧘🏽 Yoga', '🎮 Games', '🥗 Veg Food', '👟 Hikings']

    return (
        <View style={styles.container}>
            <ScrollView style={styles.form}>
                <Input label="Your name" placeholder='Your name here' />
                <Input label="Your birthday" placeholder='' />
                <Input label="Where are you from?" />
                <Input label="Passaport photo" />
                <SelectItens label='Interests' suportText='Select up to 5 options' maxSelections={5} options={options} />
                <Input label="Description" placeholder='Describe yourself' />
                <Input label="Which languages do you speak?" />
                <SelectItens label='Are you a digital nomad?' suportText='Do you work online while travel?' options={['💻 yes', '✖️ no']} />
                <SelectItens label='Do you smoke?' options={['🚬 yes', '✖️ no']} />
                <SelectItens label='Are you travelling with your pet?' options={['🦤 yes', '✖️ no']} />
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
