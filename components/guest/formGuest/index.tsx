import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateGuestField } from '@/redux/slices/guest/slice';
import { useTranslation } from 'react-i18next';
import Input from '@/components/inputs/input';
import InputSelect from '@/components/inputs/inputSelect';
import InputImage from '@/components/inputs/inputImage';
import SelectItens from '@/components/guest/selectItens'
import { useEffect } from 'react';
import '@/assets/translations/i18n'
import { Guest } from '@/redux/slices/guest/interfaces';
import InputPhone from '@/components/inputs/inputPhone';
import countries from '@/utils/coutries'
import { useTheme } from '@/hooks/useThemeColor';
import { RootState } from '@/redux/store';

interface FormProps {
    checkin?: boolean
}

export default function FormGuest({ checkin }: FormProps) {
    const { t, i18n } = useTranslation();

    const guest = useSelector((state: RootState) => state.guest.data)

    const dispatch = useDispatch()
    const dynamicStyles = useTheme()

    function handleChange(key: any, value: any) {
        dispatch(updateGuestField({ key, value }))
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <InputSelect
                    label={t('De onde você é?')}
                    selectInputItems={countries}
                    value={guest.country}
                    onChange={(value) => handleChange('country', value)}
                />
                <InputPhone
                    label={t('Seu número de celular')}
                    onChange={(value) => handleChange('phoneNumber', value)}
                />
                <InputImage
                    label={t('Foto do seu Passaporte/Identidade')}
                    suportText={t('Apenas a administração do hotel pode ver essa informação')}
                    id='passaport'
                    endpoints={{
                        upload: '',
                        delete: ''
                    }}
                />
                <View style={styles.profile}>
                    <Text style={dynamicStyles.label}>{t('Adicione fotos para que outros hóspedes possam te conhecer')}</Text>
                    <View style={styles.photos}>
                        <InputImage
                            id='0'
                            imgWidth={100}
                            defaultImg={guest?.guestPhotos?.[0]}
                            endpoints={{
                                upload: '/api/guest/saveGuestProfileImages',
                                delete: '/api/guest/deleteGuestProfileImage'
                            }}
                        />
                        <InputImage
                            id='1'
                            imgWidth={100}
                            defaultImg={guest?.guestPhotos?.[1]}
                            endpoints={{
                                upload: '/api/guest/saveGuestProfileImages',
                                delete: '/api/guest/deleteGuestProfileImage'
                            }}
                        />
                        <InputImage
                            id='2'
                            imgWidth={100}
                            defaultImg={guest?.guestPhotos?.[2]}
                            endpoints={{
                                upload: '/api/guest/saveGuestProfileImages',
                                delete: '/api/guest/deleteGuestProfileImage'
                            }}
                        />
                        <InputImage
                            id='3'
                            imgWidth={100}
                            defaultImg={guest?.guestPhotos?.[3]}
                            endpoints={{
                                upload: '/api/guest/saveGuestProfileImages',
                                delete: '/api/guest/deleteGuestProfileImage'
                            }}
                        />
                        <InputImage
                            id='4'
                            imgWidth={100}
                            defaultImg={guest?.guestPhotos?.[4]}
                            endpoints={{
                                upload: '/api/guest/saveGuestProfileImages',
                                delete: '/api/guest/deleteGuestProfileImage'
                            }}
                        />
                        <InputImage
                            id='5'
                            imgWidth={100}
                            defaultImg={guest?.guestPhotos?.[5]}
                            endpoints={{
                                upload: '/api/guest/saveGuestProfileImages',
                                delete: '/api/guest/deleteGuestProfileImage'
                            }}
                        />
                    </View>
                </View>
                {!checkin && <Input
                    label={t('Descrição')}
                    placeholder={t('Deixe seus colegas de quarto conhecerem você!')}
                    value={guest.description}
                    onChange={(value) => handleChange('description', value)}
                />}
                {!checkin && <SelectItens
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
                />}
                {/* {!checkin && <SelectItens
                    label={t('Quais idiomas você fala?')}
                    selectInputItems={['Portuguese', 'English', '']}
                    onChange={(value) => handleChange('languages', value)}
                    value={guest.languages}
                    maxSelections={5}
                />} */}
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
                {!checkin && (
                    <>
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
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
    photos: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    profile: {
        marginVertical: 15
    }
});
