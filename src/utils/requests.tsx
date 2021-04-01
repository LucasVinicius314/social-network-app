import { Requests, Responses } from '../typescript'

import { instance as axios } from '../services/axios'

const doLogin = (loginParams: Requests.Login) => {
  return axios.post<Responses.Base>('/user/login', loginParams)
}

const doRegister = (registerParams: Requests.Register) => {
  return axios.post<Responses.Base>('/user/register', registerParams)
}

export { doLogin, doRegister }
