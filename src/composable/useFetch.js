import { ref } from 'vue'
import config from '@/config'
import axios from 'axios'
import utils from '@/utils.js'
import { useFlashStore } from '@/store/flash'
import { useUserStore } from '@/store/user'
import { useToken } from '@/composable/useToken'
import router from '@/router'

const instance = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true
})

instance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !originalRequest.isRetry) {
      originalRequest.isRetry = true
      const { setToken, removeToken } = useToken()
      const { setCurrentUser } = useUserStore()
      try {
        const response = await axios.get(`${config.apiUrl}/api/token`, { withCredentials: true })
        const data = response.data

        if (data.user && data.token) {
          setCurrentUser(data.user)
          setToken(data.token)
          originalRequest.headers.authorization = `Bearer ${data.token}`
          return instance.request(originalRequest)
        }
      } catch (err) {
        setCurrentUser(null)
        await setToken(null)
        await removeToken(null)
        router.replace({ name: 'login' })
      }
    } else {
      return Promise.reject(error)
    }
  }
)

export const useFetch = async (method, endpoint, body, headers, errorMessage = false) => {
  const data = ref(null)
  const error = ref([])
  try {
    const response = await instance({
      method: method,
      url: `/api/${endpoint}`,
      data: body,
      headers: headers
    })
    console.log(response)
    if (response) {
      const { setMessage, setShow } = useFlashStore()
      data.value = utils.toCamel(response.data)
      if (response.data.message) {
        setMessage(response.data.message)
        setShow(2)
      }
    }
  } catch (err) {
    error.value = err.response ? err.response.data.error : config.defaultErrorMessage
    if (typeof error.value === 'string') {
      error.value = [error.value]
    } else {
      error.value = utils.toCamel(error.value)
    }
    if (errorMessage) {
      const { setMessage, setShow } = useFlashStore()
      setMessage(error.value[0])
      setShow(2)
    }
  }
  return { data, error }
}
