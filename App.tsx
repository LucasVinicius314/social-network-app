import 'react-native-gesture-handler'

import { Models, Responses } from './src/typescript'
import { Socket, io } from 'socket.io-client'
import { doGetChats, doValidate } from './src/utils/requests'
import {
  navigationTheme,
  navigationThemeDark,
  paperTheme,
  paperThemedark,
} from './src/styles/theme'

import { ChatContext } from './src/context/chatcontext'
import { Context } from './src/context/appcontext'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import React from 'react'
import RootNavigator from './src/navigation/Root'
import { TabsParamList } from './src/navigation/Tabs'
import { config } from './src/config'
import { getToken } from './src/utils/asyncstorage'
import { log } from './src/utils/log'

const App = () => {
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [logged, setLogged] = React.useState<boolean>(false)
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  const [selectedTab, setSelectedTab] = React.useState<keyof TabsParamList>(
    'Feed'
  )
  const [user, setUser] = React.useState<Responses.UserRegister | undefined>(
    undefined
  )
  const [posts, setPosts] = React.useState<Models.UserPost[]>([])
  const [chats, setChats] = React.useState<Models.UserChat[]>([])
  const [socket, setSocket] = React.useState<Socket | undefined>(undefined)

  React.useEffect(() => {
    const func = async () => {
      const token = await getToken()
      if (token !== null) {
        await doValidate({ setUser, setLogged })
      }
      await doGetChats().then(({ data, status }) => {
        if (status !== 200) {
          data = data as Responses.Base
          alert(data.message)
        } else {
          data = data as Models.UserChat[]
          setChats(data)
        }
      })
      await useSocket()
    }
    func().finally(() => setLoaded(true))
  }, [])

  const useSocket = async () => {
    const socket = io(config.SOCKET_URL, {
      extraHeaders: {
        authorization: (await getToken()) || '',
      },
    })
    socket.on('connect_error', (e) => {
      log(e)
    })
    socket.on('connect', () => {
      log('Connected to socket server')
    })
    socket.on(
      'new_message',
      (e: {
        chatId: number
        content: string
        createdAt: string
        id: number
        updatedAt: string
        userId: number
      }) => {
        console.log('new_message')
        console.log(e)
        console.log('chats')
        console.log(chats)
        const _chats = chats.map((v) => {
          if (v.id !== e.chatId) {
            return v
          } else {
            // v.messages.push(e)
            return v
          }
        })
        // setChats(_chats)
      }
    )
    socket.on('message_sent', (e) => {
      alert('msg sent')
      console.log('====')
      console.log(e)
    })
    setSocket(socket)
  }

  if (!loaded) return null

  return (
    <Context.Provider
      value={{
        user: user,
        logged: logged,
        theme: theme,
        selectedTab: selectedTab,
        posts: posts,
        socket: socket,
        app: {
          setUser: setUser,
          setLogged: setLogged,
          setTheme: setTheme,
          setSelectedTab: setSelectedTab,
          setPosts: setPosts,
        },
      }}>
      <ChatContext.Provider
        value={{
          data: { chats: chats },
          methods: {
            setChats: setChats,
          },
        }}>
        <PaperProvider theme={theme === 'light' ? paperTheme : paperThemedark}>
          <NavigationContainer
            theme={theme === 'light' ? navigationTheme : navigationThemeDark}>
            <RootNavigator />
          </NavigationContainer>
        </PaperProvider>
      </ChatContext.Provider>
    </Context.Provider>
  )
}

export default App
