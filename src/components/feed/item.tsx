import * as React from 'react'

import {
  Avatar,
  Button,
  Card,
  Headline,
  IconButton,
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
import { doGetPosts, doGetPostsComplete, doLogin } from '../../utils/requests'

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
            <IconButton
              color={
                context.theme === 'light' ? colors.backdrop : colors.disabled
              }
              size={size}
              icon='dots-vertical'
              onPress={() => {}}
            />
          )}
        />
        <Card.Content>
          <Paragraph>{props.post.content}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <IconButton
            color={
              context.theme === 'light' ? colors.backdrop : colors.disabled
            }
            icon='thumb-up-outline'
            onPress={() => {}}
          />
        </Card.Actions>
      </Card>
    </View>
  )
}
