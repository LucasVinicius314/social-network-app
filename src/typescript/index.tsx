import { Dispatch } from 'react'
import { SetStateAction } from 'react'
import { TabsParamList } from '../navigation/Tabs'

export type Log = 'none' | 'all'

export type Config = {
  API_URL: string
  CHANNEL: string | undefined
  LOG: Log
  VERSION: string
  APP_VERSION: string | undefined
  EXPO_VERSION: string | undefined
}

export type LoginInfo = {
  email: string
  password: string
}

export type AppContext = {
  user?: Responses.UserRegister
  logged: boolean
  theme: 'light' | 'dark'
  selectedTab: keyof TabsParamList
  app?: {
    setUser: Dispatch<SetStateAction<Responses.UserRegister | undefined>>
    setLogged: Dispatch<SetStateAction<boolean>>
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
    setSelectedTab: Dispatch<SetStateAction<keyof TabsParamList>>
  }
}

export namespace Requests {
  export type Register = {
    email: string
    password: string
    username: string
  }
  export type Login = {
    email: string
    password: string
  }
}

export namespace Responses {
  export type Base = {
    message: string
  }
  export type UserRegister = {
    createdAt: string
    email: string
    id: number
    updatedAt: string
    username: string
  }
}
