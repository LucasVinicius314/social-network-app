import Login from '../components/login'
import React from 'react'
import Register from '../components/register'
import { createStackNavigator } from '@react-navigation/stack'

export type RootParamList = {
  Login: undefined
  Register: undefined
}

const { Navigator, Screen } = createStackNavigator<RootParamList>()

const Root = () => {
  return (
    <Navigator>
      <Screen name='Login' component={Login} />
      <Screen name='Register' component={Register} />
    </Navigator>
  )
}

export default Root
