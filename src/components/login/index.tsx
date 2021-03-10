import { Button, Headline, TextInput } from 'react-native-paper'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { StatusBar, Unmasked } from '@suresure/react-native-components'

import React from 'react'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>
type LoginScreenRouteProp = RouteProp<RootParamList, 'Login'>

type Props = {
  navigation: LoginScreenNavigationProp
  route: LoginScreenRouteProp
}

const Login = (props: Props) => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Headline>Email</Headline>
        <Unmasked
          onChangeText={setEmail}
          style={styles.textInput}
          keyboardType='email-address'
        />
        <Headline>Password</Headline>
        {/* <Unmasked
          onChangeText={setPassword}
          style={styles.textInput}
          secureTextEntry
        /> */}
        <TextInput label='Password' mode='flat' />
        <Button mode='contained'>asad</Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: '#222222',
    fontSize: 30,
    marginBottom: 20,
  },
})

export default Login
