import Container from "@/components/container";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useState } from 'react'
import EmptyState from "@/components/emptyState"
import EmptyScreenImage from "@/assets/images/illustrations/undraw/undraw_dog_jfxm.svg"
import ButtonCreate from "@/components/buttons/ButtonCreate";
import { router } from "expo-router";

export default function Volunteers() {
    const dynamicStyles = useTheme()
    const [positions, setPositions] = useState([
        {
            img: '',
            title: 'Reception in Zagreb',
            description: "",
            requirements: ["Passaporte europeu", "Maior de 18"],
            current_opportunities: [
                {
                    assigned_staff: "Maria",
                    status: "closed",
                    shift: {
                        start_time: "08:00",
                        end_time: "12:00",
                        days_per_week: "5"
                    }
                }
            ]
        }
    ])
    const { height } = useWindowDimensions()


    return (
        <Container scrollable={false}>
            <View style={{ height }}>
                <Text style={styles.title}>Positions</Text>
                {positions.length > 1 ? (
                    <Text>Aqui</Text>
                ) : (
                    <EmptyState
                        img={<EmptyScreenImage width={300} />}
                        title="Sem posiçoes criadas"
                        text="Clique no botão flutuante para criar"
                    />
                )}
            </View>
            <ButtonCreate bottom={70} onPress={() => router.push("/host/(screens)/createPosition")} />
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 25,
        marginTop: -15,
        textTransform: 'lowercase',
        fontFamily: 'PoppinsBold'
    }
})