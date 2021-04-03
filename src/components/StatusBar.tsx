import * as React from 'react'

import { StatusBarProps, StatusBar as _StatusBar } from 'react-native'

import { Context } from '../context/appcontext'
import { useTheme } from 'react-native-paper'

export const StatusBar = React.forwardRef<_StatusBar, StatusBarProps>(
  (props, ref) => {
    const context = React.useContext(Context)
    const { colors } = useTheme()

    return (
      <_StatusBar
        {...props}
        translucent
        backgroundColor={
          context.theme === 'light' ? colors.disabled : colors.backdrop
        }
        ref={ref}
      />
    )
  }
)
