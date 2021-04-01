import Chats from '../components/chats'
import Posts from '../components/posts'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export type TabsParamList = {
  Posts: undefined
  Chats: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<TabsParamList>()

const Drawer = () => {
  return (
    <Navigator>
      <Screen name='Posts' component={Posts} />
      <Screen name='Chats' component={Chats} />
    </Navigator>
  )
}

export default Drawer
