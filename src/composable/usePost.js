import { ref } from 'vue'
import { useTokenStore } from '@/store/token'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const usePost = () => {
  const post = ref(null)
  const errors = ref([])
  const isLoading = ref(true)
  const { token } = useTokenStore()

  const fetchPost = async (id, action) => {
    const { data, error } = await useFetch(
      action,
      `post/${id}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) post.value = utils.toCamel(data.value)
    isLoading.value = false
  }

  return { post, errors, fetchPost, isLoading }
}
