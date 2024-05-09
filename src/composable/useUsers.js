import { ref } from 'vue'
import { useTokenStore } from '@/store/token'
import { useFetch } from '@/composable/useFetch'
// import { useRoute } from 'vue-router'
import utils from '@/utils.js'

export const useUsers = () => {
  const users = ref([])
  const errors = ref(null)
  const isLoading = ref(true)
  const meta = ref(null)
  const { token } = useTokenStore()
  // const route = useRoute()

  const getUsers = async (username, type, page, firstname, lastname, city, education, career) => {
    const params = new URLSearchParams()
    if (firstname !== '') params.append('firstname', firstname)
    if (lastname !== '') params.append('lastname', lastname)
    if (city !== '') params.append('city', city)
    if (education !== '') params.append('education', education)
    if (career !== '') params.append('career', career)
    if (page) params.append('page', page)
    if (type) params.append('type', type)
    const { data, error } = await useFetch(
      'get',
      `${(username ? 'friends/' + username + '?' : 'users?') + params.toString()}`,
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
