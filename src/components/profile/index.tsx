import * as React from 'react'

import {
  ActivityIndicator,
  Avatar,
  Button,
  Headline,
  Snackbar,
  Surface,
  Title,
  useTheme,
} from 'react-native-paper'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { KeyboardView, MDTextInput } from '@suresure/react-native-components'
import { Models, Requests, Responses } from '../../typescript'
import {
  doCreateChat,
  doGetChats,
  doGetProfile,
  doLogin,
} from '../../utils/requests'

import { AxiosResponse } from 'axios'
import { ChatContext } from '../../context/chatcontext'
import { Context } from '../../context/appcontext'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'
import { config } from '../../config'
import { doSendFriendRequest } from '../../utils/requests'
import { log } from '../../utils/log'

type Navigation = StackNavigationProp<RootParamList, 'Profile'>
type Route = RouteProp<RootParamList, 'Profile'>

type Props = {
  navigation: Navigation
  route: Route
}

const Profile = (props: Props) => {
  const context = React.useContext(Context)
  const chatContext = React.useContext(ChatContext)
  const { colors } = useTheme()

  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<Models.User | undefined>(undefined)
  const [snackbar, setSnackbar] = React.useState<string>('')

  React.useEffect(() => {
    const func = () => {
      doGetProfile({ id: props.route.params.id })
        .then(({ data, status }) => {
          if (status !== 200) {
            data = data as Responses.Base
            alert(data.message)
          } else {
            data = data as Models.User
            setUser(data)
          }
        })
        .finally(() => setLoaded(true))
    }
    func()
  }, [])

  const styles = StyleSheet.create({
    actionRow: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 20,
    },
    avatar: {
      marginBottom: 10,
    },
    background: {
      backgroundColor: colors.disabled,
      height: 100,
    },
    button: {
      marginBottom: 10,
    },
    headline: {
      paddingHorizontal: 10,
    },
    mainCol: {
      paddingHorizontal: 10,
    },
    surface: {
      height: '100%',
    },
    textInput: {
      marginBottom: 10,
    },
    wrapper: {
      position: 'relative',
      top: -45,
    },
  })

  const dismissSnackbar = () => {
    setSnackbar('')
  }

  const goToChat = () => {
    const chatFound = chatContext.data.chats.find(
      (f) => f.user.id === props.route.params.id
    )
    if (chatFound !== undefined) {
      props.navigation.navigate('Chat', { id: chatFound.id, name: undefined })
    } else {
      setLoaded(false)
      doCreateChat({ userId: props.route.params.id }).then(
        async ({ data, status }) => {
          if (status !== 200) {
            setSnackbar(data.message)
          } else {
            await doGetChats().then(({ data, status }) => {
              if (status !== 200) {
                data = data as Responses.Base
                alert(data.message)
              } else {
                data = data as Models.UserChat[]
                chatContext.methods?.setChats(data)
                props.navigation.navigate('Chat', {
                  id:
                    data.find((f) => f.user.id === props.route.params.id)?.id ||
                    0,
                  name: undefined,
                })
              }
            })
            setLoaded(true)
          }
        }
      )
    }
  }

  const sendFriendRequest = () => {
    doSendFriendRequest({ requesteeId: props.route.params.id }).then(
      ({ data, status }) => {
        if (status !== 200) {
        } else {
        }
        setSnackbar(data.message)
      }
    )
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <Surface style={styles.surface}>
        <ScrollView>
          <Image
            style={styles.background}
            source={{
              uri: `${config.CDN_URL}/${user?.coverPicture}`,
            }}
          />
          <Surface style={styles.mainCol}>
            <View style={styles.wrapper}>
              <Avatar.Image
                source={{
                  uri: `${config.CDN_URL}/${user?.profilePicture}`,
                }}
                size={90}
                style={styles.avatar}
              />
              {loaded ? (
                <Headline style={styles.headline}>{user?.username}</Headline>
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </Surface>
          {loaded && (
            <Surface style={styles.actionRow}>
              <Button
                onPress={sendFriendRequest}
                disabled={user?.id === context.user?.id}>
                Add
              </Button>
              <Button
                onPress={goToChat}
                disabled={user?.id === context.user?.id}>
                Message
              </Button>
            </Surface>
          )}
        </ScrollView>
      </Surface>
      <Snackbar
        visible={snackbar.length !== 0}
        onDismiss={dismissSnackbar}
        action={{
          label: 'Ok',
          onPress: dismissSnackbar,
        }}>
        {snackbar}
      </Snackbar>
    </SafeAreaView>
  )
}

export default Profile
