import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import SimpleButton from "@/src/components/buttons/SimpleButton";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/hooks/useTheme";
import { useCreateRoom } from "@/src/services/hostel/rooms/create";
import { showToast } from "@/src/components/toast";
import { FormInput } from "../../inputs/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { FormMultiSelect } from "../../inputs/FormMultiSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

interface CreateRoomModalProps {
    setModalVisible: (isVisible: boolean) => void;
    callback?: () => void;
}

export default function CreateRoomModal({ setModalVisible, callback }: CreateRoomModalProps) {
    const dynamicStyles = useTheme()
    const { t } = useTranslation()

    const roomSchema = z.object({
        name: z.string().min(1, t("O nome é obrigatório")),
        capacity: z
            .string()
            .regex(/^\d+$/, t("A capacidade deve ser um número"))
            .refine((val) => parseInt(val) > 0, {
                message: t("A capacidade deve ser maior que zero"),
            }),
        type: z
            .array(z.string().min(1))
            .min(1, t("Tipo é obrigatório")),
        organization_by: z
            .array(z.string().min(1))
            .min(1, t("Organização é obrigatória")),
    });

    type RoomFormValues = z.infer<typeof roomSchema>;

    const methods = useForm<RoomFormValues>({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            name: "",
            capacity: "",
            type: [],
            organization_by: [],
        },
    });

    const {
        handleSubmit,
        formState: { errors },
    } = methods;

    const { mutateAsync: createRoomMutation, isPending, error } = useCreateRoom();

    async function onSubmit(data: RoomFormValues) {
        try {
            const payload = {
                name: data.name,
                capacity: Number(data.capacity),
                type: data.type.join(", "),
                organization_by: data.organization_by.join(", "),
            };

            await createRoomMutation(payload);

            showToast({
                type: "success",
                title: t("Sucesso"),
                message: t("Quarto criado com sucesso!"),
            });

            callback?.();
            setModalVisible(false);
        } catch (err: any) {
            console.error("Error creating room:", err);
            showToast({
                type: "error",
                title: t("Erro"),
                message: err?.response?.data?.message || err.message || t("Erro desconhecido"),
            });
        }
    }

    return (
        <View>
            <Text style={dynamicStyles.textUppercase}>{t("Criar novo quarto")}</Text>
            <View style={styles.form}>
                <FormProvider {...methods}>
                    <FormInput
                        name="name"
                        key="name"
                        label={t("Nome do quarto")}
                        placeholder="Room 101"
                    />
                    <FormInput
                        name="capacity"
                        key="capacity"
                        label={t("Quantas camas?")}
                        placeholder="5"
                    />
                    <FormMultiSelect
                        name="type"
                        key="type"
                        options={[
                            t('Compartilhado'),
                            t('Privado'),
                            t('Staff'),
                        ]}
                        label={t('Tipo de habitação')}
                    />
                    <FormMultiSelect
                        name="organization_by"
                        key="organization_by"
                        label={t('Como você organiza suas camas?')}
                        // suportText={t("Ex: Cama 1, 2, 3 ou Cama A, B, C")}
                        options={[
                            t('Por números'),
                            t('Por letras')
                        ]}
                    />
                </FormProvider>
            </View>
            {isPending ?
                <ActivityIndicator size="large" color="#6c63ff" />
                :
                <SimpleButton
                    text={t("Criar quarto")}
                    onPress={handleSubmit(onSubmit)}
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