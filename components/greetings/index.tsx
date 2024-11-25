import { Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { UserState } from '@/redux/slices/user/userSlice'
import { Colors } from '@/constants/Colors'
import Car from '@/assets/images/illustrations/car.svg'
import Title from '@/components/title'

export default function Grettings({ }) {

    const user = useSelector((state: { user: UserState }) => state.user)

    return (
        <View style={styles.box}>
            <Title marginTop={0} text={`Hello, ${user.name} 👋🏼`} fontSize={25} color={Colors.white} />
            <View style={styles.imgContainer}>
                <Car width={200} height={200} />
            </View>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        padding: 20,
        backgroundColor: Colors.purple,
        borderRadius: 10,
        marginBottom: 60,
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