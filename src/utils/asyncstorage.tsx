import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginInfo } from '../typescript'

type GetLoginInfo = () => Promise<LoginInfo | null>
type SetLoginInfo = (loginInfo: LoginInfo) => Promise<void>

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

export { getLoginInfo, setLoginInfo }
