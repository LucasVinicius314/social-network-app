import * as React from 'react'

import { Button, Headline, Surface, useTheme } from 'react-native-paper'
import { KeyboardView, MDTextInput } from '@suresure/react-native-components'
import { Requests, Responses } from '../../typescript'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'

import { AxiosResponse } from 'axios'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Context } from '../../context/appcontext'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'
import { TabsParamList } from '../../navigation/Tabs'
import { doLogin } from '../../utils/requests'
import { log } from '../../utils/log'

type Navigation = BottomTabNavigationProp<TabsParamList, 'Explore'>
type Route = RouteProp<TabsParamList, 'Explore'>

type Props = {
  navigation: Navigation
  route: Route
}

const Explore = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  React.useEffect(() => {
    const unsub = props.navigation.addListener('focus', () => {
      context.app?.setSelectedTab('Explore')
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

export default Explore
