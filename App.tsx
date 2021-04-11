import 'react-native-gesture-handler'

import { Models, Responses } from './src/typescript'
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
import { doValidate } from './src/utils/requests'
import { getToken } from './src/utils/asyncstorage'
import { io } from 'socket.io-client'

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

  React.useEffect(() => {
    const func = async () => {
      const token = await getToken()
      if (token !== null) {
        await doValidate({ setUser, setLogged })
      }
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
      console.log(e)
    })
    socket.on('connect', () => {
      console.log('Connected to socket server')
      socket.emit('aaa')
    })
    socket.on('test', (e) => {
      alert(1)
    })
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
