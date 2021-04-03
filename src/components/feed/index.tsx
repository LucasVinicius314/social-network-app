import * as React from 'react'

import { Button, Headline, Surface, useTheme } from 'react-native-paper'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { KeyboardView, MDTextInput } from '@suresure/react-native-components'
import { Models, Requests, Responses } from '../../typescript'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { doGetPosts, doGetPostsComplete, doLogin } from '../../utils/requests'

import { AxiosResponse } from 'axios'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Context } from '../../context/appcontext'
import { Item } from './item'
import { RootParamList } from '../../navigation/Root'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'
import { TabsParamList } from '../../navigation/Tabs'
import { log } from '../../utils/log'

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, 'Feed'>,
  StackNavigationProp<RootParamList>
>
type Route = RouteProp<TabsParamList, 'Feed'>

export type Props = {
  navigation: Navigation
  route: Route
}

const Feed = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  React.useEffect(() => {
    const func = () => {
      doGetPostsComplete(context)
    }
    const unsub = props.navigation.addListener('focus', () => {
      context.app?.setSelectedTab('Feed')
    })
    context.app?.setSelectedTab('Feed')
    func()
    return unsub
  }, [])

  return (
    <SafeAreaView>
      <StatusBar />
      <KeyboardView>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {context.posts.map((post) => (
            <Item {...props} key={post.id} post={post} />
          ))}
        </ScrollView>
      </KeyboardView>
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
    backgroundColor: 'transparent',
  },
  textInput: {
    marginBottom: 10,
  },
})

export default Feed
