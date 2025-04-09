import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateGuestField } from '@/redux/slices/guest/slice';
import { useTranslation } from 'react-i18next';
import Input from '@/components/inputs/input';
import InputImage from '@/components/inputs/inputImage';
import SelectItens from '@/components/inputs/selectItens'
import '@/assets/translations/i18n'
import countries from '@/utils/coutries'
import { useTheme } from '@/hooks/useTheme';
import { RootState } from '@/redux/store';

export default function FormPersonal() {
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
                <Input
                    label={t('Descrição')}
                    placeholder={t('Deixe seus colegas de quarto conhecerem você!')}
                    value={guest.description}
                    onChange={(value) => handleChange('description', value)}
                />
                <View style={styles.profile}>
                    <Text style={dynamicStyles.label}>{t('Mostre um pouco de você e suas aventuras')}</Text>
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
                {/* <SelectItens
                    label={t('Quais idiomas você fala?')}
                    selectInputItems={['Portuguese', 'English', '']}
                    onChange={(value) => handleChange('languages', value)}
                    value={guest.languages}
                    maxSelections={5}
                /> */}
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
            </View>
        </View >
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
        maxWidth: '100%',
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
