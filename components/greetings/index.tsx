import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import Car from '@/assets/images/illustrations/undraw/car.svg'
import Title from '@/components/guest/text/title'
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'

export default function Grettings({ username }: any) {

    const { t, i18n } = useTranslation();

    return (
        <View style={styles.box}>
            <Title
                marginTop={0}
                text={t('Olá', { name: username?.split(' ')[0] })}
                fontSize={25}
                color={Colors.white}
            />
            <View style={styles.imgContainer}>
                <Car width={200} height={200} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        padding: 20,
        backgroundColor: Colors.purple,
        borderRadius: 10,
        marginBottom: 20,
        minHeight: 150,
        position: 'relative'
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
    }
})