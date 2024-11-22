// Extern components
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '@/redux/slices/user/userSlice';

// Intern Components
import Input from '../input';
import InputSelect from '../inputSelect';
import InputDate from '../inputDate';
import SelectItens from '@/components/selectItens'

export default function FormUser() {
    const user = useSelector((state: { user: UserState }) => state.user)

    const dispatch = useDispatch()

    const options = ['💻 IT', ' 📖 Books', '🌊 Surf', '📸 Photograph', '👗 Fashion', '🎥 Movie', '⚽ Futebol', '🧘🏽 Yoga', '🎮 Games', '🥗 Veg Food', '👟 Hikings']

    function handleChange() {

    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.form}>
                <Input
                    label="Your name"
                    placeholder='Your name here'
                    value=''
                    onChange={handleChange}
                />
                <InputDate/>
                <InputSelect
                    label="Where are you from?"
                    selectInputItems={['Brazil', 'USA', 'France', 'Italy']}
                />
                <Input
                    label="Passaport photo"
                    placeholder='Passaport photo'
                    value=''
                    onChange={handleChange}
                />
                <SelectItens
                    label='Interests'
                    suportText='Select up to 5 options'
                    maxSelections={5}
                    options={options}
                    onChange={handleChange}

                />
                <Input
                    label="Description"
                    placeholder='Let your rommates get know you!'
                    value=''
                    onChange={handleChange}
                />
                <SelectItens
                    label='Which languages do you speak?'
                    selectInputItems={['Portuguese', 'English', '']}
                    onChange={handleChange}

                />
                <SelectItens
                    label='Are you a digital nomad?'
                    suportText='Do you work online while travel?'
                    options={['💻 yes', '✖️ no']}
                    onChange={handleChange}

                />
                <SelectItens
                    label='Do you smoke?'
                    options={['🚬 yes', '✖️ no']}
                    onChange={handleChange}

                />
                <SelectItens
                    label='Are you travelling with your pet?'
                    options={['🦤 yes', '✖️ no']}
                    onChange={handleChange}

                />
                <Input
                    label="Instagram"
                    placeholder='@HostelApp'
                    value=''
                    onChange={handleChange}
                />
                <Input
                    label="LinkedIn"
                    placeholder='/in/HostelApp'
                    value=''
                    onChange={handleChange}
                />
                <Input
                    label="Twitter"
                    placeholder='@HostelApp'
                    value=''
                    onChange={handleChange}
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
