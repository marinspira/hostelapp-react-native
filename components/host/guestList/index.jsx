import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CELL_WIDTH = 100;
const CELL_HEIGHT = 50;

const INITIAL_DATE = new Date(2025, 1, 1);

const DAYS = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(INITIAL_DATE);
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
});

const reservations = [
    {
        hostel: 'Hostel App',
        guest: 'Leticia',
        checkin_date: new Date(2025, 2, 1),
        checkout_date: new Date(2025, 2, 4),
        room: 'verão',
        bed: 'A',
    },
    {
        hostel: 'Hostel App',
        guest: 'Mayara',
        checkin_date: new Date(2025, 2, 2),
        checkout_date: new Date(2025, 2, 4),
        room: 'outono',
        bed: 'C',
    },
];

const ROOMS = [
    {
        name: 'outono',
        beds: [{
            bed: 'A',
            reservation_id: null
        },
        {
            bed: 'B',
            reservation_id: null
        },
        {
            bed: 'C',
            reservation_id: 'Mayara'
        }]
    },
    {
        name: 'verão',
        beds: [{
            bed: 'A',
            reservation_id: 'Leticia'
        },
        {
            bed: 'B',
            reservation_id: null
        },
        {
            bed: 'C',
            reservation_id: null
        }]
    }
]

export default function GuestList() {

    const [expandedRooms, setExpandedRooms] = useState({});

    const toggleRoom = (roomIndex) => {
        setExpandedRooms((prev) => ({
            ...prev,
            [roomIndex]: !prev[roomIndex],
        }));
    };

    return (
        <View style={styles.tableContainer}>
            {/* Primeira coluna fixa com quartos e camas */}
            <View>
                <View style={styles.mainColumns}>
                    <Text style={styles.header}>Rooms</Text>
                </View>
                {ROOMS.map((room, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => toggleRoom(index)} style={styles.mainColumns}>
                            <Text style={styles.roomName}>{room.name}</Text>
                        </TouchableOpacity>

                        {expandedRooms[index] && (
                            room.beds.map((bed, bedIndex) => (
                                <View key={bedIndex} style={styles.grayColumns}>
                                    <Text>{bed.bed}</Text>
                                </View>
                            ))
                        )}
                    </View>
                ))}
            </View>

            <ScrollView horizontal>
                <ScrollView>
                    {/* Cabeçalho com Datas */}
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        {DAYS.map(date => (
                            <View key={date} style={styles.mainColumns}>
                                <Text>{date}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Corpo da tabela */}
                    <View>
                        {/* {ROOMS.beds.map(room => (
                            <View key={room} style={{ flexDirection: 'row' }}>
                                {DAYS.map(date => (
                                    <View key={date} style={styles.grayColumns} />
                                ))}
                            </View>
                        ))} */}
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tableContainer: {
        marginVertical: 20,
        flexDirection: 'row'
    },
    mainColumns: {
        height: CELL_HEIGHT,
        width: CELL_WIDTH,
        backgroundColor: '#fff',
        justifyContent: 'center',
        display: 'flex',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: '#ddd',
        borderBottomWidth: 1,
    },
    grayColumns: {
        height: CELL_HEIGHT,
        width: CELL_WIDTH,
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1
    }
})