import * as React from 'react'

import {
  Avatar,
  Button,
  Card,
  Headline,
  IconButton,
  Paragraph,
  Surface,
  useTheme,
} from 'react-native-paper'
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { Models, Requests, Responses } from '../../typescript'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { doGetPosts, doGetPostsComplete, doLogin } from '../../utils/requests'

import { AxiosResponse } from 'axios'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Context } from '../../context/appcontext'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { TabsParamList } from '../../navigation/Tabs'
import { log } from '../../utils/log'

type Navigation = BottomTabNavigationProp<TabsParamList, 'Feed'>
type Route = RouteProp<TabsParamList, 'Feed'>

type Props = Models.Post & {
  // navigation: Navigation
  // route: Route
  userId: number
  user: Models.User
}

export const Item = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  return (
    <View style={styles.wrapper}>
      <Card>
        <Card.Title
          title={props.user.username}
          subtitle={new Date(props.createdAt).toLocaleString()}
          left={({ size }) => <Avatar.Image source={{}} size={size} />}
          right={({ size }) => (
            <IconButton
              color={colors.backdrop}
              size={size}
              icon='dots-vertical'
              onPress={() => {}}
            />
          )}
        />
        <Card.Content>
          <Paragraph>{props.content}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <IconButton
            color={colors.backdrop}
            icon='thumb-up-outline'
            onPress={() => {}}
          />
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row-reverse',
  },
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
  wrapper: {
    paddingBottom: 10,
  },
})
