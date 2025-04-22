import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import Input from "@/src/components/inputs/input";
import SimpleButton from "@/src/components/buttons/SimpleButton";
import SelectItens from "@/src/components/inputs/selectItens";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { useEffect, useState } from "react";
import { useCreateRoom } from "@/src/services/hostel/createRoom";
import { showToast } from "@/src/components/toast";

interface CreateRoomModalProps {
    setModalVisible: (isVisible: boolean) => void;
}

export default function CreateRoomModal({ setModalVisible }: CreateRoomModalProps) {

    const dynamicStyles = useTheme()
    const { t } = useTranslation()
    const { mutateAsync: createRoomMutation, isPending, error } = useCreateRoom();

    useEffect(() => {
        if(error) {
            const errorMessage = error?.response?.data?.message || error?.message || "Erro desconhecido";
            showToast({
                type: 'error',
                title: "Error",
                message: errorMessage,
            });
        }
    }, [error])

    const [room, setRoom] = useState({
        type: "",
        name: "",
        capacity: null,
        organization_by: null,
        beds: [{
            bed_number: '',
            reservation_id: null
        }]
    })

    function handleChange(name: string, value: any) {
        setRoom((prevRoom) => ({
            ...prevRoom,
            [name]: value
        }));
    }

    async function handleSubmit() {
        try {
            const response = await createRoomMutation(room);
            console.log('Room criado:', response);
            setModalVisible(false)
        } catch (err) {
            console.error('Error creating Room:', err);
        }
    }

    function isFormValid() {
        return room.name && room.capacity && room.type && room.organization_by;
    }

    return (
        <View>
            <Text style={dynamicStyles.textUppercase}>Criar novo quarto</Text>
            <View style={styles.form}>
                <Input
                    label="Nome do quarto"
                    placeholder="Room 105"
                    value={room.name}
                    onChange={(value) => handleChange('name', value)}
                />
                <Input
                    label="Quantas camas?"
                    placeholder="5 beds"
                    onlyNumbers={true}
                    onChange={(value) => handleChange('capacity', value)}
                    value={room.capacity}
                />
                <SelectItens
                    label={t('Tipo de habitaçao')}
                    options={[
                        t('Shared'),
                        t('Private'),
                        t('Staff'),
                    ]}
                    onChange={(value) => handleChange('type', value)}
                    value={room.type}
                />
                <SelectItens
                    label={t('Como voce organiza suas camas?')}
                    suportText={t("Ex: Cama 1, 2, 3 ou Cama A, B, C")}
                    options={[
                        t('Por numero'),
                        t('Por letras')
                    ]}
                    onChange={(value) => handleChange('organization_by', value)}
                    value={room.organization_by}
                />
            </View>
            {isPending ?
                <ActivityIndicator size="large" color="#6c63ff" />
                :
                <SimpleButton
                    text="Criar quarto"
                    onPress={handleSubmit}
                    disabled={!isFormValid()}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    }
})