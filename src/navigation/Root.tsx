import Drawer, { DrawerParamList } from './Drawer'
import { RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/core'

import Comments from '../components/comments'
import { Context } from '../context/appcontext'
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

const resolveRouteName = (route: RouteProp<RootParamList, 'Drawer'>) => {
  const _route = getFocusedRouteNameFromRoute(route) as keyof DrawerParamList
  switch (_route) {
    case 'Friends':
      return 'Friends'
    case 'Settings':
      return 'Settings'
    case 'Tabs':
    default:
      return 'Home'
  }
}

const { Navigator, Screen } = createStackNavigator<RootParamList>()

const Root = () => {
  const context = React.useContext(Context)
  return (
    <Navigator>
      {context.logged ? (
        <>
          <Screen
            name='Drawer'
            component={Drawer}
            options={({ route }) => ({
              headerTitle: resolveRouteName(route),
            })}
          />
          <Screen name='Comments' component={Comments} />
          <Screen name='Profile' component={Profile} />
        </>
      ) : (
        <>
          <Screen name='Login' component={Login} />
          <Screen name='Register' component={Register} />
        </>
      )}
    </Navigator>
  )
}

export default Root
