import Friends from '../components/friends'
import React from 'react'
import Settings from '../components/settings'
import Tabs from './Tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

export type DrawerParamList = {
  Friends: undefined
  Settings: undefined
  Tabs: undefined
}

const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>()

const Drawer = () => {
  return (
    <Navigator>
      <Screen name='Tabs' component={Tabs} />
      <Screen name='Friends' component={Friends} />
      <Screen name='Settings' component={Settings} />
    </Navigator>
  )
}

export default Drawer
