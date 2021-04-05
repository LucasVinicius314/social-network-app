import * as ImagePicker from 'expo-image-picker'
import * as React from 'react'

import {
  Avatar,
  Button,
  Headline,
  Surface,
  TextInput,
  TouchableRipple,
  useTheme,
} from 'react-native-paper'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { KeyboardView, MDTextInput } from '@suresure/react-native-components'
import { Requests, Responses } from '../../typescript'
import { doLogin, doPictureUpload, doUpdateProfile } from '../../utils/requests'

import { AxiosResponse } from 'axios'
import { Context } from '../../context/appcontext'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'
import { config } from '../../config'
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

  const pickProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.cancelled) {
        doPictureUpload({ image: result, scope: 'profile', context: context })
      }
    }
  }

  const pickCoverImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 1],
        quality: 1,
      })

      if (!result.cancelled) {
        doPictureUpload({ image: result, scope: 'cover', context: context })
      }
    }
  }

  const update = () => {
    const _password = password.length !== 0 ? password : undefined
    doUpdateProfile({
      username: username,
      email: email,
      password: _password,
    }).then(({ data, status }) => {
      if (status !== 200) {
        alert(data.message)
      } else {
        context.app?.setUser(data)
      }
    })
  }

  const styles = StyleSheet.create({
    avatarWrapper: {
      alignSelf: 'flex-start',
      borderRadius: 90,
      marginBottom: 10,
      overflow: 'hidden',
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
          <TouchableRipple onPress={pickCoverImage}>
            <Image
              style={styles.background}
              source={{
                uri: `${config.CDN_URL}/${context.user?.coverPicture}`,
              }}
            />
          </TouchableRipple>
          <Surface style={styles.mainCol}>
            <View style={styles.wrapper}>
              <View style={styles.avatarWrapper}>
                <TouchableRipple onPress={pickProfileImage}>
                  <Avatar.Image
                    source={{
                      uri: `${config.CDN_URL}/${context.user?.profilePicture}`,
                    }}
                    size={90}
                  />
                </TouchableRipple>
              </View>
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
