import 'react-native-gesture-handler'

import { navigationTheme, paperTheme } from './src/styles/theme'

import { Context } from './src/context/appcontext'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import React from 'react'
import { Responses } from './src/typescript'
import RootNavigator from './src/navigation/Root'

const App = () => {
  const [logged, setLogged] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<Responses.UserRegister | undefined>(
    undefined
  )

  return (
    <Context.Provider
      value={{
        user: user,
        logged: logged,
        app: {
          setUser: setUser,
          setLogged: setLogged,
        },
      }}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Context.Provider>
  )
}

export default App
