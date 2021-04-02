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
import {
  KeyboardView,
  MDTextInput,
  StatusBar,
} from '@suresure/react-native-components'
import { Requests, Responses } from '../../typescript'

import { AxiosResponse } from 'axios'
import { Context } from '../../context/appcontext'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { doLogin } from '../../utils/requests'
import { log } from '../../utils/log'

type Navigation = StackNavigationProp<RootParamList, 'NewPost'>
type Route = RouteProp<RootParamList, 'NewPost'>

type Props = {
  navigation: Navigation
  route: Route
}

const Account = (props: Props) => {
  const context = React.useContext(Context)

  const { colors } = useTheme()

  const [content, setContent] = React.useState<string>('')

  const post = () => {
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
              <MDTextInput
                onChangeText={setContent}
                style={styles.textInput}
                value={content}
                label='Content'
                multiline
              />
              <Button mode='contained' onPress={post} style={styles.button}>
                Post
              </Button>
            </View>
          </Surface>
        </ScrollView>
      </Surface>
    </SafeAreaView>
  )
}

export default Account
