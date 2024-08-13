import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useComment = () => {
  const comment = ref(null)
  const errors = ref([])
  const isLoading = ref(true)
  const { getToken } = useToken()

  const fetchComment = async (id, action) => {
    const token = await getToken()
    const { data, error } = await useFetch(
      action,
      `comments/${id}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) comment.value = utils.toCamel(data.value)
    isLoading.value = false
  }

  return { comment, errors, fetchComment, isLoading }
}
