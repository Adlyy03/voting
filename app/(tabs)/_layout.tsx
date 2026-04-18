
import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#3498db',
                tabBarInactiveTintColor: '#95a5a6',
                tabBarStyle: {
                    backgroundColor: '#ecf0f1',
                    borderTopWidth: 1,
                    borderTopColor: '#bdc3c7',
                    height: 84,
                }
            }}
        >
            <Tabs.Screen 
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                            <MaterialIcons name="home" size={24} color={color} />
                            <Text style={{ color: color, fontSize: 12 }}>Home</Text>
                        </View>
                    )
                }}
            />
            <Tabs.Screen 
                name="create"
                options={{
                    title: 'Create',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                            <MaterialIcons name="add-circle" size={24} color={color} />
                            <Text style={{ color: color, fontSize: 12 }}>Create</Text>
                        </View>
                    )
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                            <MaterialIcons name="person" size={24} color={color} />
                            <Text style={{ color: color, fontSize: 12 }}>Profile</Text>
                        </View>
                    )
                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout
