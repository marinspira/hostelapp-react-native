import React from 'react'
import { Text } from 'react-native'
import ChatList from '@/components/guest/chatList'
import profileDefault from '@/assets/images/unnamed.png'
import { useTheme } from '@/hooks/useThemeColor';
import Container from '@/components/container';

export default function Chat() {

  const dynamicStyles = useTheme();

  const chats = [
    {
      img: profileDefault,
      title: 'Maria',
      description: 'Are you sure?'
    },
    {
      img: profileDefault,
      title: 'Maria',
      description: 'Are you sure?'
    }
  ]

  return (
    <Container>
      <Text>Chat</Text>
      <ChatList data={chats} />
    </Container>
  )
}
