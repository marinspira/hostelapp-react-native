import { View, Text, ScrollView, Dimensions } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

// const { width } = Dimensions.get('window');
const CELL_WIDTH = 80;
const CELL_HEIGHT = 50;
const HEADER_HEIGHT = 30;
const ROOMS = ['1', '2', '3', '4'];
const INITIAL_DATE = new Date(2025, 2, 1);
const DAYS = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(INITIAL_DATE);
  date.setDate(date.getDate() + i);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
});

const reservations = [
  {
    hostel: 'Hostel App',
    guest: 'Mayara',
    checkin_date: new Date(2025, 2, 1),
    checkout_date: new Date(2025, 2, 4),
    room: '1',
    bed: '2',
  },
  {
    hostel: 'Hostel App',
    guest: 'Mayara',
    checkin_date: new Date(2025, 2, 2),
    checkout_date: new Date(2025, 2, 4),
    room: '3',
    bed: '3',
  },
];

export default function GuestList() {
  return (
    <ScrollView horizontal>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          {/* Quartos */}
          <View>
            <View style={{ height: HEADER_HEIGHT, width: CELL_WIDTH, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
              <Text>Rooms</Text>
            </View>
            {ROOMS.map(room => (
              <View key={room} style={{ height: CELL_HEIGHT, width: CELL_WIDTH, justifyContent: 'center', alignItems: 'center', borderWidth: 1 }}>
                <Text>{room}</Text>
              </View>
            ))}
          </View>

          {/* Datas e Hóspedes */}
          <View>
            {/* Cabeçalho com Datas */}
            <View style={{ flexDirection: 'row' }}>
              {DAYS.map(date => (
                <View key={date} style={{ width: CELL_WIDTH, height: HEADER_HEIGHT, justifyContent: 'center', alignItems: 'center', borderWidth: 1, backgroundColor: '#ccc' }}>
                  <Text>{date}</Text>
                </View>
              ))}
            </View>

            {/* Corpo da tabela */}
            <View>
              {ROOMS.map(room => (
                <View key={room} style={{ flexDirection: 'row' }}>
                  {DAYS.map(date => (
                    <View key={date} style={{ width: CELL_WIDTH, height: CELL_HEIGHT, borderWidth: 1 }} />
                  ))}
                </View>
              ))}

              {/* Renderizar hóspedes */}
              <Svg height={ROOMS.length * CELL_HEIGHT} width={DAYS.length * CELL_WIDTH} style={{ position: 'absolute', top: HEADER_HEIGHT, left: CELL_WIDTH }}>
                {reservations.map((res, index) => {
                  const checkinIndex = DAYS.indexOf(res.checkin_date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
                  const checkoutIndex = DAYS.indexOf(res.checkout_date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
                  const roomIndex = ROOMS.indexOf(res.room);

                  if (checkinIndex === -1 || checkoutIndex === -1 || roomIndex === -1) return null;

                  const x = checkinIndex * CELL_WIDTH + CELL_WIDTH / 2;
                  const y = roomIndex * CELL_HEIGHT + CELL_HEIGHT / 2;
                  const width = (checkoutIndex - checkinIndex) * CELL_WIDTH;
                  const height = CELL_HEIGHT * 0.8;

                  return (
                    <Polygon
                      key={index}
                      points={`${x},${y} ${x + width},${y} ${x + width - 10},${y + height} ${x - 10},${y + height}`}
                      fill="blue"
                      stroke="black"
                      strokeWidth="1"
                    />
                  );
                })}
              </Svg>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}
