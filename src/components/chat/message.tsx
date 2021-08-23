import * as React from 'react'

import { Caption, Surface, Text, useTheme } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

import { ChatContext } from '../../context/chatcontext'
import { Context } from '../../context/appcontext'
import { Models } from '../../typescript'
import { Props as ParentProps } from '.'

type Props = ParentProps & {
  chat: Models.UserChat
  message: Models.Message
}

export const Message = (props: Props) => {
  const context = React.useContext(Context)
  const chatContext = React.useContext(ChatContext)
  const { colors } = useTheme()

  const message = props.message
  const chat = props.chat

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

  if (message.userId === context.user?.id) {
    return (
      <Surface
        style={{
          alignSelf: 'flex-end',
          padding: 5,
          minWidth: '20%',
          borderRadius: 10,
          backgroundColor: colors.primary,
          marginTop: 5,
        }}>
        <Text style={{ color: colors.surface }}>{message.content}</Text>
      </Surface>
    )
  } else {
    return (
      <Surface
        style={{
          marginTop: 5,
          alignSelf: 'flex-start',
          padding: 5,
          minWidth: '20%',
          borderRadius: 10,
        }}>
        <Caption>{chat.user.username}</Caption>
        <Text>{message.content}</Text>
      </Surface>
    )
  }
}
