import { useFetch } from '@/composable/useFetch'
import { useToken } from '@/composable/useToken'
import { ref } from 'vue'

export const useSessionActions = () => {
  const { getToken } = useToken()
  const actionErrors = ref([])

  const enableTwoFactor = async () => {
    const token = await getToken()
    const { error } = await useFetch(
      'post',
      'two-factor',
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      true
    )
    actionErrors.value = error.value
  }

  const disableTwoFactor = async () => {
    const token = await getToken()
    const { error } = await useFetch(
      'delete',
      'two-factor',
      {},
      {
        Authorization: `Bearer ${token}`
      },
      true
    )
    actionErrors.value = error.value
  }

  const deleteSessions = async () => {
    const token = await getToken()
    const { error } = await useFetch(
      'delete',
      'sessions',
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      true
    )
    actionErrors.value = error.value
  }

  return { actionErrors, deleteSessions, enableTwoFactor, disableTwoFactor }
}
