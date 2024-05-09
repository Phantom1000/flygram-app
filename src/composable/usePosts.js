import { ref } from 'vue'
import { useTokenStore } from '@/store/token'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const usePosts = () => {
  const posts = ref([])
  const errors = ref([])
  const isLoading = ref(true)
  const meta = ref(null)
  const { token } = useTokenStore()

  const getPosts = async (hashtag, type, page) => {
    const params = new URLSearchParams()
    if (hashtag) params.append('hashtag', hashtag)
    if (type) params.append('type', type)
    if (page) params.append('page', page)
    const { data, error } = await useFetch(
      'get',
      `posts?${params.toString()}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) {
      posts.value = data.value.items.map((item) => utils.toCamel(item))
      meta.value = utils.toCamel(data.value.meta)
    }
    isLoading.value = false
  }

  return { posts, meta, errors, getPosts, isLoading }
}
