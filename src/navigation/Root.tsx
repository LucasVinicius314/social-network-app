import Comments from '../components/comments'
import Drawer from './Drawer'
import Login from '../components/login'
import Profile from '../components/profile'
import React from 'react'
import Register from '../components/register'
import { createStackNavigator } from '@react-navigation/stack'

export type RootParamList = {
  Comments: undefined
  Drawer: undefined
  Login: undefined
  Profile: undefined
  Register: undefined
}

const { Navigator, Screen } = createStackNavigator<RootParamList>()

const Root = () => {
  return (
    <Navigator>
      <Screen name='Login' component={Login} />
      <Screen name='Register' component={Register} />
      <Screen name='Drawer' component={Drawer} />
      <Screen name='Comments' component={Comments} />
      <Screen name='Profile' component={Profile} />
    </Navigator>
  )
}

export default Root
