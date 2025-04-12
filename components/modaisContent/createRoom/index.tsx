import { StyleSheet, Text, View } from "react-native"
import Input from "@/components/inputs/input";
import SimpleButton from "@/components/buttons/SimpleButton";
import SelectItens from "@/components/inputs/selectItens";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { useCreateRoom } from "@/services/hostel/createRoom";

export default function CreateRoomModal() {

    const dynamicStyles = useTheme()
    const { t } = useTranslation()
    const { mutateAsync: createRoomMutation, isPending, error } = useCreateRoom();

    const [room, setRoom] = useState({
        type: "",
        name: "",
        capacity: null,
        organization_by: null,
        beds: [{
            bed_number: '',
            assigned_by: null
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
        } catch (err) {
            console.error('Error creating Room:', err);
        }
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
                        t('Volunteers'),
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
            <SimpleButton
                text="Criar quarto"
                onPress={handleSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    }
})