// Extern components
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, UserState } from '@/redux/slices/user/userSlice';

// Intern Components
import Input from '../input';
import InputSelect from '../inputSelect';
import InputDate from '../inputDate';
import InputImage from '../inputImage';
import SelectItens from '@/components/selectItens'
import { useEffect } from 'react';

export default function FormUser() {
    const user = useSelector((state: { user: UserState }) => state.user)

    const dispatch = useDispatch()

    function handleChange(key: any, value: any) {
        dispatch(updateField({ key, value }))
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.form}>
                <Input
                    label="Your name"
                    placeholder='Your name here'
                    value={user.name}
                    onChange={(value) => handleChange('name', value)}
                />
                <InputDate
                    onChange={(value) => handleChange('birthday', value)}
                />
                <InputSelect
                    label="Where are you from?"
                    selectInputItems={['Brazil', 'USA', 'France', 'Italy']}
                    value={user.country}
                    onChange={(value) => handleChange('country', value)}
                />
                <InputImage
                    maxSelections={1}
                    label='Passaport/ID photo'
                    suportText='Only the hostel administration has access to this information.'
                    onChange={(value) => handleChange('passaportPhoto', value)}
                />
                <Input
                    label="Description"
                    placeholder='Let your rommates get know you!'
                    value={user.description}
                    onChange={(value) => handleChange('description', value)}
                />
                <SelectItens
                    label='Interests'
                    suportText='Select up to 5 options'
                    maxSelections={5}
                    options={['💻 IT', ' 📖 Books', '🌊 Surf', '📸 Photograph', '👗 Fashion', '🎥 Movie', '⚽ Futebol', '🧘🏽 Yoga', '🎮 Games', '🥗 Veg Food', '👟 Hikings']}
                    onChange={(value) => handleChange('interests', value)}
                    value={user.interests}
                />
                <SelectItens
                    label='Which languages do you speak?'
                    selectInputItems={['Portuguese', 'English', '']}
                    onChange={(value) => handleChange('languages', value)}
                    value={user.languages}
                    maxSelections={5}
                />
                <SelectItens
                    label='Are you a digital nomad?'
                    suportText='Do you work online while travel?'
                    options={['💻 yes', '✖️ no']}
                    onChange={(value) => handleChange('digitalNomad', value)}
                    value={user.digitalNomad}
                    boolean={true}
                />
                <SelectItens
                    label='Do you smoke?'
                    options={['🚬 yes', '✖️ no']}
                    onChange={(value) => handleChange('smoker', value)}
                    value={user.smoker}
                    boolean={true}
                />
                <SelectItens
                    label='Are you travelling with your pet?'
                    options={['🦤 yes', '✖️ no']}
                    onChange={(value) => handleChange('pets', value)}
                    value={user.pets}
                    boolean={true}
                />
                <Input
                    label="Instagram"
                    placeholder='@HostelApp'
                    value={user.instagram}
                    onChange={(value) => handleChange('instagram', value)}
                />
                <Input
                    label="LinkedIn"
                    placeholder='/in/HostelApp'
                    value={user.linkedin}
                    onChange={(value) => handleChange('linkedin', value)}
                />
                <Input
                    label="Twitter"
                    placeholder='@HostelApp'
                    value={user.twitter}
                    onChange={(value) => handleChange('twitter', value)}
                />
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
