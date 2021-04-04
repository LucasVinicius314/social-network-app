import 'react-native-gesture-handler'

import { Models, Responses } from './src/typescript'
import {
  navigationTheme,
  navigationThemeDark,
  paperTheme,
  paperThemedark,
} from './src/styles/theme'

import { Context } from './src/context/appcontext'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import React from 'react'
import RootNavigator from './src/navigation/Root'
import { TabsParamList } from './src/navigation/Tabs'
import { doValidate } from './src/utils/requests'
import { getToken } from './src/utils/asyncstorage'

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

  React.useEffect(() => {
    const func = async () => {
      const token = await getToken()
      if (token !== null) {
        await doValidate({ setUser, setLogged })
      }
    }
    func().finally(() => setLoaded(true))
  }, [])

  if (!loaded) return null

  return (
    <Context.Provider
      value={{
        user: user,
        logged: logged,
        theme: theme,
        selectedTab: selectedTab,
        app: {
          setUser: setUser,
          setLogged: setLogged,
          setTheme: setTheme,
          setSelectedTab: setSelectedTab,
          setPosts: setPosts,
        },
        posts: posts,
      }}>
      <PaperProvider theme={theme === 'light' ? paperTheme : paperThemedark}>
        <NavigationContainer
          theme={theme === 'light' ? navigationTheme : navigationThemeDark}>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Context.Provider>
  )
}

export default App
