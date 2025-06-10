import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Trip from '@/assets/images/illustrations/vacations.svg';
import ButtonWithIcon from '@/src/components/buttons/ButtonWithIcon';
import { Colors } from '@/src/constants/Colors';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import backgroundImage from "@/assets/images/background.jpg"

function WelcomeScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();

    return (
        <ImageBackground
            source={backgroundImage} 
            style={styles.container}
            resizeMode="cover"
        >
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.content}>
                <Trip width={350} height={280} />
                <Text style={styles.greetings}>{t('Welcome to HostelApp!')}</Text>
                <Text style={styles.title}>{t('Seu passaporte para transformar a maneira de viajar')}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonWithIcon
                    text={t("Começar como Hóspede")}
                    width="100%"
                    // icon={<AntDesign name="arrowright" size={24} color={Colors.light.tint} />}
                    borderColor='#fff'
                    backgroundColor={Colors.light.tint}
                    textColor='#fff'
                    onPress={() => {
                        router.push('/public/introduction?role=guest');
                    }}
                />
                <ButtonWithIcon
                    backgroundColor='#fff'
                    text={t("Começar como Host")}
                    width="100%"
                    // icon={<AntDesign name="arrowright" size={24} color='#fff' />}
                    borderColor={Colors.light.tint}
                    textColor={Colors.light.tint}
                    onPress={() => {
                        router.push('/public/introduction?role=host');
                    }}
                />
            </View>
        </View>
        </ImageBackground>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        paddingBottom: 20,
        gap: 20,
        display: "flex",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        fontFamily: 'PoppinsBold',
        color: 'black',
        marginTop: 15,
        width: '100%',
        textAlign: "center"
    },
    greetings: {
        color: Colors.light.tint,
        fontSize: 18,
        width: '100%',
        fontFamily: 'PoppinsBold',
        marginTop: 30,
        textAlign: "center"
    }
});
