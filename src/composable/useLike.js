import { ref } from 'vue'
import { useTokenStore } from '@/store/token'
import { useFetch } from '@/composable/useFetch'

export const useLike = () => {
  const errors = ref([])
  const { token } = useTokenStore()

  const like = async (post) => {
    const { error } = await useFetch(
      'post',
      `like/${post.id}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
  }

  const unlike = async (post) => {
    const { error } = await useFetch(
      'delete',
      `like/${post.id}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
  }

  return { errors, like, unlike }
}
