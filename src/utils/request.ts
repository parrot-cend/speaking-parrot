import axios from 'axios'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: '/',
  timeout: 10000
})

request.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    Message.error(error)
    return Promise.reject(error)
  }
)

export default request
