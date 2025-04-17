import React, { useEffect, useState } from 'react'
import ChatList from '@/components/chatList'
import Container from '@/components/container';
import ProfileCircles from '@/components/profileCircles'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { showToast } from '@/components/toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getAllGuests, HostelGuests } from '@/redux/slices/hostelGuests/slice';
import { useGetAllConversations } from '@/services/chat/getAllConversations';

interface Guest {
  userId: string;
  firstPhoto: string | null;
  name: string;
}

export default function Chat() {
  const dispatch = useDispatch<AppDispatch>();

  const { mutateAsync: getAllConversationsMutation, isPending } = useGetAllConversations();
  const [chats, setChats] = useState([{
    conversationId: null,
    unreadMessages: 0,
    participant: {
      userId: "",
      name: "",
      photo: ""
    },
    lastMessage: {
      text: "",
      createdAt: null,
    }
  }])

  const { data: guests, error, loading } = useSelector((state: RootState) => state.hostelGuests);

  const getConversations = async () => {
    try {
      const response = await getAllConversationsMutation();
      setChats(response)
    } catch (err) {
      console.error('Error in getConversations screen:', err);
    }
  };

  useEffect(() => {
    getConversations()
    dispatch(getAllGuests());
  }, []);

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
          guests
            ?.filter((guest: HostelGuests) =>
              !chats.some(chat => chat.participant.userId === guest.userId)
            )
            .map((guest: HostelGuests) => ({
              img: guest.firstPhoto ?? null,
              name: guest.name.split(" ")[0] || "",
              userId: guest.userId,
            })) || []
        }
      />
      {isPending ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#6c63ff" />
        </View>
      ) : (
        <ChatList conversations={chats} />
      )}
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