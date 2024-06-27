import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useProfile = () => {
  const user = ref(null)
  const errors = ref([])
  const isLoading = ref(true)
  const { getToken } = useToken()
  const posts = ref([])

  const getUserProfile = async (username) => {
    const token = await getToken()
    const { data, error } = await useFetch(
      'get',
      `user/${username}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    if (error.value.length === 0) user.value = utils.toCamel(data.value)
    errors.value = error.value
    isLoading.value = false
  }

  return { user, posts, errors, getUserProfile, isLoading }
}
