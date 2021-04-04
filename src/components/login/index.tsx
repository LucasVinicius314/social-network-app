import * as React from 'react'

import {
  Button,
  TextInput as PaperTextInput,
  Surface,
  useTheme,
} from 'react-native-paper'
import { SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native'

import { Context } from '../../context/appcontext'
import { LoadingIndicator } from '../LoadingIndicator'
import { LogoText } from '../LogoText'
import { MDTextInput } from '@suresure/react-native-components'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'
import { doLogin } from '../../utils/requests'

type Navigation = StackNavigationProp<RootParamList, 'Login'>
type Route = RouteProp<RootParamList, 'Login'>

type Props = {
  navigation: Navigation
  route: Route
}

const Login = (props: Props) => {
  const [email, setEmail] = React.useState<string>('')
  const [loaded, setLoaded] = React.useState<boolean>(true)
  const [password, setPassword] = React.useState<string>('')
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)

  const { colors } = useTheme()

  const context = React.useContext(Context)

  const emailRef = React.useRef<TextInput>(null)
  const passwordRef = React.useRef<TextInput>(null)

  const login = () => {
    setLoaded(false)
    doLogin({ email: email, password: password })
      .then(({ data, status }) => {
        if (status === 200) {
          context.app?.setUser(data)
          context.app?.setLogged(true)
        } else {
          alert(data.message)
        }
      })
      .finally(() => setLoaded(true))
  }

  const goToCreateAccount = () => {
    props.navigation.navigate('Register')
  }

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible)
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
            secureTextEntry={!passwordVisible}
            right={
              <PaperTextInput.Icon
                forceTextInputFocus={false}
                onPress={togglePasswordVisible}
                name={passwordVisible ? 'eye-off' : 'eye'}
              />
            }
          />
          <Button mode='contained' onPress={login} style={styles.button}>
            Login
          </Button>
          <Button mode='text' onPress={goToCreateAccount} style={styles.button}>
            Create Account
          </Button>
        </ScrollView>
        <LoadingIndicator visible={!loaded} />
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
