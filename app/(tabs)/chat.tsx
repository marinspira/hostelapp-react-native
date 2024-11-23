import React from 'react'
import { Text, View } from 'react-native'
import ChatList from '@/components/chatList'
import profileDefault from '@/assets/images/unnamed.png'

export default function Chat() {

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
    <View>
        <Text>Chat</Text>
        <ChatList data={chats}/>
    </View>
  )
}
