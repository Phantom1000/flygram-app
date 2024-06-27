import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
// import { useRoute } from 'vue-router'
import utils from '@/utils.js'

export const useCommunities = () => {
  const communities = ref([])
  const errors = ref(null)
  const isLoading = ref(true)
  const meta = ref(null)
  const { getToken } = useToken()
  // const route = useRoute()

  const getCommunities = async (username, type, page, name) => {
    const params = new URLSearchParams()
    if (username) params.append('username', username)
    if (name !== '') params.append('name', name)
    if (page) params.append('page', page)
    if (type) params.append('type', type)
    const token = await getToken()
    const { data, error } = await useFetch(
      'get',
      `communities?${params.toString()}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) {
      communities.value = data.value.items.map((item) => utils.toCamel(item))
      meta.value = utils.toCamel(data.value.meta)
    }
    isLoading.value = false
  }

  return { communities, meta, errors, getCommunities, isLoading }
}
