import { DarkTheme, DefaultTheme } from 'react-native-paper'

import { Theme as NavigationTheme } from '@react-navigation/native/lib/typescript/src/types'
import { Theme as PaperTheme } from 'react-native-paper/lib/typescript/types'
import { colors } from './colors'

const primary = colors.red[700]

const paperTheme: PaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primary,
  },
}

const paperThemedark: PaperTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: primary,
  },
}

const navigationTheme: NavigationTheme = {
  dark: false,
  colors: {
    background: DefaultTheme.colors.background,
    border: DefaultTheme.colors.placeholder,
    card: DefaultTheme.colors.surface,
    notification: DefaultTheme.colors.notification,
    primary: primary,
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
    primary: primary,
    text: DarkTheme.colors.text,
  },
}

export { paperTheme, paperThemedark, navigationThemeDark, navigationTheme }
