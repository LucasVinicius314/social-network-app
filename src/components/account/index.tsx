import * as React from 'react'

import {
  Avatar,
  Button,
  Headline,
  Surface,
  TextInput,
  useTheme,
} from 'react-native-paper'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { KeyboardView, MDTextInput } from '@suresure/react-native-components'
import { Requests, Responses } from '../../typescript'

import { AxiosResponse } from 'axios'
import { Context } from '../../context/appcontext'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'
import { doLogin } from '../../utils/requests'
import { log } from '../../utils/log'

type Navigation = StackNavigationProp<RootParamList, 'Login'>
type Route = RouteProp<RootParamList, 'Login'>

type Props = {
  navigation: Navigation
  route: Route
}

const Account = (props: Props) => {
  const context = React.useContext(Context)

  const { colors } = useTheme()

  const [email, setEmail] = React.useState<string>(context.user?.email || '')
  const [password, setPassword] = React.useState<string>('')
  const [username, setUsername] = React.useState<string>(
    context.user?.username || ''
  )

  const update = () => {
    // doLogin({ email: email, password: password }).then(({ data, status }) => {
    //   if (status !== 200) {
    //     alert(data.message)
    //   } else {
    //     alert(data.message)
    //   }
    // })
  }

  const styles = StyleSheet.create({
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
              <MDTextInput
                onChangeText={setUsername}
                style={styles.textInput}
                value={username}
                label='Username'
              />
              <MDTextInput
                onChangeText={setEmail}
                style={styles.textInput}
                keyboardType='email-address'
                value={email}
                label='Email'
              />
              <MDTextInput
                onChangeText={setPassword}
                style={styles.textInput}
                value={password}
                label='Password'
              />
              <Button mode='contained' onPress={update} style={styles.button}>
                Update
              </Button>
            </View>
          </Surface>
        </ScrollView>
      </Surface>
    </SafeAreaView>
  )
}

export default Account
