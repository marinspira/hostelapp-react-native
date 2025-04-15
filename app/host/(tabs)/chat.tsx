import React, { useEffect } from 'react'
import ChatList from '@/components/guest/chatList'
import profileDefault from '@/assets/images/unnamed.png'
import Container from '@/components/container';
import ProfileCircles from '@/components/profileCircles'
import { StyleSheet, Text } from 'react-native';
import { showToast } from '@/components/toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getAllGuests, HostelGuests } from '@/redux/slices/hostelGuests/slice';

interface Guest {
  userId: string;
  firstPhoto: string | null;
  name: string;
}

export default function Chat() {

  const chats = [
    {
      img: profileDefault,
      name: 'Maria',
      lastMessage: 'Are you sure?',
      unread: 1,
      userId: ""
    },
    {
      img: profileDefault,
      name: 'Maria',
      lastMessage: 'Are you sure?',
      unread: 1,
      userId: ""
    },
    {
      img: profileDefault,
      name: 'Maria',
      lastMessage: 'Are you sure?',
      unread: 1,
      userId: ""
    },
  ]

  const dispatch = useDispatch<AppDispatch>();

  const { data: guests, error, loading } = useSelector((state: RootState) => state.hostelGuests);

  // TODO: fazer get de chats existents, pegar foto e nome e ultima mensagem apenas das pessoas que ja tem uma conversa criada

  useEffect(() => {
    dispatch(getAllGuests());
  }, []);

  useEffect(() => {
    console.log(guests)
  }, [])

  useEffect(() => {
    if (error) {
      showToast({
        type: 'error',
        title: 'Erro',
        message: error,
      });
    }
  }, [error]);

  return (
    <Container>
      <Text style={styles.title}>Conversas</Text>
      <ProfileCircles
        people={
          guests?.map((guest: HostelGuests) => ({
            img: guest.firstPhoto === null ? null : guest.firstPhoto,
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