import { useFetch } from '@/composable/useFetch'
import { useToken } from '@/composable/useToken'

export const useCommunityActions = (community) => {
  const { getToken } = useToken()

  const joinCommunity = async () => {
    const token = await getToken()
    const { error } = await useFetch(
      'post',
      `members/${community.value.id}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      true
    )
    if (error.value.length === 0) {
      community.value.isMember = true
      community.value.membersCount++
    }
  }

  const leaveCommunity = async () => {
    const token = await getToken()
    const { error } = await useFetch(
      'delete',
      `members/${community.value.id}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      true
    )
    if (error.value.length === 0) {
      community.value.isMember = false
      community.value.membersCount--
    }
  }

  return { joinCommunity, leaveCommunity }
}
