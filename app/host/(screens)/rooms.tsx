import Container from "@/components/container";
import GoBackButton from "@/components/goBackButton";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ButtonCreate from '@/components/buttons/ButtonCreate'
import defaultImg from '@/assets/images/unnamed.png';
import ProfilesGroup from "@/components/guest/profilesGroup";
import { Colors } from "@/constants/Colors";
import EmptyScreenImage from "@/assets/images/illustrations/undraw/undraw_dog_jfxm.svg"
import PopUp from "@/components/modal";
import CreateRoomModal from "@/components/modaisContent/createRoom"
import { useTranslation } from "react-i18next";
import ButtonOptions from "@/components/buttons/ButtonOptions"

export default function RoomsScreen() {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const dynamicStyles = useTheme()
    const { t } = useTranslation()

    const [rooms, setRooms] = useState([
        {
            type: "shared",
            number: "103",
            beds: [{
                bed_number: 'a',
                assigned_by: 'Maria'
            }]
        },
        {
            type: "shared",
            number: "105",
            beds: [{
                bed_number: 'a',
                assigned_by: 'Maria'
            }]
        },
        {
            type: "shared",
            number: "108",
            beds: [{
                bed_number: 'a',
                assigned_by: 'Fernanda'
            }]
        },
    ])
    const { width, height } = Dimensions.get('window');

    const [optionsVisible, setOptionsVisible] = useState(false)

    return (
        <Container scrollable={false}>
            <View style={{ minHeight: height }}>
                <View style={styles.header}>
                    <GoBackButton />
                    <Text style={dynamicStyles.textUppercase}>Rooms</Text>
                </View>
                {rooms ? (
                    <View>
                        <View style={styles.tags}>
                            <Text style={[dynamicStyles.text, styles.tag]}>Shared</Text>
                            <Text style={[dynamicStyles.text, styles.tag]}>Staff</Text>
                            <Text style={[dynamicStyles.text, styles.tag]}>Private</Text>
                        </View>
                        <View style={styles.roomContainer}>
                            <Text style={dynamicStyles.subtitle}>Room 103</Text>
                            <ButtonOptions
                                optionsVisible={optionsVisible}
                                setOptionsVisible={setOptionsVisible}
                            />
                            <View style={styles.occupation}>
                                <ProfilesGroup
                                    people={[
                                        { avatar: defaultImg },
                                        { avatar: defaultImg },
                                        { avatar: defaultImg },
                                        { avatar: defaultImg },
                                        { avatar: defaultImg },
                                        { avatar: defaultImg },
                                        { avatar: defaultImg },
                                        { avatar: defaultImg },
                                        { avatar: defaultImg },
                                        { avatar: defaultImg },
                                        { avatar: defaultImg },
                                    ]}
                                    maxVisible={10}
                                />
                                <Text style={dynamicStyles.text}>4/6</Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.emptyScreen}>
                        <EmptyScreenImage width={300} />
                        <Text style={dynamicStyles.title}>Nem quarto encontrado</Text>
                        <Text style={dynamicStyles.text}>Clique no botão flutuante para criar</Text>
                    </View>
                )}
                <ButtonCreate onPress={() => setIsModalVisible(true)} />
                {isModalVisible === true &&
                    <PopUp setModalVisible={setIsModalVisible} modalVisible={isModalVisible}>
                        <CreateRoomModal setModalVisible={setIsModalVisible}/>
                    </PopUp>
                }
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        height: "100%"
    },
    header: {
        flexDirection: "row",
        gap: 20,
        paddingBottom: 20,
        alignItems: "center"
    },
    roomContainer: {
        padding: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        gap: 15,
        marginVertical: 20,
        backgroundColor: "white"
    },
    tags: {
        flexDirection: "row",
        gap: 10
    },
    tag: {
        borderRadius: 100,
        color: "white",
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: Colors.light.tint,
    },
    occupation: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    emptyScreen: {
        alignItems: "center",
        gap: 10
    },
})