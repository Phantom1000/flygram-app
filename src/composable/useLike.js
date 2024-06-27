import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'

export const useLike = () => {
  const errors = ref([])
  const { getToken } = useToken()

  const like = async (post) => {
    const token = await getToken()
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
    const token = await getToken()
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
