import * as React from 'react'

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { SafeAreaView, ScrollView } from 'react-native'
import { Surface, useTheme } from 'react-native-paper'

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Chat } from './chat'
import { ChatContext } from '../../context/chatcontext'
import { Context } from '../../context/appcontext'
import { RootParamList } from '../../navigation/Root'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'
import { TabsParamList } from '../../navigation/Tabs'

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, 'Chats'>,
  StackNavigationProp<RootParamList>
>
type Route = RouteProp<TabsParamList, 'Chats'>

export type Props = {
  navigation: Navigation
  route: Route
}

const Chats = (props: Props) => {
  const context = React.useContext(Context)
  const chatContext = React.useContext(ChatContext)
  const { colors } = useTheme()

  React.useEffect(() => {
    const unsub = props.navigation.addListener('focus', () => {
      context.app?.setSelectedTab('Chats')
    })
    return unsub
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Surface style={{ flex: 1 }}>
        <ScrollView>
          {chatContext.data.chats.map((chat) => (
            <Chat
              chat={chat}
              key={chat.id}
              route={props.route}
              navigation={props.navigation}
            />
          ))}
        </ScrollView>
      </Surface>
    </SafeAreaView>
  )
}

export default Chats
