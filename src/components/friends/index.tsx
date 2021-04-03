import * as React from 'react'

import {
  Avatar,
  Button,
  Caption,
  Divider,
  Headline,
  IconButton,
  List,
  Snackbar,
  Surface,
  TouchableRipple,
  useTheme,
} from 'react-native-paper'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { Models, Requests, Responses } from '../../typescript'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import {
  doAcceptRequest,
  doCancelRequest,
  doGetFriends,
  doGetPending,
  doGetSent,
  doRejectRequest,
} from '../../utils/requests'

import { AxiosResponse } from 'axios'
import { Context } from '../../context/appcontext'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from '../../navigation/Drawer'
import { RootParamList } from '../../navigation/Root'
import { StackNavigationProp } from '@react-navigation/stack'
import { log } from '../../utils/log'

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList, 'Friends'>,
  StackNavigationProp<RootParamList>
>
type Route = RouteProp<DrawerParamList, 'Friends'>

type Props = {
  navigation: Navigation
  route: Route
}

const Friends = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  const [refreshing, setRefreshing] = React.useState<boolean>(false)
  const [snackbar, setSnackbar] = React.useState<string>('')
  const [sent, setSent] = React.useState<Models.FriendRequest[]>([])
  const [pending, setPending] = React.useState<Models.FriendRequest[]>([])
  const [friends, setFriends] = React.useState<Models.Friend[]>([])

  React.useEffect(() => {
    const func = () => {
      getPending()
      getSent()
      getFriends()
    }
    const unsub = props.navigation.addListener('focus', ({}) => {
      getPending()
      getSent()
      getFriends()
    })
    func()
    return unsub
  }, [])

  const getPending = () => {
    doGetPending().then(({ data, status }) => {
      if (status !== 200) {
        data = data as Responses.Base
        setSnackbar(data.message)
      } else {
        data = data as Models.FriendRequest[]
        setPending(data)
      }
    })
  }

  const getSent = () => {
    doGetSent()
      .then(({ data, status }) => {
        if (status !== 200) {
          data = data as Responses.Base
          setSnackbar(data.message)
        } else {
          data = data as Models.FriendRequest[]
          setSent(data)
        }
      })
      .finally(() => setRefreshing(false))
  }

  const getFriends = () => {
    doGetFriends()
      .then(({ data, status }) => {
        if (status !== 200) {
          data = data as Responses.Base
          setSnackbar(data.message)
        } else {
          data = data as Models.Friend[]
          setFriends(data)
        }
      })
      .finally(() => setRefreshing(false))
  }

  const cancel = (id: number) => {
    doCancelRequest({ id })
      .then(({ data, status }) => {
        setSnackbar(data.message)
      })
      .finally(getSent)
  }

  const reject = (id: number) => {
    doRejectRequest({ id })
      .then(({ data, status }) => {
        setSnackbar(data.message)
      })
      .finally(getPending)
  }

  const accept = (id: number) => {
    doAcceptRequest({ id })
      .then(({ data, status }) => {
        setSnackbar(data.message)
      })
      .finally(getPending)
  }

  const refresh = () => {
    setRefreshing(true)
    getPending()
    getSent()
    getFriends()
  }

  const dismissSnackbar = () => {
    setSnackbar('')
  }

  const goToChat = () => {
    props.navigation.navigate('Chat')
  }

  const goToProfile = (id: number, name: string) => {
    props.navigation.navigate('Profile', { id, name })
  }

  const [index, setIndex] = React.useState<number>(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Friends' },
    { key: 'second', title: 'Pending' },
    { key: 'third', title: 'Sent' },
  ])

  const FriendsList = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }>
          {friends.length === 0 && (
            <View style={styles.view}>
              <Caption>The friends list is empty</Caption>
            </View>
          )}
          {friends.map((friend) => (
            <React.Fragment key={friend.id}>
              <List.Item
                title={friend.user.username}
                description='Friend'
                left={() => (
                  <View
                    style={{
                      borderRadius: 50,
                      height: 50,
                      overflow: 'hidden',
                      width: 50,
                    }}>
                    <TouchableRipple
                      onPress={() =>
                        goToProfile(friend.user.id, friend.user.username)
                      }>
                      <Avatar.Image size={50} source={{}} />
                    </TouchableRipple>
                  </View>
                )}
                right={() => (
                  <>
                    <IconButton
                      icon='message-text'
                      onPress={() => goToChat()}
                      color={
                        context.theme === 'light'
                          ? colors.backdrop
                          : colors.disabled
                      }
                    />
                    <IconButton
                      icon='dots-vertical'
                      onPress={() => {}}
                      color={
                        context.theme === 'light'
                          ? colors.backdrop
                          : colors.disabled
                      }
                    />
                  </>
                )}
              />
              <Divider inset />
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    )
  }

  const PendingList = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }>
          {pending.length === 0 && (
            <View style={styles.view}>
              <Caption>There are no pending requests</Caption>
            </View>
          )}
          {pending.map((request) => (
            <React.Fragment key={request.id}>
              <List.Item
                title={request.requesterUser.username}
                description='Incoming friend request'
                left={() => <Avatar.Image size={50} source={{}} />}
                right={() => (
                  <>
                    <IconButton
                      icon='check'
                      onPress={() => accept(request.id)}
                      color={
                        context.theme === 'light'
                          ? colors.backdrop
                          : colors.disabled
                      }
                    />
                    <IconButton
                      icon='close'
                      onPress={() => reject(request.id)}
                      color={
                        context.theme === 'light'
                          ? colors.backdrop
                          : colors.disabled
                      }
                    />
                  </>
                )}
              />
              <Divider inset />
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    )
  }

  const SentList = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }>
          {sent.length === 0 && (
            <View style={styles.view}>
              <Caption>There are no sent requests</Caption>
            </View>
          )}
          {sent.map((request) => (
            <React.Fragment key={request.id}>
              <List.Item
                title={request.requesteeUser.username}
                description='Outgoing friend request'
                left={() => <Avatar.Image size={50} source={{}} />}
                right={() => (
                  <IconButton
                    icon='close'
                    onPress={() => cancel(request.id)}
                    color={
                      context.theme === 'light'
                        ? colors.backdrop
                        : colors.disabled
                    }
                  />
                )}
              />
              <Divider inset />
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    )
  }

  const renderScene = SceneMap({
    first: FriendsList,
    second: PendingList,
    third: SentList,
  })

  return (
    <SafeAreaView>
      <StatusBar />
      <Surface style={styles.surface}>
        <TabView
          lazy={false}
          tabBarPosition='top'
          lazyPreloadDistance={2}
          onIndexChange={() => {}}
          renderScene={renderScene}
          navigationState={{ index, routes }}
          renderLazyPlaceholder={() => null}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: colors.accent }}
              style={{
                backgroundColor:
                  context.theme === 'light' ? colors.primary : colors.surface,
              }}
            />
          )}
        />
        <Snackbar
          visible={snackbar.length !== 0}
          onDismiss={dismissSnackbar}
          action={{
            label: 'Ok',
            onPress: dismissSnackbar,
          }}>
          {snackbar}
        </Snackbar>
      </Surface>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  surface: {
    height: '100%',
    width: '100%',
  },
  textInput: {
    marginBottom: 10,
  },
  view: {
    alignItems: 'center',
    paddingVertical: 90,
  },
})

export default Friends
