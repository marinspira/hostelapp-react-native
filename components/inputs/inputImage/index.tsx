import { useState } from 'react';
import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { showToast } from '@/components/toast';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n';
import * as ImageManipulator from "expo-image-manipulator";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { deleteGuestImage, uploadGuestImage } from '@/redux/slices/guest/slice';
import useGenerateRandomFilename from '@/hooks/useRandomName';
import { useTheme } from '@/hooks/useThemeColor';

interface InputImageProps {
    id: string,
    label?: string,
    maxSelections?: number,
    suportText?: string,
    borderRadius?: string,
    borderWidth?: number,
    borderColor?: string,
    imgWidth?: number,
    defaultImg?: string
    endpoints: {
        upload: string,
        delete: string
    }
}

const InputImage: React.FC<InputImageProps> = ({ id, label, suportText, borderRadius, imgWidth = 85, defaultImg, endpoints, borderColor = '#ccc', borderWidth = 2 }) => {

    const [image, setImage] = useState<string | null>(defaultImg || null);

    const { t } = useTranslation();
    const dynamicStyles = useTheme()
    const dispatch = useDispatch<AppDispatch>()

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];

            try {
                const resizedImage = await ImageManipulator.manipulateAsync(
                    asset.uri,
                    [{ resize: { width: 800 } }],
                    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
                );

                setImage(resizedImage.uri);

                const imageUri = resizedImage.uri;
                const originalFilename = asset.fileName;
                const match = /\.(\w+)$/.exec(originalFilename as string);
                const fileExtension = match ? match[1] : 'jpg';
                const type = `image/${fileExtension}`;
                const filename = useGenerateRandomFilename(id, fileExtension);

                const img = new FormData();
                img.append('imageId', id);
                img.append('photo', { uri: imageUri, name: filename, type } as any);

                handleUpload(img)
            } catch (error) {
                console.error('Error resizing image:', error)
                showToast({
                    type: 'error',
                    title: t('Algum erro aconteceu!'),
                    message: t('Por favor, notifique seu bug nas configurações.')
                })
                return
            }
        }
    };

    const handleUpload = async (file: any) => {
        if (file) {
            try {
                const response = await dispatch(uploadGuestImage({ file, endpoint: endpoints.upload }))
                showToast({
                    type: 'success',
                    title: t('Enviado!'),
                    message: t('Upload feito com sucesso.')
                })
            } catch (err) {
                console.error(`Error upload: ${id}:`, err);
                showToast({
                    type: 'error',
                    title: t('Algum erro aconteceu!'),
                    message: t('Por favor, notifique seu bug nas configurações.')
                })
            }
        }
    }

    const handleRemoveImg = async () => {
        try {
            setImage(null)
            console.log(id)
            const response = await dispatch(deleteGuestImage({ id, endpoint: endpoints.delete }))
            console.log(response)
        } catch (error) {
            setImage(image)
            console.error('Error removing image: ', error)
            showToast({
                type: 'error',
                title: t('Algum erro aconteceu!'),
                message: t('Por favor, notifique seu bug nas configurações.')
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={dynamicStyles.label}>{label}</Text>
            {suportText && <Text style={styles.suportText}>{suportText}</Text>}
            <View style={styles.row}>
                {image ? (
                    <Pressable onPress={pickImage} style={{ zIndex: 10 }}>
                        {!borderRadius &&
                            <Pressable onPress={handleRemoveImg} style={styles.removePhoto}>
                                <Text>X</Text>
                            </Pressable>
                        }
                        <Image source={{ uri: image }} style={[styles.image, { borderRadius, width: imgWidth, height: imgWidth }]} />
                    </Pressable>
                ) : (
                    <Pressable onPress={pickImage} style={[styles.imgPickerBtn, { borderRadius, width: imgWidth, height: imgWidth, zIndex: 10, borderColor, borderWidth }]}>
                        <Text style={styles.imgPickerBtnText}>{'+'}</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

export default InputImage

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
        marginTop: 20
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    image: {
        width: 85,
        height: 85,
    },
    imgPickerBtn: {
        width: 70,
        height: 70,
        backgroundColor: '#f7f7f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgPickerBtnText: {
        fontSize: 30
    },
    suportText: {
        fontSize: 12,
        marginBottom: 15,
        color: '#b1b1b1',
        marginTop: -3,
    },
    removePhoto: {
        borderWidth: 1,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        position: 'absolute',
        zIndex: 9,
        backgroundColor: '#ffff',
        right: -8,
        top: -3
    }
})
