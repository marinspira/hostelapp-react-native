import React from 'react'
import ChatList from '@/components/guest/chatList'
import profileDefault from '@/assets/images/unnamed.png'
import { useTheme } from '@/hooks/useThemeColor';
import Container from '@/components/container';
import ProfileCircles from '@/components/profileCircles'
import { StyleSheet, Text } from 'react-native';

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
    },
    {
      img: profileDefault,
      title: 'Maria',
      description: 'Are you sure?'
    },
    {
      img: profileDefault,
      title: 'Maria',
      description: 'Are you sure?'
    },
    {
      img: profileDefault,
      title: 'Maria',
      description: 'Are you sure?'
    },
    {
      img: profileDefault,
      title: 'Maria',
      description: 'Are you sure?'
    },
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
      <Text style={styles.title}>Conversas</Text>
      <ProfileCircles />
      <ChatList data={chats} />
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