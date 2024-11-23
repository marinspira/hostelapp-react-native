import { useRef, useState } from 'react';
import { Image, View, StyleSheet, Text, Pressable, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FlatList } from 'react-native';

interface InputImageProps {
    label?: string,
    maxSelections: number,
    onChange: (value: string | string[] | null) => void;
    suportText?: string
}
const { width } = Dimensions.get('window');

const InputImage: React.FC<InputImageProps> = ({ label, maxSelections = 1, onChange, suportText }) => {
    const [image, setImage] = useState<string | null>(null);
    const [imagesArray, setImagesArray] = useState<string[]>([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            if (maxSelections <= 1) {
                setImage(result.assets[0].uri);
                onChange(result.assets[0].uri)
            } else {
                setImagesArray((prevArray) => [...prevArray, result.assets[0].uri]);
                onChange([...imagesArray, result.assets[0].uri]);
            }
        }
    };

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
                <Pressable onPress={pickImage} style={styles.imgPickerBtn}>
                    <Text style={styles.imgPickerBtnText}>+</Text>
                </Pressable>
                {image && <Image source={{ uri: image }} style={styles.image} />}
                {imagesArray &&
                    <FlatList
                        ref={flatListRef}
                        data={imagesArray}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        renderItem={({ item, index }) => (
                            <Image
                                source={{ uri: item }}
                                style={[
                                    styles.image,
                                ]}
                            />
                        )}
                    />
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
        width: 70,
        height: 70,
        marginLeft: 10
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
})