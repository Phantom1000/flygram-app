import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const usePosts = () => {
  const posts = ref([])
  const errors = ref([])
  const isLoadingPosts = ref(true)
  const meta = ref(null)
  const { getToken } = useToken()

  const getPosts = async (page, hashtag, type, search, author, community, reload = false) => {
    const params = new URLSearchParams()
    if (hashtag && hashtag.value) params.append('hashtag', hashtag.value)
    if (type && type.value) params.append('type', type.value)
    if (page) params.append('page', page)
    if (author) params.append('author', author)
    if (community) params.append('community', community)
    if (search && search.value) params.append('search', search.value)
    const token = await getToken()
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
      if (reload) posts.value = data.value.items.map((item) => utils.toCamel(item))
      else posts.value = posts.value.concat(data.value.items.map((item) => utils.toCamel(item)))
      meta.value = utils.toCamel(data.value.meta)
    }
    isLoadingPosts.value = false
  }

  return { posts, meta, errors, getPosts, isLoadingPosts }
}
