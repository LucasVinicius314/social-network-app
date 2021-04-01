import axios, { AxiosResponse } from 'axios'
import { getToken, setToken } from '../utils/asyncstorage'

import { config } from '../config'
import { log } from '../utils/log'

const instance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

instance.interceptors.request.use(async (request) => {
  request.headers.authorization = await getToken()
  return request
})

instance.interceptors.response.use(
  async (response) => {
    const authorization = response.headers.authorization
    if (authorization) {
      await setToken(authorization)
    }
    log(response.config.url)
    log(response.data)
    return response
  },
  ({ response }) => {
    log(response)
    return response as AxiosResponse
  }
)

export { instance }
