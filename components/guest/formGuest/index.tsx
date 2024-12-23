import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '@/redux/slices/guest/slice';
import { useTranslation } from 'react-i18next';
import Input from '../input';
import InputSelect from '../inputSelect';
import InputDate from '../inputDate';
import InputImage from '../inputImage';
import SelectItens from '@/components/guest/selectItens'
import { useEffect } from 'react';
import '@/assets/translations/i18n'
import { GuestState } from '@/redux/slices/guest/interfaces';

export default function FormGuest() {
    const { t, i18n } = useTranslation();

    const guest = useSelector((state: { guest: GuestState }) => state.guest)

    const dispatch = useDispatch()

    function handleChange(key: any, value: any) {
        dispatch(updateField({ key, value }))
    }

    useEffect(() => {
        console.log(guest)
    }, [guest])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.form}>
                {/* <Input
                    label={t('Seu nome')}
                    placeholder={t('Seu nome')}
                    value={guest.name}
                    onChange={(value) => handleChange('name', value)}
                /> */}
                {/* <InputDate
                    label={t('Seu aniversário')}
                    onChange={(value) => handleChange('birthday', value)}
                /> */}
                <InputSelect
                    label={t('De onde você é?')}
                    selectInputItems={['Brazil', 'USA', 'France', 'Italy']}
                    value={guest.country}
                    onChange={(value) => handleChange('country', value)}
                />
                <InputImage
                    maxSelections={1}
                    label={t('Foto do seu Passaporte/Identidade')}
                    suportText={t('Apenas a administração do hotel pode ver essa informação')}
                    onChange={(value) => handleChange('passaportPhoto', value)}
                />
                <Input
                    label={t('Descrição')}
                    placeholder={t('Deixe seus colegas de quarto conhecerem você!')}
                    value={guest.description}
                    onChange={(value) => handleChange('description', value)}
                />
                <SelectItens
                    label={t('Interesses')}
                    suportText={t('select_options', { number: 5 })}
                    maxSelections={5}
                    options={[
                        t('TI'),
                        t('Livros'),
                        '🌊 Surf',
                        t('Fotografia'),
                        t('Moda'),
                        t('Filmes'),
                        t('Futebol'),
                        t('Jogos'),
                        t('Veganismo'),
                        t('Trilhas'),
                        '🧘🏽 Yoga',
                    ]}
                    onChange={(value) => handleChange('interests', value)}
                    value={guest.interests}
                />
                <SelectItens
                    label={t('Quais idiomas você fala?')}
                    selectInputItems={['Portuguese', 'English', '']}
                    onChange={(value) => handleChange('languages', value)}
                    value={guest.languages}
                    maxSelections={5}
                />
                <SelectItens
                    label={t('Você é nômade digital?')}
                    suportText={t('Você trabalha online enquanto viaja?')}
                    onChange={(value) => handleChange('digitalNomad', value)}
                    value={guest.digitalNomad}
                    boolean={true}
                />
                <SelectItens
                    label={t('Você fuma?')}
                    onChange={(value) => handleChange('smoker', value)}
                    value={guest.smoker}
                    boolean={true}
                />
                <SelectItens
                    label={t('Você está viajando com o seu animal de estimação?')}
                    onChange={(value) => handleChange('pets', value)}
                    value={guest.pets}
                    boolean={true}
                />
                <Input
                    label="Instagram"
                    placeholder='@HostelApp'
                    value={guest.instagram}
                    onChange={(value) => handleChange('instagram', value)}
                />
                <Input
                    label="LinkedIn"
                    placeholder='/in/HostelApp'
                    value={guest.linkedin}
                    onChange={(value) => handleChange('linkedin', value)}
                />
                <Input
                    label="Twitter"
                    placeholder='@HostelApp'
                    value={guest.twitter}
                    onChange={(value) => handleChange('twitter', value)}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
