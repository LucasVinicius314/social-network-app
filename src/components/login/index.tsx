import * as React from 'react'

import { Button, Surface, useTheme } from 'react-native-paper'
import { MDTextInput, StatusBar } from '@suresure/react-native-components'
import { SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native'

import { Context } from '../../context/appcontext'
import { LogoText } from '../LogoText'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { doLogin } from '../../utils/requests'

type Navigation = StackNavigationProp<RootParamList, 'Login'>
type Route = RouteProp<RootParamList, 'Login'>

type Props = {
  navigation: Navigation
  route: Route
}

const Login = (props: Props) => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const { colors } = useTheme()

  const context = React.useContext(Context)

  const emailRef = React.useRef<TextInput>(null)
  const passwordRef = React.useRef<TextInput>(null)

  const login = () => {
    doLogin({ email: email, password: password }).then(({ data, status }) => {
      if (status === 200) {
        context.app?.setUser(data)
        context.app?.setLogged(true)
      } else {
        alert(data.message)
      }
    })
  }

  const goToCreateAccount = () => {
    props.navigation.navigate('Register')
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
            onSubmitEditing={login}
          />
          <Button mode='contained' onPress={login} style={styles.button}>
            Login
          </Button>
          <Button mode='text' onPress={goToCreateAccount} style={styles.button}>
            Create Account
          </Button>
        </ScrollView>
      </Surface>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
})

export default Login
