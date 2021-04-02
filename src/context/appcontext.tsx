import * as React from 'react'

import { AppContext } from '../typescript'

const _context: AppContext = {
  logged: false,
  selectedTab: 'Feed',
  theme: 'light',
}

const context = React.createContext<AppContext>(_context)

export { context as Context }
