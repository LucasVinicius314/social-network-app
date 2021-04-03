import * as React from 'react'

import { Button, Surface, useTheme } from 'react-native-paper'
import { SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native'

import { Context } from '../../context/appcontext'
import { LogoText } from '../LogoText'
import { MDTextInput } from '@suresure/react-native-components'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'
import { doRegister } from '../../utils/requests'

type Navigation = StackNavigationProp<RootParamList, 'Register'>
type Route = RouteProp<RootParamList, 'Register'>

type Props = {
  navigation: Navigation
  route: Route
}

const Register = (props: Props) => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [username, setUsername] = React.useState<string>('')

  const { colors } = useTheme()

  const context = React.useContext(Context)

  const usernameRef = React.useRef<TextInput>(null)
  const emailRef = React.useRef<TextInput>(null)
  const passwordRef = React.useRef<TextInput>(null)

  const register = () => {
    doRegister({ email: email, password: password, username: username }).then(
      ({ data, status }) => {
        if (status === 200) {
          context.app?.setUser(data)
          context.app?.setLogged(true)
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
          <LogoText
            width={200}
            height={200}
            iconStroke={colors.primary}
            textFill={colors.text}
            style={{ alignSelf: 'center' }}
          />
          <MDTextInput
            onChangeText={setUsername}
            style={styles.textInput}
            value={username}
            label='Username'
            ref={usernameRef}
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
            returnKeyType='next'
          />
          <MDTextInput
            onChangeText={setEmail}
            style={styles.textInput}
            keyboardType='email-address'
            value={email}
            label='Email'
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
            returnKeyType='next'
          />
          <MDTextInput
            onChangeText={setPassword}
            style={styles.textInput}
            value={password}
            label='Password'
            ref={passwordRef}
            onSubmitEditing={register}
          />
          <Button mode='contained' onPress={register}>
            Create Account
          </Button>
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
})

export default Register
