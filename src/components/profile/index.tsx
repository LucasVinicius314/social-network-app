import * as React from 'react'

import {
  ActivityIndicator,
  Avatar,
  Button,
  Headline,
  Surface,
  Title,
  useTheme,
} from 'react-native-paper'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { Models, Requests, Responses } from '../../typescript'
import { doGetProfile, doLogin } from '../../utils/requests'

import { AxiosResponse } from 'axios'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { log } from '../../utils/log'

type Navigation = StackNavigationProp<RootParamList, 'Profile'>
type Route = RouteProp<RootParamList, 'Profile'>

type Props = {
  navigation: Navigation
  route: Route
}

const Profile = (props: Props) => {
  const { colors } = useTheme()

  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<Models.User | undefined>(undefined)

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
    avatar: {
      marginBottom: 20,
    },
    background: {
      backgroundColor: colors.disabled,
      height: 100,
    },
    button: {
      marginBottom: 10,
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

  return (
    <SafeAreaView>
      <StatusBar />
      <Surface style={styles.surface}>
        <ScrollView>
          <Image style={styles.background} source={{}} />
          <Surface style={styles.mainCol}>
            <View style={styles.wrapper}>
              <Avatar.Image source={{}} size={90} style={styles.avatar} />
              {loaded ? <Title>{'sa'}</Title> : <ActivityIndicator />}
            </View>
          </Surface>
        </ScrollView>
      </Surface>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textInput: {
    marginBottom: 10,
  },
  surface: {
    height: '100%',
  },
  button: {
    marginBottom: 10,
  },
})

export default Profile
