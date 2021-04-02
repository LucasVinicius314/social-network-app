import { DarkTheme, DefaultTheme } from 'react-native-paper'

import { Theme as NavigationTheme } from '@react-navigation/native/lib/typescript/src/types'
import { Theme as PaperTheme } from 'react-native-paper/lib/typescript/types'

const paperTheme: PaperTheme = {
  ...DefaultTheme,
}

const paperThemedark: PaperTheme = {
  ...DarkTheme,
}

const navigationTheme: NavigationTheme = {
  dark: false,
  colors: {
    background: DefaultTheme.colors.background,
    border: DefaultTheme.colors.placeholder,
    card: DefaultTheme.colors.surface,
    notification: DefaultTheme.colors.notification,
    primary: DefaultTheme.colors.primary,
    text: DefaultTheme.colors.text,
  },
}

const navigationThemeDark: NavigationTheme = {
  dark: true,
  colors: {
    background: DarkTheme.colors.background,
    border: DarkTheme.colors.placeholder,
    card: DarkTheme.colors.surface,
    notification: DarkTheme.colors.notification,
    primary: DarkTheme.colors.primary,
    text: DarkTheme.colors.text,
  },
}

export { paperTheme, paperThemedark, navigationThemeDark, navigationTheme }
