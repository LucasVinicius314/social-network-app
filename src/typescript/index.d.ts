import { Dispatch } from 'react'
import { SetStateAction } from 'react'
import { TabsParamList } from '../navigation/Tabs'
import { ImagePickerResult } from 'expo-image-picker'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { Socket } from 'socket.io-client'

export type Log = 'none' | 'all'

export type Config = {
  API_URL: string
  SOCKET_URL: string
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
  socket?: Socket
}

export type ChatContext = {
  data: {
    chats: Models.UserChat[]
  }
  methods?: {
    setChats: Dispatch<SetStateAction<Models.UserChat[]>>
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
  export type UpdateProfile = {
    username: string
    email: string
    password?: string
  }
  export type LikePost = {
    id: number
  }
  export type UnLikePost = {
    id: number
  }
  export type Comments = {
    id: number
  }
  export type CreateComment = {
    postId: number
    content: string
  }
  export type DeleteComment = {
    id: number
  }
  export type CreateChat = {
    userId: number
  }
  export type SendMessage = {
    content: string
    chatId: number
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
  export type Like = {
    createdAt: string
    id: number
    postId: number
    updatedAt: string
    userId: number
  }
  export type Comment = {
    content: string
    createdAt: string
    id: number
    postId: number
    updatedAt: string
    userId: number
  }
  export type Message = {
    content: string
    chatId: number
    createdAt: string
    id: number
    updatedAt: string
    userId: number
  }
  export type UserPost = Post & {
    commentCount: number
    likeCount: number
    liked: 0 | 1
    likes: Like[]
    user: User
  }
  export type UserComment = Comment & {
    user: User
  }
  export type Chat = {
    createdAt: string
    id: number
    updatedAt: string
    user1Id: number
    user2Id: number
  }
  export type UserChat = Chat & {
    user: User
    messages: Message[]
  }
}
