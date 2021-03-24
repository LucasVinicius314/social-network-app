import { Requests } from '../typescript'
import { instance as axios } from '../services/axios'

type ResponseBase = {
  message: string
}

type DoLoginRequest = (loginParams: Requests.Login) => Promise<ResponseBase>
type DoRegisterRequest = (
  registerParams: Requests.Register
) => Promise<ResponseBase>

const doLogin: DoLoginRequest = async (loginParams) => {
  return (await axios.post<ResponseBase>('/user/login', loginParams)).data
}
const doRegister: DoRegisterRequest = async (registerParams) => {
  return (await axios.post<ResponseBase>('/user/register', registerParams)).data
}

export { doLogin, doRegister }
