import 'react-native-gesture-handler'

import { navigationTheme, paperTheme } from './src/styles/theme'

import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import React from 'react'
import RootNavigator from './src/navigation/Root'

const App = () => {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
