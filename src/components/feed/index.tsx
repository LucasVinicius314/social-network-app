import * as React from 'react'

import { Button, Headline, Surface, useTheme } from 'react-native-paper'
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { Requests, Responses } from '../../typescript'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'

import { AxiosResponse } from 'axios'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Context } from '../../context/appcontext'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { TabsParamList } from '../../navigation/Tabs'
import { doLogin } from '../../utils/requests'
import { log } from '../../utils/log'

type Navigation = BottomTabNavigationProp<TabsParamList, 'Feed'>
type Route = RouteProp<TabsParamList, 'Feed'>

type Props = {
  navigation: Navigation
  route: Route
}

const Feed = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  React.useEffect(() => {
    const unsub = props.navigation.addListener('focus', () => {
      context.app?.setSelectedTab('Feed')
    })
    return unsub
  })

  return (
    <SafeAreaView>
      <StatusBar />
      <Surface style={styles.surface}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <KeyboardView>
            <View />
          </KeyboardView>
        </ScrollView>
      </Surface>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  surface: {
    height: '100%',
  },
  textInput: {
    marginBottom: 10,
  },
})

export default Feed
