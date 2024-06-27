import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useMessages = () => {
  const messages = ref([])
  const errors = ref([])
  const isLoadingMessages = ref(true)
  const meta = ref(null)
  const { getToken } = useToken()

  const getMessages = async (page, username, reload = false) => {
    const params = new URLSearchParams()
    if (page) params.append('page', page)
    if (username) params.append('username', username)
    const token = await getToken()
    const { data, error } = await useFetch(
      'get',
      `messages?${params.toString()}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) {
      if (reload) messages.value = data.value.items.map((item) => utils.toCamel(item))
      else
        messages.value = [...messages.value, ...data.value.items.map((item) => utils.toCamel(item))]
      meta.value = utils.toCamel(data.value.meta)
    }
    isLoadingMessages.value = false
  }

  return { messages, meta, errors, getMessages, isLoadingMessages }
}
