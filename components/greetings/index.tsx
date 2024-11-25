import { Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { UserState } from '@/redux/slices/user/userSlice'
import { Colors } from '@/constants/Colors'
import Car from '@/assets/images/illustrations/car.svg'

export default function Grettings({ }) {

    const user = useSelector((state: { user: UserState }) => state.user)

    return (
        <View style={styles.box}>
            <Text style={styles.greetings}>Hello, {user.name} 👋🏼</Text>
            <View style={styles.imgContainer}>
                <Car width={150} height={150} />
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
        marginBottom: 30,
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
        right: -20,
        bottom: -30
    }
})