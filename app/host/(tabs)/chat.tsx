import React, { useEffect, useState } from 'react'
import ChatList from '@/src/components/chatList'
import Container from '@/src/components/container';
import ProfileCircles from '@/src/components/profileCircles'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { showToast } from '@/src/components/toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { getAllGuests, HostelGuests } from '@/src/redux/slices/hostelGuests';
import { useGetAllConversations } from '@/src/services/chat/getAllConversations';
import EmptyState from '@/src/components/emptyState';
import EmptyScreenImage from "@/assets/images/illustrations/undraw/undraw_dog_jfxm.svg"

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
      // Corrigir a condição para:
      {guests.length === 0 || chats.length === 0 ? (
        <EmptyState
          img={<EmptyScreenImage width={300} />}
          title="Nenhuma conversa encontrada"
          text="Conecte a um hostel para conversar"
        />
      ) : (
        <>
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
        </>
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