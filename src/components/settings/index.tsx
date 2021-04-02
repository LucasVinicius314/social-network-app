import * as React from 'react'

import {
  Button,
  Checkbox,
  Divider,
  Headline,
  List,
  Surface,
  useTheme,
} from 'react-native-paper'
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { Requests, Responses } from '../../typescript'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'

import { AxiosResponse } from 'axios'
import { Context } from '../../context/appcontext'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { config } from '../../config'
import { doLogin } from '../../utils/requests'
import { log } from '../../utils/log'

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>
type LoginScreenRouteProp = RouteProp<RootParamList, 'Login'>

type Props = {
  navigation: LoginScreenNavigationProp
  route: LoginScreenRouteProp
}

const Settings = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  const toggleTheme = () => {
    context.app?.setTheme(context.theme === 'light' ? 'dark' : 'light')
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <Surface style={styles.surface}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <KeyboardView>
            <Checkbox.Item
              label='Dark Theme'
              onPress={toggleTheme}
              status={context.theme === 'light' ? 'unchecked' : 'checked'}
            />
            <Divider />
            <List.Item title='Version' description={config.VERSION} />
            <Divider />
            <List.Item
              title='Release Channel'
              description={config.CHANNEL || 'Expo Go'}
            />
            <Divider />
            <List.Item title='App Version' description={config.APP_VERSION} />
            <Divider />
            <List.Item title='Expo Version' description={config.EXPO_VERSION} />
          </KeyboardView>
        </ScrollView>
      </Surface>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    // paddingHorizontal: 10,
    // paddingVertical: 10,
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

export default Settings
