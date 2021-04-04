import * as React from 'react'

import {
  ActivityIndicator,
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
import { KeyboardView, MDTextInput } from '@suresure/react-native-components'
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
  doRemoveFriend,
} from '../../utils/requests'

import { AxiosResponse } from 'axios'
import { Context } from '../../context/appcontext'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from '../../navigation/Drawer'
import Friend from './friend'
import { RootParamList } from '../../navigation/Root'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'
import { config } from '../../config'
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
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [snackbar, setSnackbar] = React.useState<string>('')
  const [sent, setSent] = React.useState<Models.FriendRequest[]>([])
  const [pending, setPending] = React.useState<Models.FriendRequest[]>([])
  const [friends, setFriends] = React.useState<Models.Friend[]>([])

  React.useEffect(() => {
    const unsub = props.navigation.addListener('focus', ({}) => {
      getAll()
    })
    getAll()
    return unsub
  }, [])

  const getAll = async () => {
    return await Promise.all([getPending(), getSent(), getFriends()])
      .then(([_pending, _sent, _friends]) => {
        setPending(_pending || [])
        setSent(_sent || [])
        setFriends(_friends || [])
      })
      .finally(() => {
        setLoaded(true)
        setRefreshing(false)
      })
  }

  const getPending = async () => {
    return await doGetPending().then(({ data, status }) => {
      if (status !== 200) {
        data = data as Responses.Base
        setSnackbar(data.message)
      } else {
        return data as Models.FriendRequest[]
      }
    })
  }

  const getSent = async () => {
    return await doGetSent()
      .then(({ data, status }) => {
        if (status !== 200) {
          data = data as Responses.Base
          setSnackbar(data.message)
        } else {
          return data as Models.FriendRequest[]
        }
      })
      .finally(() => setRefreshing(false))
  }

  const getFriends = async () => {
    return await doGetFriends()
      .then(({ data, status }) => {
        if (status !== 200) {
          data = data as Responses.Base
          setSnackbar(data.message)
        } else {
          return data as Models.Friend[]
        }
      })
      .finally(() => setRefreshing(false))
  }

  const cancel = (id: number) => {
    doCancelRequest({ id })
      .then(({ data, status }) => {
        setSnackbar(data.message)
      })
      .finally(getAll)
  }

  const remove = (id: number) => {
    doRemoveFriend({ id })
      .then(({ data, status }) => {
        setSnackbar(data.message)
      })
      .finally(getAll)
  }

  const reject = (id: number) => {
    doRejectRequest({ id })
      .then(({ data, status }) => {
        setSnackbar(data.message)
      })
      .finally(getAll)
  }

  const accept = (id: number) => {
    doAcceptRequest({ id })
      .then(({ data, status }) => {
        setSnackbar(data.message)
      })
      .finally(getAll)
  }

  const refresh = () => {
    setRefreshing(true)
    getAll()
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
          {loaded ? (
            <>
              {friends.length === 0 && (
                <View style={styles.view}>
                  <Caption>The friends list is empty</Caption>
                </View>
              )}
              {friends.map((friend) => (
                <Friend
                  key={friend.id}
                  friend={friend}
                  remove={remove}
                  goToChat={goToChat}
                  goToProfile={goToProfile}
                />
              ))}
            </>
          ) : (
            <View style={styles.view}>
              <ActivityIndicator />
            </View>
          )}
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
          {loaded ? (
            <>
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
                            goToProfile(
                              request.requesterUser.id,
                              request.requesterUser.username
                            )
                          }>
                          <Avatar.Image
                            size={50}
                            source={{
                              uri: `${config.CDN_URL}/${request.requesterUser.profilePicture}`,
                            }}
                          />
                        </TouchableRipple>
                      </View>
                    )}
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
            </>
          ) : (
            <View style={styles.view}>
              <ActivityIndicator />
            </View>
          )}
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
          {loaded ? (
            <>
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
                            goToProfile(
                              request.requesteeUser.id,
                              request.requesteeUser.username
                            )
                          }>
                          <Avatar.Image
                            size={50}
                            source={{
                              uri: `${config.CDN_URL}/${request.requesteeUser.profilePicture}`,
                            }}
                          />
                        </TouchableRipple>
                      </View>
                    )}
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
            </>
          ) : (
            <View style={styles.view}>
              <ActivityIndicator />
            </View>
          )}
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
