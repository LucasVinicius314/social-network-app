import * as React from 'react'

import { AppContext } from '../typescript'

const _context: AppContext = {}

const context = React.createContext<AppContext>(_context)

export { context as Context }
