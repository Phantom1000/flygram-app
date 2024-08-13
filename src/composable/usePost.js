import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const usePost = () => {
  const post = ref(null)
  const errors = ref([])
  const isLoadingPost = ref(true)
  const { getToken } = useToken()

  const fetchPost = async (id, action) => {
    const token = await getToken()
    const { data, error } = await useFetch(
      action,
      `posts/${id}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) post.value = utils.toCamel(data.value)
    isLoadingPost.value = false
  }

  return { post, errors, fetchPost, isLoadingPost }
}
