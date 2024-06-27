import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useCommunity = () => {
  const community = ref(null)
  const errors = ref([])
  const isLoadingCommunity = ref(true)
  const { getToken } = useToken()

  const fetchCommunity = async (id, action) => {
    const token = await getToken()
    const { data, error } = await useFetch(
      action,
      `community/${id}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) community.value = utils.toCamel(data.value)
    isLoadingCommunity.value = false
  }

  return { community, errors, fetchCommunity, isLoadingCommunity }
}
