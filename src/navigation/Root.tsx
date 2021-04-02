import Drawer, { DrawerParamList } from './Drawer'
import { RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/core'

import { Appbar } from 'react-native-paper'
import Comments from '../components/comments'
import { Context } from '../context/appcontext'
import { DrawerActions } from '@react-navigation/native'
import Login from '../components/login'
import Profile from '../components/profile'
import React from 'react'
import Register from '../components/register'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'react-native-paper'

export type RootParamList = {
  Comments: undefined
  Drawer: undefined
  Login: undefined
  Profile: undefined
  Register: undefined
}

const resolveRouteName = (
  route: RouteProp<RootParamList, keyof RootParamList>
) => {
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
    <Navigator
      screenOptions={(props) => ({
        header: (headerProps) => (
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
            <Appbar.Content title={resolveRouteName(props.route)} />
          </Appbar>
        ),
      })}>
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
