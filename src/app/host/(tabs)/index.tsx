import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Entypo from '@expo/vector-icons/Entypo';
import '@/assets/translations/i18n'

import Greetings from '@/src/components/ui/Greetings'
import Container from '@/src/components/layout/Container';

import { Colors } from '@/src/constants/Colors';
import { getHostel } from '@/src/redux/slices/hostel';
import { AppDispatch, RootState } from '@/src/redux/store';

import { useTheme } from '@/src/hooks/useTheme';
import { useFeatureFlag } from '@/src/hooks/useFeatureFlag';

export default function HostHomeScreen() {
  const { t } = useTranslation();
  const dynamicStyles = useTheme()
  
  const dispatch = useDispatch<AppDispatch>()
  const hostel = useSelector((state: RootState) => state.hostel.data)

  const [events, setEvents] = useState([])
  const [rooms, setRooms] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const showRoomFeatures = useFeatureFlag('rooms');
  const showEventFeatures = useFeatureFlag('events');
  const showReservationFeatures = useFeatureFlag('reservation');

  // const { mutateAsync: getHomeMutation, isPending, error } = useGetHome();

  const fetchHostel = async () => {
    const result = await dispatch(getHostel())
  }

  // const fetchHomeContent = async () => {
  //   try {
  //     const response = await getHomeMutation();
  //     setEvents(response.data.events)
  //     setRooms(response.data.rooms)

  //   } catch (err) {
  //     console.error('Error getting rooms:', err);
  //   }
  // }

  useEffect(() => {
    fetchHostel()
    // fetchHomeContent()
    // dispatch(getAllGuests());
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    // await fetchHomeContent();
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
