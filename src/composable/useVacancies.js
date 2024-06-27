import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useVacancies = () => {
  const vacancies = ref([])
  const errors = ref([])
  const isLoadingVacancies = ref(true)
  const meta = ref(null)
  const { getToken } = useToken()

  const getVacancies = async (page, employer, type, description, reload = false) => {
    const params = new URLSearchParams()
    if (description && description.value) params.append('description', description.value)
    if (page) params.append('page', page)
    if (employer) params.append('username', employer)
    if (type === 'recommended') params.append('type', 'recommended')
    const token = await getToken()
    const { data, error } = await useFetch(
      'get',
      `vacancies?${params.toString()}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) {
      if (reload) vacancies.value = data.value.items.map((item) => utils.toCamel(item))
      else
        vacancies.value = vacancies.value.concat(
          data.value.items.map((item) => utils.toCamel(item))
        )
      meta.value = utils.toCamel(data.value.meta)
    }
    isLoadingVacancies.value = false
  }

  return { vacancies, meta, errors, getVacancies, isLoadingVacancies }
}
