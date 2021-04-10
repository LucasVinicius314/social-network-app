import * as React from 'react'

import {
  Avatar,
  Caption,
  Divider,
  IconButton,
  List,
  Menu,
  Paragraph,
  useTheme,
} from 'react-native-paper'
import { Models, Responses } from '../../typescript'
import { StyleSheet, View } from 'react-native'

import { Context } from '../../context/appcontext'
import { Props as ParentProps } from '.'
import { config } from '../../config'
import { doDeleteComment } from '../../utils/requests'

type Props = ParentProps & {
  comment: Models.UserComment
  getComments: () => void
}

export const Comment = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  const [menuOpen, setMenuOpen] = React.useState<boolean>(false)

  const openMenu = () => {
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const deleteComment = () => {
    doDeleteComment({ id: props.comment.id })
      .then(({ data, status }) => {
        if (status !== 200) {
          data = data as Responses.Base
          alert(data.message)
        } else {
        }
      })
      .finally(props.getComments)
  }

  const styles = StyleSheet.create({
    view: {
      alignItems: 'flex-end',
      paddingHorizontal: 18,
    },
  })

  return (
    <View>
      <List.Item
        title={props.comment.user.username}
        description={props.comment.content}
        left={() => (
          <Avatar.Image
            size={50}
            source={{
              uri: `${config.CDN_URL}${props.comment.user.profilePicture}`,
            }}
          />
        )}
        right={() => (
          <Menu
            visible={menuOpen}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                onPress={openMenu}
                icon='dots-vertical'
                color={
                  context.theme === 'light' ? colors.backdrop : colors.disabled
                }
              />
            }>
            {props.comment.user.id === context.user?.id && (
              <Menu.Item onPress={() => {}} title='Edit comment' />
            )}
            {props.comment.user.id === context.user?.id && (
              <Menu.Item onPress={deleteComment} title='Delete comment' />
            )}
            {props.comment.user.id !== context.user?.id && (
              <Menu.Item onPress={() => {}} title='...' />
            )}
          </Menu>
        )}
      />
      <View style={styles.view}>
        <Caption>{new Date(props.comment.createdAt).toLocaleString()}</Caption>
      </View>
      <Divider inset />
    </View>
  )
}
