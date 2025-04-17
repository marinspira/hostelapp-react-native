import React, { useEffect, useState } from 'react'
import ChatList from '@/components/chatList'
import Container from '@/components/container';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useGetAllConversations } from '@/services/chat/getAllConversations';
import EmptyState from '@/components/emptyState';
import EmptyScreenImage from "@/assets/images/illustrations/undraw/undraw_dog_jfxm.svg"

export default function Chat() {
  const { mutateAsync: getAllConversationsMutation, isPending } = useGetAllConversations();
  const [chats, setChats] = useState([])

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
  }, []);

  return (
    <Container>
      <Text style={styles.title}>Conversas</Text>
      {/* TODO: Feature paga, pague e veja todos que estao no mesmo hostel que voce
        <ProfileCircles
          people={null}
        /> 
      */}
      {isPending ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#6c63ff" />
        </View>
      ) : (
        chats.length > 0 ? (
          <ChatList conversations={chats} />
        ) : (
          <EmptyState
            img={<EmptyScreenImage width={300} />}
            title="Nenhuma conversa encotrada"
            text="Conecte a um hostel para conversar"
          />
        )
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