import { ref } from 'vue'
import config from '@/config'
import axios from 'axios'
import utils from '@/utils.js'
import { useFlashStore } from '@/store/flash'

export const useFetch = async (method, endpoint, body, headers, errorMessage = false) => {
  const data = ref(null)
  const error = ref([])
  try {
    const response = await axios({
      method: method,
      url: `${config.apiUrl}/api/${endpoint}`,
      data: body,
      headers: headers
    })
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
