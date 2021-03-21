import axios from 'axios'
import { config } from '../config'

const instance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

instance.interceptors.request.use((request) => {
  // console.log(request)
  return request
})

instance.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  (error) => {
    console.log(JSON.parse(JSON.stringify(error)))
    return error
  }
)

export { instance }
