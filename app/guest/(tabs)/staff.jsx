import React from 'react'
import { Text, View } from 'react-native'
import profileDefault from '@/assets/images/unnamed.png'
import EventList from '@/components/guest/eventList'
import { useTheme } from '@/hooks/useTheme';
import Container from '@/components/container'

export default function Staff() {

  const dynamicStyles = useTheme();

  const positions = [
    {
      img: '',
      name: 'Reception in Zagreb',
      people: [
        { avatar: profileDefault },
        { avatar: profileDefault },
        { avatar: profileDefault },
        { avatar: profileDefault },
      ],
      local: 'Zagreb, Croatia'
    }
  ]

  return (
    <Container>
      <Text>Staff Area</Text>
      <EventList data={positions} btnText='Take a look' />
    </Container>
  )
}
