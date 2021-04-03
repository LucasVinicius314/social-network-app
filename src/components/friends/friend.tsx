import * as React from 'react'

import {
  Avatar,
  Divider,
  IconButton,
  List,
  Menu,
  TouchableRipple,
  useTheme,
} from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

import { Context } from '../../context/appcontext'
import { Models } from '../../typescript'

type Props = {
  friend: Models.Friend
  goToChat: () => void
  remove: (id: number) => void
  goToProfile: (id: number, name: string) => void
}

const Friend = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  const [menuOpen, setMenuOpen] = React.useState<boolean>(false)

  const goToProfile = () => {
    props.goToProfile(props.friend.user.id, props.friend.user.username)
  }

  const goToChat = () => {
    props.goToChat()
  }

  const remove = () => {
    props.remove(props.friend.id)
  }

  const openMenu = () => {
    setMenuOpen(true)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const avatarSize = 50

  const styles = StyleSheet.create({
    avatarWrapper: {
      borderRadius: avatarSize,
      height: avatarSize,
      width: avatarSize,
    },
  })

  return (
    <>
      <List.Item
        title={props.friend.user.username}
        description='Friend'
        left={() => (
          <View style={[styles.avatarWrapper, { overflow: 'hidden' }]}>
            <TouchableRipple onPress={goToProfile}>
              <Avatar.Image size={avatarSize} source={{}} />
            </TouchableRipple>
          </View>
        )}
        right={() => (
          <>
            <IconButton
              icon='message-text'
              onPress={goToChat}
              color={
                context.theme === 'light' ? colors.backdrop : colors.disabled
              }
            />
            <Menu
              visible={menuOpen}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon='dots-vertical'
                  onPress={openMenu}
                  color={
                    context.theme === 'light'
                      ? colors.backdrop
                      : colors.disabled
                  }
                />
              }>
              <Menu.Item onPress={remove} title='Remove friend' />
            </Menu>
          </>
        )}
      />
      <Divider inset />
    </>
  )
}

export default Friend
