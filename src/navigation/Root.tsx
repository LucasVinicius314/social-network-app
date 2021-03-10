import Login from '../components/login/index'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

export type RootParamList = {
  Login: undefined
}

const { Navigator, Screen } = createStackNavigator<RootParamList>()

const Root = () => {
  return (
    <Navigator>
      <Screen name='Login' component={Login} />
    </Navigator>
  )
}

export default Root
