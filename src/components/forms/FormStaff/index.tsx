import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import InputSelect from '../InputsV1/inputSelect';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'

import { StaffState } from '@/src/interfaces/staff';
import { updateStaffFields } from '@/src/redux/slices/staff';
import { useTheme } from '@/src/hooks/useTheme';

import BlockedScreen from '@/src/components/ui/LockedFeature';
import Input from '@/src/components/forms/InputsV1/input';
import SelectItens from '@/src/components/forms/InputsV1/selectItens';

export default function FormStaff() {

    const { t, i18n } = useTranslation();

    const staff = useSelector((state: { staff: StaffState }) => state.staff)
    const dispatch = useDispatch()
    const dynamicStyles = useTheme()

    const formFields: { key: keyof StaffState; label: string; placeholder: string }[] = [
        { key: 'education', label: t('Educação'), placeholder: t('Exemplo: Graduado em Desenvolvimento de Software') },
        { key: 'workExperience', label: t('Experiências de trabalho'), placeholder: 'Digite sua experiência profissional' },
        { key: 'travelExperience', label: t('Experiências de viagem'), placeholder: 'Descreva suas experiências de viagem' },
        { key: 'anyRestriction', label: t('Você possui alguma restrição ou alergia?'), placeholder: t('Liste aqui quaisquer restrições') },
    ];

    function handleChange<T extends keyof StaffState>(key: T, value: StaffState[T]) {
        dispatch(updateStaffFields({ key, value }));
    }

    useEffect(() => {
        console.log(staff)
    }, [staff])

    return (
        <View style={[styles.container, dynamicStyles.container]}>
            <View style={styles.form}>
                <SelectItens
                    options={[
                        t('Recepção'),
                        t('Limpeza'),
                        t('Assistente de cozinha'),
                        t('Jardinagem'),
                        t('Babá'),
                        t('Ensino de esportes'),
                        t('Cuidados de animais'),
                        t('Ensino de idiomas'),
                        t('Construção'),
                        'Bartender',
                    ]}
                    label={t('Habilidades')}
                    suportText='Select up to 5 options'
                    maxSelections={5}
                    value={staff.skills}
                    onChange={(value) => handleChange('skills', value)}
                />
                <InputSelect
                    label={t('Para onde você gostaria que fosse a sua próxima viagem?')}
                    selectInputItems={['Brazil', 'USA', 'France', 'Italy']}
                    suportText={t('Nós vamos sugerir você para os anfitriões desse lugar :)')}
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
            </View>
            {!staff && (
                <BlockedScreen
                    btn={{
                        onPress: () => console.log('Redirect'),
                        text: t('Encontrar uma oportunidade'),
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
        borderRadius: 10,
    }
});
