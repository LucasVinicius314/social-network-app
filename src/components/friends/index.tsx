import * as React from 'react'

import {
  Avatar,
  Button,
  Divider,
  Headline,
  IconButton,
  List,
  Surface,
  useTheme,
} from 'react-native-paper'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { Models, Requests, Responses } from '../../typescript'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { doGetPending, doGetSent } from '../../utils/requests'

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

  const [sent, setSent] = React.useState<Models.FriendRequest[]>([])
  const [pending, setPending] = React.useState<Models.FriendRequest[]>([])

  React.useEffect(() => {
    const func = () => {
      getPending()
      getSent()
    }
    func()
  }, [])

  const getPending = () => {
    doGetPending().then(({ data, status }) => {
      if (status !== 200) {
        data = data as Responses.Base
        alert(data.message)
      } else {
        data = data as Models.FriendRequest[]
        setPending(data)
      }
    })
  }

  const getSent = () => {
    doGetSent().then(({ data, status }) => {
      if (status !== 200) {
        data = data as Responses.Base
        alert(data.message)
      } else {
        data = data as Models.FriendRequest[]
        setSent(data)
      }
    })
  }

  const [index, setIndex] = React.useState<number>(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Friends' },
    { key: 'second', title: 'Pending' },
    { key: 'third', title: 'Sent' },
  ])

  const FriendsList = () => {
    return <View style={{ flex: 1 }}></View>
  }

  const PendingList = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
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
                      color={
                        context.theme === 'light'
                          ? colors.backdrop
                          : colors.disabled
                      }
                    />
                    <IconButton
                      icon='close'
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
        <ScrollView>
          {sent.map((request) => (
            <React.Fragment key={request.id}>
              <List.Item
                title={request.requesteeUser.username}
                description='Outgoing friend request'
                left={() => <Avatar.Image size={50} source={{}} />}
                right={() => (
                  <IconButton
                    icon='close'
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
        {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
        {/* <KeyboardView> */}
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
        {/* </KeyboardView> */}
        {/* </ScrollView> */}
      </Surface>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    height: 400,
  },
  textInput: {
    marginBottom: 10,
  },
  surface: {
    height: '100%',
    width: '100%',
  },
  button: {
    marginBottom: 10,
  },
})

export default Friends
