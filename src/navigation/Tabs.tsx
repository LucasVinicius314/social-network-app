import * as Icons from '@expo/vector-icons'

import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'

import Chats from '../components/chats'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from './Drawer'
import Explore from '../components/explore'
import Feed from '../components/feed'
import React from 'react'
import { RootParamList } from './Root'
import { StackNavigationProp } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export type TabsParamList = {
  Chats: undefined
  Explore: undefined
  Feed: undefined
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
    case 'Explore':
      return <Icons.MaterialIcons name='explore' size={size} color={color} />
    case 'Feed':
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
      <Screen name='Feed' component={Feed} />
      <Screen name='Explore' component={Explore} />
      <Screen name='Chats' component={Chats} />
    </Navigator>
  )
}

export default Drawer
