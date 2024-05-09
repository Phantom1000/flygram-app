import { useFetch } from '@/composable/useFetch'
import { useTokenStore } from '@/store/token'

export const useUserActions = (user) => {
  const addFriend = async () => {
    const { token } = useTokenStore()
    const { error } = await useFetch(
      'post',
      `friends/${user.value.username}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      true
    )
    if (error.value.length === 0) {
      user.value.isFollower = true
      user.value.followersCount++
    }
  }

  const removeFriend = async () => {
    const { token } = useTokenStore()
    const { error } = await useFetch(
      'delete',
      `friends/${user.value.username}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      true
    )
    if (error.value.length === 0) {
      if (user.value.isFriend) {
        user.value.friendsCount--
        user.value.isFriend = false
        user.value.isFollower = false
        user.value.isFollowing = true
      } else if (user.value.isFollower) {
        user.value.followersCount--
        user.value.isFollower = false
      }
      //   user.value.isFriend = false
      //   user.value.isFollowing = false
      //   user.value.isFollower = false
    }
  }

  const acceptFriend = async () => {
    const { token } = useTokenStore()
    const { error } = await useFetch(
      'put',
      `friends/${user.value.username}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      true
    )
    if (error.value.length === 0) {
      user.value.isFriend = true
      user.value.friendsCount++
    }
  }

  return { addFriend, removeFriend, acceptFriend }
}
