import { Colors } from "@/src/constants/Colors";
import { useFeatureFlag } from "@/src/hooks/useFeatureFlag";
import { useTheme } from "@/src/hooks/useTheme";
import { User } from "@/src/interfaces/user";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, useWindowDimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function GuestsList() {

  const user = useSelector((state: { user: User }) => state.user)
  const { data: guests, loading } = useSelector((state: RootState) => state.hostelGuests);

  const dynamicStyles = useTheme()

  const showChatFeatures = useFeatureFlag('chat');

  return (
    <>
      {guests.length > 0 && guests.map((person, index) => (
        <TouchableOpacity
          onPress={() =>
            showChatFeatures && router.push({
              pathname: `/${user?.role ?? "guest"}/(screens)/chat`,
              params: {
                userId: person.userId,
                name: person.name,
                photo: person.firstPhoto,
              },
            } as any)
          }
          key={index}
          style={[styles.guestItem]}
        >
          <Image
            source={
              person.firstPhoto
                ? { uri: `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/${person.firstPhoto}` }
                : require('@/assets/images/unnamed.png')
            }
            style={styles.img}
          />
          <Text style={dynamicStyles.text}>{person.name}</Text>
        </TouchableOpacity>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  guestItem: {
    gap: 20,
    flexDirection: 'row',
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  scrollView: {
    alignItems: 'center',
    paddingHorizontal: -10,
    flexDirection: "column",

  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
})