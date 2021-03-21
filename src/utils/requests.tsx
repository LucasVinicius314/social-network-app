import { instance as axios } from '../services/axios'

type LoginParams = {
  email: string
  password: string
}

type ResponseBase = {
  message: string
}

type DoLoginRequest = (loginParams: LoginParams) => Promise<ResponseBase>

const doLogin: DoLoginRequest = async (loginParams: LoginParams) => {
  return (await axios.post<ResponseBase>('/user/login')).data
}

export { doLogin }
