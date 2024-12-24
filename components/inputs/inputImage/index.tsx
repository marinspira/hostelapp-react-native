import { useRef, useState } from 'react';
import { Image, View, StyleSheet, Text, Pressable, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';

interface InputImageProps {
    label?: string,
    maxSelections?: number,
    onChange: (value: string | string[] | null) => void;
    suportText?: string,
    borderRadius?: string,
    imgWidth?: number,
    defaultImg?: string
}
const { width } = Dimensions.get('window');

const InputImage: React.FC<InputImageProps> = ({
    label,
    onChange,
    suportText,
    borderRadius,
    imgWidth = 85,
    defaultImg
}) => {
    const [image, setImage] = useState<string | null>(defaultImg || null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onChange(result.assets[0].uri)
        }
    };

    const handleRemoveImg = () => {
        setImage(null)
        onChange(null)
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(slideIndex);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>{label}</Text>
            {suportText && <Text style={styles.suportText}>{suportText}</Text>}
            <View style={styles.row}>
                {image ? (
                    <Pressable onPress={pickImage}>
                        {!borderRadius && <Pressable onPress={handleRemoveImg} style={styles.removePhoto}>
                            <Text>X</Text>
                        </Pressable>}
                        <Image source={{ uri: image }} style={[styles.image, { borderRadius, width: imgWidth, height: imgWidth }]} />
                    </Pressable>
                ) :
                    (
                        <Pressable onPress={pickImage} style={[styles.imgPickerBtn, { borderRadius, width: imgWidth, height: imgWidth }]}>
                            <Text style={styles.imgPickerBtnText}>+</Text>
                        </Pressable>
                    )
                }
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
        backgroundColor: Colors.white,
        right: -8,
        top: -3
    }
})