import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Trip from '@/assets/images/illustrations/waiting3.svg';
import ButtonWithIcon from '@/components/buttons/ButtonWithIcon';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import AntDesign from '@expo/vector-icons/AntDesign';

function WelcomeScreen() {

    const { t, i18n } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Trip width={350} height={350} />
                <Text style={styles.greetings}>{t('Welcome to HostelApp!')}</Text>
                <Text style={styles.title}>{t('Seu passaporte para transformar a maneira de viajar')}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonWithIcon
                    text={t("Começar como Hóspede")}
                    width="100%"
                    icon={<AntDesign name="arrowright" size={24} color={Colors.purple} />}
                    borderColor={Colors.white}
                    backgroundColor={Colors.purple}
                    textColor={Colors.white}
                />
                <ButtonWithIcon
                    backgroundColor={Colors.white}
                    text={t("Começar como Host")}
                    width="100%"
                    icon={<AntDesign name="arrowright" size={24} color={Colors.white} />}
                    borderColor={Colors.purple}
                    textColor={Colors.purple}
                />
            </View>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.purple,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        paddingBottom: 20,
        gap: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        fontFamily: 'PoppinsBold',
        color: Colors.white,
        marginTop: 5,
        // textAlign: 'center'
    },
    greetings: {
        color: Colors.white,
        fontSize: 18,
        width: '100%',
        fontFamily: 'PoppinsRegular',
        marginTop: 30,
    }
});
