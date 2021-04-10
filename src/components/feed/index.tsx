import * as React from 'react'

import {
  Button,
  Caption,
  Headline,
  Surface,
  useTheme,
} from 'react-native-paper'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { KeyboardView, MDTextInput } from '@suresure/react-native-components'
import { Models, Requests, Responses } from '../../typescript'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { doGetPostsComplete, doLogin } from '../../utils/requests'

import { AxiosResponse } from 'axios'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Context } from '../../context/appcontext'
import { Item } from './item'
import { LoadingIndicator } from '../LoadingIndicator'
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

  const [loaded, setLoaded] = React.useState<boolean>(false)

  React.useEffect(() => {
    setLoaded(false)
    const func = () => {
      if (context.user !== undefined) {
        doGetPostsComplete(context).finally(() => setLoaded(true))
      }
    }
    const unsub = props.navigation.addListener('focus', () => {
      context.app?.setSelectedTab('Feed')
    })
    context.app?.setSelectedTab('Feed')
    func()
    return unsub
  }, [context.user])

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {context.posts.length === 0 && loaded && (
          <View style={styles.message}>
            <Caption>No posts found</Caption>
          </View>
        )}
        {context.posts.map((post) => (
          <Item {...props} key={post.id} post={post} />
        ))}
      </ScrollView>
      <LoadingIndicator visible={!loaded} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  message: {
    paddingVertical: 60,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
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
