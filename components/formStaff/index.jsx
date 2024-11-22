import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import BlockedScreen from '@/components/blockedScreen';
import Input from '@/components/input';
import SelectItens from '../selectItens';

export default function AboutStaff() {
    const [staff, setStaff] = useState(false);

    const [dataStaff, setDataStaff] = useState({
        skills: [],
        education: '',
        workExperience: '',
        travelExperince: '',
        interests: [],
        anyRestriction: '',
    });

    const formFields = [
        { key: 'education', label: 'Education', placeholder: 'Exemplo: Graduado em desenvolvimento de software' },
        { key: 'workExperience', label: 'Work Experience', placeholder: 'Digite sua experiência profissional' },
        { key: 'travelExperince', label: 'Travel Experience', placeholder: 'Descreva suas experiências de viagem' },
        { key: 'anyRestriction', label: 'Any Restriction', placeholder: 'Liste quaisquer restrições' },
    ];

    const handleInputChange = (key, value) => {
        setDataStaff((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    useEffect(() => {
        console.log(dataStaff.skills)
        console.log('teste')
    }, [dataStaff])

    const handleSkillsChange = (selectedSkills) => {
        setDataStaff((prevState) => ({
            ...prevState,
            skills: selectedSkills,
        }));
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.form} contentContainerStyle={styles.formContent}>
                <SelectItens
                    options={[
                        'Reception',
                        'Bartender',
                        'Housekeeping',
                        'Kitchen Assistant',
                        'Gardener',
                        'Baby-sitter',
                        'Sports Teaching',
                        'Animal Care',
                        'Language Teaching',
                        'Building',
                    ]}
                    label="Skills"
                    onSelectionChange={handleSkillsChange}
                />

                <Input label="When are you planning your next trip?" />

                <Input label="Where is your dream place?" />

                {formFields.map((field) => (
                    <Input
                        key={field.key}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={dataStaff[field.key]}
                        onChangeText={(text) => handleInputChange(field.key, text)}
                    />
                ))}
            </ScrollView>

            {!staff && (
                <BlockedScreen
                    btn={{
                        onPress: () => console.log('Redirecionando para voluntariado...'),
                        text: 'Find volunteering',
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        paddingBottom: 50,
    },
    form: {
        width: '100%',
        marginVertical: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
});
