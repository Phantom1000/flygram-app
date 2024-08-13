import { ref } from 'vue'
import { useToken } from '@/composable/useToken'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useVacancy = () => {
  const vacancy = ref(null)
  const errors = ref([])
  const isLoadingVacancy = ref(true)
  const { getToken } = useToken()

  const fetchVacancy = async (id, action) => {
    const token = await getToken()
    const { data, error } = await useFetch(
      action,
      `vacancies/${id}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    errors.value = error.value
    if (error.value.length === 0) vacancy.value = utils.toCamel(data.value)
    isLoadingVacancy.value = false
  }

  return { vacancy, errors, fetchVacancy, isLoadingVacancy }
}
