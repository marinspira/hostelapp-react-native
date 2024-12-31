import { useState } from 'react';
import { Image, View, StyleSheet, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUploadImages } from '@/hooks/useUploadImage';
import { showToast } from '@/components/toast';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n';

interface InputImageProps {
    id: string,
    label?: string,
    maxSelections?: number,
    suportText?: string,
    borderRadius?: string,
    imgWidth?: number,
    defaultImg?: string
    endpoit: string
}

const InputImage: React.FC<InputImageProps> = ({ id, label, suportText, borderRadius, imgWidth = 85, defaultImg, endpoit }) => {

    const [image, setImage] = useState<string | null>(defaultImg || null);
    const { uploadFile, isUploading, progress, error } = useUploadImages();
    const { t } = useTranslation();


    const handleUpload = async (file: any) => {
        if (file) {
            try {
                const response = await uploadFile(file, endpoit);
                console.log(`Success upload: ${id}:`, response);
            } catch (err) {
                console.error(`Error upload: ${id}:`, err);
            }
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {

            const asset = result.assets[0];

            const maxFileSize = 3 * 1024 * 1024;
            if (asset.fileSize && asset.fileSize > maxFileSize) {
                console.error(`File size exceeds the limit of 3MB.`);
                showToast({
                    type: 'error',
                    title: t('Arquivo muito grande'),
                    message: t('Por favor, selecione uma imagem com tamanho menor que 3MB.')
                })
                return;
            }

            setImage(asset.uri);

            const imageUri = asset.uri;
            const originalFilename = asset.fileName;
            const match = /\.(\w+)$/.exec(originalFilename as string);
            const fileExtension = match ? match[1] : 'jpg';
            const type = `image/${fileExtension}`;
            const filename = `${id}.${fileExtension}`;

            const img = new FormData();
            img.append('id', id);
            img.append('photo', { uri: imageUri, name: filename, type } as any);

            handleUpload(img)
        }
    };

    const handleRemoveImg = () => {
        setImage(null)
        handleUpload(null)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>{label}</Text>
            {suportText && <Text style={styles.suportText}>{suportText}</Text>}
            <View style={styles.row}>
                {!isUploading && !error && image ? (
                    <Pressable onPress={pickImage}>
                        {!borderRadius &&
                            <Pressable onPress={handleRemoveImg} style={styles.removePhoto}>
                                <Text>X</Text>
                            </Pressable>
                        }
                        <Image source={{ uri: image }} style={[styles.image, { borderRadius, width: imgWidth, height: imgWidth }]} />
                    </Pressable>
                ) : (
                    <Pressable onPress={pickImage} style={[styles.imgPickerBtn, { borderRadius, width: imgWidth, height: imgWidth }]}>
                        <Text style={styles.imgPickerBtnText}>{isUploading ? `${progress}%` : '+'}</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

export default InputImage

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    image: {
        width: 85,
        height: 85,
    },
    formTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    imgPickerBtn: {
        width: 70,
        height: 70,
        backgroundColor: '#f7f7f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc'
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
