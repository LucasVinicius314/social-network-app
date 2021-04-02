import Friends from '../components/friends'
import React from 'react'
import { RootParamList } from './Root'
import { RouteProp } from '@react-navigation/native'
import Settings from '../components/settings'
import { StackNavigationProp } from '@react-navigation/stack'
import Tabs from './Tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

export type DrawerParamList = {
  Friends: undefined
  Settings: undefined
  Tabs: undefined
}

type Navigation = StackNavigationProp<RootParamList, 'Drawer'>
type Route = RouteProp<RootParamList, 'Drawer'>

type Props = {
  navigation: Navigation
  route: Route
}

const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>()

const Drawer = (props: Props) => {
  return (
    <Navigator>
      <Screen name='Tabs' component={Tabs} options={{ drawerLabel: 'Home' }} />
      <Screen name='Friends' component={Friends} />
      <Screen name='Settings' component={Settings} />
    </Navigator>
  )
}

export default Drawer
