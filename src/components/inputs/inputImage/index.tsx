import { useState } from 'react';
import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { showToast } from '@/src/components/toast';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n';
import * as ImageManipulator from "expo-image-manipulator";
import useGenerateRandomFilename from '@/src/hooks/useRandomName';
import { useTheme } from '@/src/hooks/useTheme';

interface InputImageProps {
    id: string,
    label?: string,
    maxSelections?: number,
    suportText?: string,
    borderRadius?: number,
    borderWidth?: number,
    borderColor?: string,
    imgWidth?: number,
    defaultImg?: string
    imgHeight?: number,
    onUpload: any,
    onDelete?: any,
    imgPickerBtnText?: string
}

const InputImage: React.FC<InputImageProps> = ({
    id,
    label,
    suportText,
    borderRadius,
    imgWidth = 85,
    imgHeight = imgWidth,
    defaultImg,
    onUpload,
    borderColor = '#ccc',
    borderWidth = 2,
    onDelete,
    imgPickerBtnText
}) => {

    const [image, setImage] = useState<string | null>(defaultImg || null);
    const { t } = useTranslation();
    const dynamicStyles = useTheme()

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

                onUpload && img && onUpload(img)

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

    const handleRemoveImg = async () => {
        try {
            setImage(null)
            console.log(id)

            onDelete && onDelete(id)

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
                        <Image source={{ uri: image }} style={[styles.image, { borderRadius, width: imgWidth, height: imgHeight }]} />
                    </Pressable>
                ) : (
                    <Pressable onPress={pickImage} style={[styles.imgPickerBtn, { borderRadius, width: imgWidth, height: imgHeight, zIndex: 10, borderColor, borderWidth }]}>
                        <Text style={styles.imgPickerBtnText}>{imgPickerBtnText ? imgPickerBtnText : '+'}</Text>
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
        fontSize: 20
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
