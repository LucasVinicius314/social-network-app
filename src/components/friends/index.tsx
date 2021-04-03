import * as React from 'react'

import { Button, Headline, Surface, useTheme } from 'react-native-paper'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { Requests, Responses } from '../../typescript'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'

import { AxiosResponse } from 'axios'
import { Context } from '../../context/appcontext'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from '../../navigation/Drawer'
import { RootParamList } from '../../navigation/Root'
import { StackNavigationProp } from '@react-navigation/stack'
import { color } from 'react-native-reanimated'
import { doLogin } from '../../utils/requests'
import { log } from '../../utils/log'

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'Friends'>,
  StackNavigationProp<RootParamList>
>
type Route = RouteProp<DrawerParamList, 'Friends'>

type Props = {
  navigation: Navigation
  route: Route
}

const FriendsList = () => <View style={{ flex: 1 }} />

const PendingList = () => <View style={{ flex: 1 }} />

const Friends = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  const goToCreateAccount = () => {
    props.navigation.navigate('Register')
  }

  const [index, setIndex] = React.useState<number>(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Friends' },
    { key: 'second', title: 'Pending' },
  ])

  const renderScene = SceneMap({
    first: FriendsList,
    second: PendingList,
  })

  return (
    <SafeAreaView>
      <StatusBar />
      <Surface style={styles.surface}>
        {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
        {/* <KeyboardView> */}
        <TabView
          lazy={false}
          tabBarPosition='top'
          lazyPreloadDistance={2}
          onIndexChange={() => {}}
          renderScene={renderScene}
          navigationState={{ index, routes }}
          renderLazyPlaceholder={() => null}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: colors.accent }}
              style={{
                backgroundColor:
                  context.theme === 'light' ? colors.primary : colors.surface,
              }}
            />
          )}
        />
        {/* </KeyboardView> */}
        {/* </ScrollView> */}
      </Surface>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    height: 400,
  },
  textInput: {
    marginBottom: 10,
  },
  surface: {
    height: '100%',
    width: '100%',
  },
  button: {
    marginBottom: 10,
  },
})

export default Friends
