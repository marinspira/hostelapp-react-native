import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import defaultImg from '@/assets/images/unnamed.png';
import ProfilesGroup from '@/components/profilesGroup';
import SlideImage from '@/components/slideImages';
import Title from '../title';

function EventList({ data, btnText, title }) {

    return (
        <View>
            <Title text={title} />
            {data.map((item, index) => (
                <View style={styles.container} key={index}>
                    <SlideImage images={item.imgs ? item.imgs : [defaultImg]} />

                    <View style={styles.content}>
                        <Text>{item.date ? item.date : item.local}</Text>
                        <Text>{item.name}</Text>
                        <View style={styles.content2}>
                            <ProfilesGroup people={item.people} />
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.btnText}>{btnText}</Text>
                                <AntDesign name="arrowright" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        marginTop: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    img: {
        width: 310,
        height: 150,
        borderRadius: 5,
        marginBottom: 20
    },

    btn: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: "#000",
        borderRadius: 34,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        marginRight: 5,
    },
    content: {
        flexDirection: "column",
        alignItems: 'flex-start'
    },
    content2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    }
});

export default EventList;
