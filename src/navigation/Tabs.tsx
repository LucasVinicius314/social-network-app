import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'

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

const { Navigator, Screen } = createBottomTabNavigator<TabsParamList>()

const Drawer = (props: Props) => {
  return (
    <Navigator>
      <Screen name='Posts' component={Posts} />
      <Screen name='Chats' component={Chats} />
    </Navigator>
  )
}

export default Drawer
