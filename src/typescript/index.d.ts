import { Dispatch } from 'react'
import { SetStateAction } from 'react'
import { TabsParamList } from '../navigation/Tabs'
import { ImagePickerResult } from 'expo-image-picker'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

export type Log = 'none' | 'all'

export type Config = {
  API_URL: string
  CDN_URL: string
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
    setPosts: Dispatch<SetStateAction<Models.UserPost[]>>
  }
  posts: Models.UserPost[]
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
  export type CreatePost = {
    content: string
  }
  export type Profile = {
    id: number
  }
  export type FriendRequest = {
    requesteeId: number
  }
  export type CancelFriendRequest = {
    id: number
  }
  export type RejectFriendRequest = {
    id: number
  }
  export type AcceptFriendRequest = {
    id: number
  }
  export type RemoveFriend = {
    id: number
  }
  export type UploadPicture = {
    scope: 'profile' | 'cover'
    image: ImageInfo & ImagePickerResult
    context: AppContext
  }
}

export namespace Responses {
  export type Base = {
    message: string
  }
  export type UserRegister = Models.User
}

export namespace Models {
  export type Post = {
    content: string
    createdAt: string
    id: number
    updatedAt: string
    userId: number
  }
  export type User = {
    coverPicture: string | null
    createdAt: string
    email: string
    id: number
    profilePicture: string | null
    updatedAt: string
    username: string
  }
  export type FriendRequest = {
    createdAt: string
    id: number
    requesteeId: number
    requesteeUser: User
    requesterId: number
    requesterUser: User
    updatedAt: string
  }
  export type Friend = {
    createdAt: string
    id: number
    user: User
    updatedAt: string
  }
  export type UserPost = Post & {
    user: User
  }
}
