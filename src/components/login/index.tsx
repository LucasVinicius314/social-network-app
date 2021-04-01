import * as React from 'react'

import { Button, Headline, Surface, useTheme } from 'react-native-paper'
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { Requests, Responses } from '../../typescript'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'

import { AxiosResponse } from 'axios'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { doLogin } from '../../utils/requests'
import { log } from '../../utils/log'

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>
type LoginScreenRouteProp = RouteProp<RootParamList, 'Login'>

type Props = {
  navigation: LoginScreenNavigationProp
  route: LoginScreenRouteProp
}

const Login = (props: Props) => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const { colors } = useTheme()

  const login = () => {
    doLogin({ email: email, password: password }).then(({ data, status }) => {
      if (status !== 200) {
        alert(data.message)
      } else {
        alert(data.message)
      }
    })
  }

  const goToCreateAcoount = () => {
    props.navigation.navigate('Register')
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <Surface style={styles.surface}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <KeyboardView>
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
            <Button mode='contained' onPress={login} style={styles.button}>
              Login
            </Button>
            <Button
              mode='text'
              onPress={goToCreateAcoount}
              style={styles.button}>
              Create Account
            </Button>
          </KeyboardView>
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
    marginBottom: 20,
  },
  surface: {
    height: '100%',
  },
  button: {
    marginBottom: 10,
  },
})

export default Login
