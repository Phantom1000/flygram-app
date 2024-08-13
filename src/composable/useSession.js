import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useSession = () => {
  const session = ref(null)
  const errors = ref([])
  const isLoadingSession = ref(true)
  const { getToken } = useToken()

  const fetchSession = async (id, action) => {
    const token = await getToken()
    const { data, error } = await useFetch(
      action,
      `sessions/${id}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) session.value = utils.toCamel(data.value)
    isLoadingSession.value = false
  }

  return { session, errors, fetchSession, isLoadingSession }
}
