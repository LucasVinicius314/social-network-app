import * as React from 'react'

import {
  Avatar,
  Button,
  Caption,
  Card,
  Headline,
  IconButton,
  Menu,
  Paragraph,
  Surface,
  TouchableRipple,
  useTheme,
} from 'react-native-paper'
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { Models, Requests, Responses } from '../../typescript'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import {
  doGetPosts,
  doGetPostsComplete,
  doLikePost,
  doLogin,
  doUnLikePost,
} from '../../utils/requests'

import { AxiosResponse } from 'axios'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Context } from '../../context/appcontext'
import { Props as ParentProps } from '.'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { TabsParamList } from '../../navigation/Tabs'
import { config } from '../../config'
import { log } from '../../utils/log'

type Props = ParentProps & {
  post: Models.UserPost
}

export const Item = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  const [menuOpen, setMenuOpen] = React.useState<boolean>(false)

  const [liked, setLiked] = React.useState<0 | 1>(props.post.liked)

  const [likeDisabled, setLikeDisabled] = React.useState<boolean>(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const openMenu = () => {
    setMenuOpen(true)
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

  const goToProfile = () => {
    props.navigation.navigate('Profile', {
      id: props.post.user.id,
      name: props.post.user.username,
    })
  }

  const toggleLike = () => {
    setLikeDisabled(true)
    if (liked === 1) {
      setLiked(0)
      doUnLikePost({ id: props.post.id }).finally(() => setLikeDisabled(false))
    } else {
      setLiked(1)
      doLikePost({ id: props.post.id }).finally(() => setLikeDisabled(false))
    }
  }

  const likeCount =
    props.post.likeCount + (props.post.liked === 0 ? liked : liked - 1)

  return (
    <View style={styles.wrapper}>
      <Card>
        <Card.Title
          title={props.post.user.username}
          subtitle={new Date(props.post.createdAt).toLocaleString()}
          left={({ size }) => (
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size,
                overflow: 'hidden',
              }}>
              <TouchableRipple onPress={goToProfile}>
                <Avatar.Image
                  source={{
                    uri: `${config.CDN_URL}/${props.post.user?.profilePicture}`,
                  }}
                  size={size}
                />
              </TouchableRipple>
            </View>
          )}
          right={({ size }) => (
            <Menu
              visible={menuOpen}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  color={
                    context.theme === 'light'
                      ? colors.backdrop
                      : colors.disabled
                  }
                  size={size}
                  icon='dots-vertical'
                  onPress={openMenu}
                />
              }>
              <Menu.Item onPress={() => {}} title='...' />
            </Menu>
          )}
        />
        <Card.Content>
          <Paragraph>{props.post.content}</Paragraph>
        </Card.Content>
        <Card.Content style={{ alignItems: 'flex-end' }}>
          <Caption>
            {likeCount} like{likeCount !== 1 && 's'}
          </Caption>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <IconButton
            onPress={toggleLike}
            disabled={likeDisabled}
            icon={liked === 1 ? 'thumb-up' : 'thumb-up-outline'}
            color={
              liked === 1
                ? colors.primary
                : context.theme === 'light'
                ? colors.backdrop
                : colors.disabled
            }
          />
        </Card.Actions>
      </Card>
    </View>
  )
}
