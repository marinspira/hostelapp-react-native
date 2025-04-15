import React, { useEffect, useState } from 'react'
import ChatList from '@/components/guest/chatList'
import profileDefault from '@/assets/images/unnamed.png'
import { useTheme } from '@/hooks/useTheme';
import Container from '@/components/container';
import ProfileCircles from '@/components/profileCircles'
import { StyleSheet, Text } from 'react-native';
import { useGetAllGuests } from '@/services/hostel/getAllGuests';
import { showToast } from '@/components/toast';

interface Guest {
  userId: string;
  firstPhoto: string | null;
  name: string;
}

export default function Chat() {

  const chats = [
    {
      img: profileDefault,
      title: 'Maria',
      description: 'Are you sure?',
      unread: 1,
      userId: ""
    },
    {
      img: profileDefault,
      title: 'Maria',
      description: 'Are you sure?',
      unread: 1,
      userId: ""
    },
    {
      img: profileDefault,
      title: 'Maria',
      description: 'Are you sure?',
      unread: 1,
      userId: ""
    },
  ]

  const { mutateAsync: getAllGuestsMutation, isPending, error } = useGetAllGuests();
  const [guests, setGuests] = useState<Guest[]>()

  useEffect(() => {
    if (error) {
      let errorMessage = 'Erro desconhecido';

      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response?.data?.message === 'string'
      ) {
        errorMessage = (error as any).response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      showToast({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });
    }
  }, [error]);

  useEffect(() => {
    const getAllGuests = async () => {
      try {
        const response = await getAllGuestsMutation();
        setGuests(response)
      } catch (err) {
        console.error('Error in chat screen:', err);
      }
    };
    getAllGuests()
  }, [])

  return (
    <Container>
      <Text style={styles.title}>Conversas</Text>
      <ProfileCircles
        people={
          guests?.map((guest) => ({
            img: guest.firstPhoto || profileDefault,
            name: guest.name.split(" ")[0] || "",
            userId: guest.userId,
          })) || []
        }
      />
      <ChatList conversations={chats} />
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25,
    marginTop: -15,
    textTransform: 'lowercase',
    fontFamily: 'PoppinsBold'
  }
})