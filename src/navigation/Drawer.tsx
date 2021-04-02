import {
  Avatar,
  Button,
  Caption,
  Divider,
  List,
  Surface,
  Title,
  TouchableRipple,
  useTheme,
} from 'react-native-paper'
import {
  DrawerDescriptor,
  DrawerDescriptorMap,
} from '@react-navigation/drawer/lib/typescript/src/types'
import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

import { Context } from '../context/appcontext'
import Friends from '../components/friends'
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

const resolveDescriptor = (descriptorMap: DrawerDescriptorMap, key: string) => {
  const descriptors = Object.entries(
    descriptorMap
  ).map(([key, descriptor]) => ({ ...descriptor, key }))
  const descriptor = descriptors.find((descriptor) => descriptor.key === key)
  return descriptor as DrawerDescriptor
}

const resolveIcon = (name: keyof DrawerParamList) => {
  switch (name) {
    case 'Friends':
      return <List.Icon icon='account-multiple' />
    case 'Settings':
      return <List.Icon icon='cog' />
    case 'Tabs':
      return <List.Icon icon='home' />
    default:
      return <List.Icon icon='help' />
  }
}

const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>()

const Drawer = (props: Props) => {
  const { colors } = useTheme()

  const context = React.useContext(Context)

  const goToAccount = () => {
    props.navigation.navigate('Account')
  }

  const styles = StyleSheet.create({
    button: {
      alignSelf: 'flex-end',
    },
    buttonWrapper: {
      flexGrow: 1,
      padding: 5,
    },
    light: {
      backgroundColor: colors.background,
    },
    mainWrapper: {
      flexDirection: 'row',
    },
    surface: {
      paddingLeft: 10,
      paddingTop: 10,
    },
    wrapper: {
      flexGrow: 1,
      paddingHorizontal: 10,
      paddingTop: 5,
    },
  })

  return (
    <Navigator
      drawerContent={(props) => (
        <>
          <Surface
            style={[styles.surface, context.theme === 'light' && styles.light]}>
            <View style={styles.mainWrapper}>
              <Avatar.Image source={{}} />
              <View style={styles.wrapper}>
                <Title>User</Title>
                <Caption>user@gmail.com</Caption>
              </View>
            </View>
            <View style={styles.buttonWrapper}>
              <Button onPress={goToAccount} style={styles.button}>
                Edit Profile
              </Button>
            </View>
          </Surface>
          {props.state.routes.map((route) => {
            const descriptor = resolveDescriptor(props.descriptors, route.key)
            const drawerLabel = descriptor.options.drawerLabel
            return (
              <Fragment key={route.key}>
                {drawerLabel === 'Settings' && <Divider />}
                <TouchableRipple
                  onPress={() => props.navigation.navigate(route.name)}>
                  <List.Item
                    title={drawerLabel}
                    left={() =>
                      resolveIcon(route.name as keyof DrawerParamList)
                    }
                  />
                </TouchableRipple>
              </Fragment>
            )
          })}
        </>
      )}>
      <Screen name='Tabs' component={Tabs} options={{ drawerLabel: 'Home' }} />
      <Screen
        name='Friends'
        component={Friends}
        options={{ drawerLabel: 'Friends' }}
      />
      <Screen
        name='Settings'
        component={Settings}
        options={{ drawerLabel: 'Settings' }}
      />
    </Navigator>
  )
}

export default Drawer
