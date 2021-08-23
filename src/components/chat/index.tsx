import * as React from 'react'

import {
  Caption,
  TextInput as PaperTextInput,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper'
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import { Models, Responses } from '../../typescript'
import {
  doCreateComment,
  doGetComments,
  doSendMessage,
} from '../../utils/requests'

import { ChatContext } from '../../context/chatcontext'
import { Context } from '../../context/appcontext'
import { LoadingIndicator } from '../LoadingIndicator'
import { MDTextInput } from '@suresure/react-native-components'
import { Message } from './message'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'

type Navigation = StackNavigationProp<RootParamList, 'Chat'>
type Route = RouteProp<RootParamList, 'Chat'>

export type Props = {
  navigation: Navigation
  route: Route
}

const Chat = (props: Props) => {
  const context = React.useContext(Context)
  const chatContext = React.useContext(ChatContext)
  const { colors } = useTheme()

  const [loaded, setLoaded] = React.useState<boolean>(true)
  const [content, setContent] = React.useState<string>('')
  const [lines, setLines] = React.useState<number>(1)

  const inputRef = React.useRef<TextInput>(null)

  const chat = chatContext.data.chats.find(
    (f) => f.id === props.route.params.id
  )

  const sendMessage = () => {
    if (content.length !== 0) {
      doSendMessage({ chatId: chat?.id || 0, content: content }, context.socket)
    }
  }

  const styles = StyleSheet.create({
    button: {
      marginBottom: 10,
    },
    message: {
      alignItems: 'center',
      paddingVertical: 50,
    },
    scrollView: {
      flex: 1,
      flexGrow: 1,
    },
    surface: {
      padding: 6,
      maxHeight: 100,
    },
    textInput: {
      marginBottom: 10,
    },
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingHorizontal: 5 }}>
        {chat?.messages.length === 0 && loaded && (
          <View style={styles.message}>
            <Caption>No messages found</Caption>
          </View>
        )}
        {chat?.messages.map((message) => (
          <Message
            chat={chat}
            key={message.id}
            message={message}
            route={props.route}
            navigation={props.navigation}
          />
        ))}
      </ScrollView>
      <Surface style={styles.surface}>
        <MDTextInput
          dense
          multiline
          value={content}
          numberOfLines={lines}
          onChangeText={setContent}
          textAlignVertical='center'
          // style={{ paddingTop: 10 }} // add experimental mode or fix text component internal position
          onSubmitEditing={sendMessage}
          placeholder={`Message ${chat?.user.username}`}
          right={
            <PaperTextInput.Icon
              name='send'
              onPress={sendMessage}
              forceTextInputFocus={false}
              disabled={content.length === 0}
              color={
                context.theme === 'light' ? colors.backdrop : colors.disabled
              }
            />
          }
        />
      </Surface>
      <LoadingIndicator visible={!loaded} />
    </SafeAreaView>
  )
}

export default Chat
