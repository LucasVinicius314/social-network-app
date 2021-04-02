import Drawer, { DrawerParamList } from './Drawer'

import Account from '../components/account'
import { Appbar } from 'react-native-paper'
import Comments from '../components/comments'
import { Context } from '../context/appcontext'
import { DrawerActions } from '@react-navigation/native'
import Login from '../components/login'
import Profile from '../components/profile'
import React from 'react'
import Register from '../components/register'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/core'
import { useTheme } from 'react-native-paper'

export type RootParamList = {
  Account: undefined
  Comments: undefined
  Drawer: undefined
  Login: undefined
  Profile: undefined
  Register: undefined
}

const resolveRouteName = (route: keyof (DrawerParamList & RootParamList)) => {
  switch (route) {
    case 'Account':
      return 'Edit Profile'
    case 'Comments':
      return 'Comments'
    case 'Drawer':
      return 'Home'
    case 'Friends':
      return 'Friends'
    case 'Login':
      return 'Login'
    case 'Profile':
      return 'Profile'
    case 'Register':
      return 'Register'
    case 'Settings':
      return 'Settings'
    case 'Tabs':
      return 'Home'
    default:
      return undefined
  }
}

const { Navigator, Screen } = createStackNavigator<RootParamList>()

const Root = () => {
  const context = React.useContext(Context)
  return (
    <Navigator
      screenOptions={(props) => ({
        header: (headerProps) => {
          const name = getFocusedRouteNameFromRoute(
            props.route
          ) as keyof (DrawerParamList & RootParamList)
          return (
            <Appbar theme={useTheme()}>
              {props.route.name === 'Drawer' && (
                <Appbar.Action
                  icon='menu'
                  onPress={() =>
                    headerProps.navigation.dispatch(DrawerActions.toggleDrawer)
                  }
                />
              )}
              {headerProps.navigation.canGoBack() && (
                <Appbar.BackAction onPress={headerProps.navigation.goBack} />
              )}
              <Appbar.Content
                title={resolveRouteName(name || props.route.name) || 'Home'}
              />
            </Appbar>
          )
        },
      })}>
      {context.logged ? (
        <>
          <Screen name='Drawer' component={Drawer} />
          <Screen name='Comments' component={Comments} />
          <Screen name='Profile' component={Profile} />
          <Screen name='Account' component={Account} />
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
