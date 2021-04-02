import * as Icons from '@expo/vector-icons'

import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'

import { Avatar } from 'react-native-paper'
import Chats from '../components/chats'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from './Drawer'
import Posts from '../components/posts'
import React from 'react'
import { RootParamList } from './Root'
import { StackNavigationProp } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export type TabsParamList = {
  Posts: undefined
  Chats: undefined
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'Tabs'>,
  StackNavigationProp<RootParamList>
>
type Route = RouteProp<DrawerParamList, 'Tabs'>

type Props = {
  navigation: Navigation
  route: Route
}

const resolveIcon = ({
  color,
  size,
  name,
}: {
  color: string
  size: number
  focused: boolean
  name: keyof TabsParamList
}) => {
  switch (name) {
    case 'Chats':
      return <Icons.MaterialIcons name='chat' size={size} color={color} />
    case 'Posts':
      return (
        <Icons.MaterialCommunityIcons
          name='file-document'
          size={size}
          color={color}
        />
      )
  }
}

const { Navigator, Screen } = createBottomTabNavigator<TabsParamList>()

const Drawer = (props: Props) => {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) =>
          resolveIcon({ color, focused, name: route.name, size }),
      })}>
      <Screen name='Posts' component={Posts} />
      <Screen name='Chats' component={Chats} />
    </Navigator>
  )
}

export default Drawer
