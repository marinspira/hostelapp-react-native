import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { localhostAuth } from "@/src/redux/slices/user";

export default function LocalhostLogin({ role }) {

    const owner = {
        name: "aushausha Owner",
        email: "aushausha@hostelapp.com",
        googleId: null,
        appleId: "239485894",
        role: "owner",
    }

    const guest = {
        name: "Maria Guest",
        email: "maria.guest@hostelapp.com",
        googleId: null,
        appleId: "9876543210",
        role: "guest",
    }

    const dispatch = useDispatch()

    async function onSubmit() {
        const credentials = role === 'guest' ? guest : owner
        dispatch(localhostAuth({ credentials, role })).unwrap();
    }

    return (
        <TouchableOpacity style={styles.btn} onPress={onSubmit}>
            <Text style={styles.text}>I just want to check it out</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#000',
        elevation: 2,
        shadowOffset: 10,
        paddingHorizontal: 20,
        width: '80%',
        maxWidth: 280,
        paddingVertical: 15,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})