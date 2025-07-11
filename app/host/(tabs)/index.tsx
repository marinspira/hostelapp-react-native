import { StyleSheet, View, ScrollView, Text, Image, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '@/src/interfaces/user';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { router } from 'expo-router';
import Greetings from '@/src/components/greetings'
import ButtonCreate from '@/src/components/buttons/ButtonCreate';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/src/constants/Colors';
import { useTheme } from '@/src/hooks/useTheme';
import { AppDispatch, RootState } from '@/src/redux/store';
import { getHostel } from '@/src/redux/slices/hostel';
import { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import RoomCard from '@/src/components/roomCard';
import EventList from '@/src/components/guest/eventList';
import { useGetHome } from '@/src/services/hostel/getHome';
import CardsContainer from "@/src/components/cardsContainer"
import ProfileCircles from '@/src/components/profileCircles';
import { getAllGuests, HostelGuests } from '@/src/redux/slices/hostelGuests';
import Container from '@/src/components/container';
import GuestsList from '@/src/components/guestsList';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFeatureFlag } from '@/src/hooks/useFeatureFlag';
import InputSearch from '@/src/components/inputs/inputSearch';

export default function HostHomeScreen() {
  const { t } = useTranslation();
  const dynamicStyles = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector((state: { user: User }) => state.user)
  const hostel = useSelector((state: RootState) => state.hostel.data)
  const { data: guests, loading } = useSelector((state: RootState) => state.hostelGuests);

  const [events, setEvents] = useState([])
  const [rooms, setRooms] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const showRoomFeatures = useFeatureFlag('rooms');
  const showEventFeatures = useFeatureFlag('events');
  const showReservationFeatures = useFeatureFlag('reservation');

  const { mutateAsync: getHomeMutation, isPending, error } = useGetHome();

  const fetchHostel = async () => {
    const result = await dispatch(getHostel())
  }

  const fetchHomeContent = async () => {
    try {
      const response = await getHomeMutation();

      setEvents(response.data.events)
      setRooms(response.data.rooms)


    } catch (err) {
      console.error('Error getting rooms:', err);
    }
  }

  useEffect(() => {
    fetchHomeContent()
    fetchHostel()
    dispatch(getAllGuests());
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHomeContent();
    setRefreshing(false);
  };

  return (
    <Container>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={Colors.light.tint}
              refreshing={refreshing}
              onRefresh={onRefresh} />
          }
        >
          <View style={styles.banner} >
            <Image
              source={
                hostel.logo
                  ? { uri: hostel.logo }
                  : require('@/assets/images/unnamed.png')
              }
              style={[styles.profileImage, { maxWidth: "33%" }]}
            />
            <View>
              <Text style={[dynamicStyles.text, styles.name, { textAlign: "center", marginLeft: -20 }]}>{hostel.name}</Text>
            </View>
            <Entypo name="notification" size={24} color="transparent" />
          </View>

          <Greetings
            username={hostel?.name}
          />

          {/* <View style={styles.incomesBanner}>
            <MaterialCommunityIcons
              style={styles.icomesIcon}
              name="location-enter"
            />
            <Text style={styles.incomesText}>Incomes</Text>
            <Text style={styles.incomesPriceText}>$ 4.000,00</Text>
          </View> */}

          {/* {showReservationFeatures &&
            <InputSearch
              onChange={(username) => console.log(username)}
              placeholder='Search guest by name, user or email'
            />
          } */}

          {/* {showRoomFeatures &&
            <CardsContainer
              title={t("Quartos")}
              data={rooms.length > 0}
              create={() => console.log("")}
              seeMore="host/allRooms"
              vertical={false}
            >
              {rooms.map((room, index) => (
                <RoomCard horizontalScroll key={index} room={room} index={index} />
              ))}
            </CardsContainer>
          } */}

          {showEventFeatures &&
            <CardsContainer
              data={events.length > 0}
              title={t("Últimos eventos")}
              create={() => console.log("")}
              seeMore="/host/event/all"
              vertical={false}
            >
              <EventList
                data={events || []}
                btnText={t("Ver")}
                horizontalScroll
              />
            </CardsContainer>
          }
        </ScrollView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  cardsContainer: {
    flexDirection: "row",

  },
  banner: {
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBar: {
    marginTop: -30,
    paddingHorizontal: 20,
    marginBottom: 30
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 100
  },
  name: {
    fontSize: 14,
    fontFamily: "PoppinsBold"
  },
  incomesBanner: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    gap: 30,
    overflow: "hidden"
  },
  incomesText: {
    color: "white",
    fontFamily: "PoppinsBold",
    fontSize: 18
  },
  incomesPriceText: {
    fontFamily: "PoppinsBold",
    color: "white",
    fontSize: 35,
    alignSelf: "flex-end",
    position: "relative",
  },
  icomesIcon: {
    position: "absolute",
    fontSize: 200,
    color: "white",
    opacity: 0.2,
  }
});
