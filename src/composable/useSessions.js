import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useSessions = () => {
  const sessions = ref([])
  const errors = ref([])
  const isLoadingSessions = ref(true)
  const meta = ref(null)
  const { getToken } = useToken()

  const getSessions = async () => {
    isLoadingSessions.value = true
    const token = await getToken()
    const { data, error } = await useFetch(
      'get',
      'sessions',
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) {
      sessions.value = data.value.items.map((item) => utils.toCamel(item))
      meta.value = utils.toCamel(data.value.meta)
    }
    isLoadingSessions.value = false
  }

  return { sessions, meta, errors, getSessions, isLoadingSessions }
}
