import * as React from 'react'

import { Button, Headline, Surface, useTheme } from 'react-native-paper'
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'

import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { doRegister } from '../../utils/requests'

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>
type LoginScreenRouteProp = RouteProp<RootParamList, 'Login'>

type Props = {
  navigation: LoginScreenNavigationProp
  route: LoginScreenRouteProp
}

const Register = (props: Props) => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [username, setUsername] = React.useState<string>('')

  const { colors } = useTheme()

  const register = () => {
    doRegister({ email: email, password: password, username: username }).then(
      ({ data, status }) => {
        if (status === 200) {
          props.navigation.goBack()
        } else {
          alert(data.message)
        }
      }
    )
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <Surface style={styles.surface}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <KeyboardView>
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
            <Button mode='contained' onPress={register}>
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
})

export default Register
