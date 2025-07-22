import { StyleSheet, Text, View } from 'react-native'
import Car from '@/assets/images/illustrations/undraw/car.svg'
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { useTheme } from '@/src/hooks/useTheme';

export default function Grettings({ username, supportText }: any) {

    const { t, i18n } = useTranslation();
    const dynamicStyles = useTheme();

    return (
        <View style={[styles.box, dynamicStyles.tint]}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{t('Olá', { name: username?.split(' ')[0] })}</Text>
                {supportText && <Text style={styles.text}>{supportText}</Text>}
            </View>
            <View style={styles.imgContainer}>
                <Car width={200} height={200} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 60,
        minHeight: 150,
        position: 'relative',
        justifyContent: "center"
    },
    greetings: {
        fontSize: 26,
        color: '#fff',
        fontWeight: '600'
    },
    imgContainer: {
        position: 'absolute',
        right: -25,
        bottom: -50
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'PoppinsBold'
    },
    textContainer: {
        width: "55%",
        gap: 5
    },
    text: {
        color: "white",
        fontSize: 14,
    }
})