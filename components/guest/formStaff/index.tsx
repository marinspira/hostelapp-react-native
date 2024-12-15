import { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import BlockedScreen from '@/components/guest/blockedScreen';
import Input from '@/components/guest/input';
import SelectItens from '../selectItens';
import { useDispatch, useSelector } from 'react-redux';
import { StaffState, updateStaffFields } from '@/redux/slices/staff/staffSlice'
import InputSelect from '../inputSelect';

export default function FormStaff() {

    const staff = useSelector((state: { staff: StaffState }) => state.staff)
    const dispatch = useDispatch()

    const formFields: { key: keyof StaffState; label: string; placeholder: string }[] = [
        { key: 'education', label: 'Education', placeholder: 'Exemplo: Graduado em desenvolvimento de software' },
        { key: 'workExperience', label: 'Work Experience', placeholder: 'Digite sua experiência profissional' },
        { key: 'travelExperience', label: 'Travel Experience', placeholder: 'Descreva suas experiências de viagem' },
        { key: 'anyRestriction', label: 'Any Restriction', placeholder: 'Liste quaisquer restrições' },
    ];

    function handleChange<T extends keyof StaffState>(key: T, value: StaffState[T]) {
        dispatch(updateStaffFields({ key, value }));
    }

    useEffect(() => {
        console.log(staff)
    }, [staff])

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
                    suportText='Select up to 5 options'
                    maxSelections={5}
                    value={staff.skills}
                    onChange={(value) => handleChange('skills', value)}
                />
                <InputSelect
                    label="When are you planning your next trip?"
                    selectInputItems={['Brazil', 'USA', 'France', 'Italy']}
                    suportText='We will suggest you to hosts in this place :)'
                    value={staff.nextDesiredTrip}
                    onChange={(value) => handleChange('nextDesiredTrip', value)}
                />
                {formFields.map((field) => (
                    <Input
                        key={field.key}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={staff[field.key]}
                        onChange={(value) => handleChange(field.key, value)}
                    />
                ))}
            </ScrollView>
            {!staff && (
                <BlockedScreen
                    btn={{
                        onPress: () => console.log('Redirecionando para voluntariado...'),
                        text: 'Find a work exchange',
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
    formContent: {

    }
});
