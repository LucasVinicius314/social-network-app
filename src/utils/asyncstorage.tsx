import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginInfo } from '../typescript'

// export const getLoginInfo = async () => {
//   const loginInfo = (await AsyncStorage.getItem(
//     'login_info'
//   )) as LoginInfo | null
//   return loginInfo
// }

// export const setLoginInfo = async (loginInfo: LoginInfo) => {
//   return void (await AsyncStorage.setItem(
//     'login_info',
//     JSON.stringify(loginInfo)
//   ))
// }

export const getToken = async () => {
  const token = (await AsyncStorage.getItem('token')) as string | null
  return token
}

export const setToken = async (token: string | null) => {
  if (token === null) {
    return void (await AsyncStorage.removeItem('token'))
  } else {
    return void (await AsyncStorage.setItem('token', token))
  }
}
