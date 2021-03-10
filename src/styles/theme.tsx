import { DarkTheme } from 'react-native-paper'
import { Theme as NavigationTheme } from '@react-navigation/native/lib/typescript/src/types'
import { Theme as PaperTheme } from 'react-native-paper/lib/typescript/types'

const paperTheme: PaperTheme = {
  ...DarkTheme,
}

const navigationTheme: NavigationTheme = {
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

export { paperTheme, navigationTheme }
