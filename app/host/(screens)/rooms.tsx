import Container from "@/components/container";
import GoBackButton from "@/components/goBackButton";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonCreate from '@/components/buttons/ButtonCreate'

export default function RoomsScreen() {

    const dynamicStyles = useTheme()

    const [rooms, setRooms] = useState({
        number: '',
        beds: [{
            bed_number: '',
            assigned_by: ''
        }]
    })

    return (
        <Container>
            <View>
                <GoBackButton />
                <Text>Rooms</Text>
            </View>
            <ButtonCreate/>
            <View>
                <Text>Create a new room</Text>
            </View>
        </Container>
    )
}