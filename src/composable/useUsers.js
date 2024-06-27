import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
// import { useRoute } from 'vue-router'
import utils from '@/utils.js'

export const useUsers = () => {
  const users = ref([])
  const errors = ref(null)
  const isLoading = ref(true)
  const meta = ref(null)
  const { getToken } = useToken()
  // const route = useRoute()

  const getUsers = async ({
    username,
    communityId,
    type,
    page,
    firstname,
    lastname,
    city,
    education,
    career,
    vacancyId
  }) => {
    const params = new URLSearchParams()
    if (firstname) params.append('firstname', firstname)
    if (lastname) params.append('lastname', lastname)
    if (city) params.append('city', city)
    if (education) params.append('education', education)
    if (career) params.append('career', career)
    if (page) params.append('page', page)
    if (type) params.append('type', type)
    if (vacancyId) params.append('vacancy', vacancyId)
    const path = username
      ? 'friends/' + username + '?'
      : communityId
        ? 'members/' + communityId + '?'
        : 'users?'
    const token = await getToken()
    const { data, error } = await useFetch(
      'get',
      `${path + params.toString()}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) {
      users.value = data.value.items.map((item) => utils.toCamel(item))
      meta.value = utils.toCamel(data.value.meta)
    }
    isLoading.value = false
  }

  return { users, meta, errors, getUsers, isLoading }
}
