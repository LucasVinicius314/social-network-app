import 'react-native-gesture-handler'

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
import { Responses } from './src/typescript'
import RootNavigator from './src/navigation/Root'
import { TabsParamList } from './src/navigation/Tabs'

const App = () => {
  const [logged, setLogged] = React.useState<boolean>(false)
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  const [selectedTab, setSelectedTab] = React.useState<keyof TabsParamList>(
    'Feed'
  )
  const [user, setUser] = React.useState<Responses.UserRegister | undefined>(
    undefined
  )

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
        },
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
