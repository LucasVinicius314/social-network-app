export type Log = 'none' | 'all'

export type Config = {
  API_URL: string
  CHANNEL: string | undefined
  LOG: Log
}

export type LoginInfo = {
  email: string
  password: string
}

export type AppContext = {
  user?: Responses.UserRegister
  app?: {
    setUser: (user: Responses.UserRegister) => {}
  }
}

export namespace Requests {
  export type Register = {
    email: string
    password: string
    username: string
  }
  export type Login = {
    email: string
    password: string
  }
}

export namespace Responses {
  export type Base = {
    message: string
  }
  export type UserRegister = {
    createdAt: string
    email: string
    id: number
    updatedAt: string
    username: string
  }
}
