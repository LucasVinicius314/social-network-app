export type Config = {
  API_URL: string
}

export type LoginInfo = {
  email: string
  password: string
}

export type AppContext = {}

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
