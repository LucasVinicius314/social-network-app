import axios, { AxiosResponse } from 'axios'

import { config } from '../config'
import { log } from '../utils/log'

const instance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

instance.interceptors.request.use((request) => {
  // log(request)
  return request
})

instance.interceptors.response.use(
  (response) => {
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
