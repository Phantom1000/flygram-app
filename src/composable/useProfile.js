import { ref } from 'vue'
import { useTokenStore } from '@/store/token'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useProfile = () => {
  const user = ref(null)
  const errors = ref([])
  const isLoading = ref(true)
  const { token } = useTokenStore()
  const posts = ref([])

  const getUserProfile = async (username, hashtag = '') => {
    const { data, error } = await useFetch(
      'get',
      `user/${username}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    if (data.value) {
      const postsResponse = await useFetch(
        'get',
        `posts?author=${username}&${hashtag ? 'hashtag=' + hashtag : ''}`,
        {},
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      )
      if (postsResponse.error.value.length === 0)
        posts.value = postsResponse.data.value.items.map((item) => utils.toCamel(item))
      errors.value = postsResponse.error.value
    }
    if (error.value.length === 0) user.value = utils.toCamel(data.value)
    errors.value = errors.value.concat(error.value)
    isLoading.value = false
  }

  return { user, posts, errors, getUserProfile, isLoading }
}
