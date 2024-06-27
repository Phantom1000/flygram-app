import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useComments = () => {
  const comments = ref([])
  const errors = ref([])
  const isLoadingComments = ref(true)
  const meta = ref(null)
  const { getToken } = useToken()

  const getComments = async (page, postId) => {
    isLoadingComments.value = true
    const params = new URLSearchParams()
    if (postId) params.append('post_id', postId)
    if (page) params.append('page', page)
    const token = await getToken()
    const { data, error } = await useFetch(
      'get',
      `comments?${params.toString()}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) {
      comments.value = comments.value.concat(data.value.items.map((item) => utils.toCamel(item)))
      meta.value = utils.toCamel(data.value.meta)
    }
    isLoadingComments.value = false
  }

  return { comments, meta, errors, getComments, isLoadingComments }
}
