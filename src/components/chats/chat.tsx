import * as React from 'react'

import {
  Avatar,
  Divider,
  List,
  TouchableRipple,
  useTheme,
} from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

import { ChatContext } from '../../context/chatcontext'
import { Context } from '../../context/appcontext'
import { Models } from '../../typescript'
import { Props as ParentProps } from '.'
import { config } from '../../config'

type Props = ParentProps & {
  chat: Models.UserChat
}

export const Chat = (props: Props) => {
  const context = React.useContext(Context)
  const chatContext = React.useContext(ChatContext)
  const { colors } = useTheme()

  const goToChat = () => {
    props.navigation.navigate('Chat', { id: props.chat.id, name: undefined })
  }

  const styles = StyleSheet.create({})

  return (
    <>
      <TouchableRipple onPress={goToChat}>
        <List.Item
          title={props.chat.user.username}
          left={() => (
            <Avatar.Image
              size={50}
              source={{
                uri: `${config.CDN_URL}${props.chat.user.profilePicture}`,
              }}
            />
          )}
        />
      </TouchableRipple>
      <Divider inset />
    </>
  )
}
