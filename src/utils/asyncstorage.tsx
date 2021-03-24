import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginInfo } from '../typescript'

type GetLoginInfo = () => Promise<LoginInfo | null>
type SetLoginInfo = (loginInfo: LoginInfo) => Promise<void>

type GetToken = () => Promise<string | null>
type SetToken = (token: string) => Promise<void>

const getLoginInfo: GetLoginInfo = async () => {
  const loginInfo = (await AsyncStorage.getItem(
    'login_info'
  )) as LoginInfo | null
  return loginInfo
}

const setLoginInfo: SetLoginInfo = async (loginInfo: LoginInfo) => {
  return void (await AsyncStorage.setItem(
    'login_info',
    JSON.stringify(loginInfo)
  ))
}

const getToken: GetToken = async () => {
  const token = (await AsyncStorage.getItem('token')) as string | null
  return token
}

const setToken: SetToken = async (token: string) => {
  return void (await AsyncStorage.setItem('token', token))
}

export { getLoginInfo, setLoginInfo, getToken, setToken }
