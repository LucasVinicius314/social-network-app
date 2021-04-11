import * as React from 'react'

import { ChatContext } from '../typescript'

const _context: ChatContext = {
  data: {
    chats: [],
  },
}

const context = React.createContext<ChatContext>(_context)

export { context as ChatContext }
