import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateGuest, updateGuestField } from '@/src/redux/slices/guest';
import { useTranslation } from 'react-i18next';
import InputSelect from '@/src/components/inputs/inputSelect';
import InputImage from '@/src/components/inputs/inputImage';
import SelectItens from '@/src/components/inputs/selectItens'
import '@/assets/translations/i18n'
import InputPhone from '@/src/components/inputs/inputPhone';
import countries from '@/src/utils/coutries'
import { AppDispatch, RootState } from '@/src/redux/store';

export default function FormGuest() {
    const { t, i18n } = useTranslation();

    const guest = useSelector((state: RootState) => state.guest.data)
    const dispatch = useDispatch<AppDispatch>()


    function handleChange(key: any, value: any) {
        dispatch(updateGuestField({ key, value }));

        let timeoutId: NodeJS.Timeout | null = null;

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            dispatch(updateGuest());
            timeoutId = null;
        }, 20000);
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
                    value={guest.phoneNumber}
                />
                {/* TODO: Add passaport upload function */}
                {/* <InputImage
                    label={t('Foto do seu Passaporte/Identidade')}
                    suportText={t('Apenas a administração do hotel pode ver essa informação')}
                    id='passaport'
                    onUpload=""
                /> */}
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
