
import { View, Text } from 'react-native'
import React from 'react'
import { ThemedView } from '../../components/themed-view'

const Home = () => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </ThemedView>
  )
}

export default Home
