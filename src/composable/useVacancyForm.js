import { ref, watch } from 'vue'
import { useFetch } from '@/composable/useFetch'
import { useToken } from '@/composable/useToken'
import { useRouter } from 'vue-router'
import utils from '@/utils.js'

export const useVacancyForm = () => {
  const description = ref('')
  const skills = ref('')
  const errors = ref([])
  const isLoading = ref(false)
  const { getToken } = useToken()
  const router = useRouter()
  const validateDescription = () => {
    errors.value.description = []
    utils.validateString(
      description.value,
      'description',
      errors,
      true,
      'Описание не может быть пустым',
      1,
      'Описание не может быть пустым',
      500,
      'Длина описания не может быть больше 500 символов'
    )
  }

  const validateSkills = () => {
    errors.value.skills = []
    utils.validateString(
      skills.value,
      'skills',
      errors,
      false,
      '',
      0,
      '',
      100,
      'Информация о навыках не может быть больше 100 символов',
      false,
      'Навыки не могут содержать пробелы'
    )
  }

  watch(description, validateDescription)
  watch(skills, validateSkills)

  const validateForm = () => {
    errors.value = {}
    validateDescription()
    validateSkills()
    let result = true
    for (let field in errors.value) {
      if (errors.value[field].length > 0) {
        result = false
      }
    }
    return result
  }

  const submitForm = async (vacancy = null) => {
    if (validateForm()) {
      errors.value = []
      isLoading.value = true
      const token = await getToken()
      const { data, error } = await useFetch(
        vacancy === null ? 'post' : 'put',
        vacancy === null ? 'vacancies' : `vacancies/${vacancy.id}`,
        {
          description: description.value,
          skills: skills.value
        },
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      )
      errors.value = error.value
      isLoading.value = false
      if (errors.value.length === 0) {
        router.push({ name: 'vacancies' })
        if (data.value.vacancy) {
          return utils.toCamel(data.value.vacancy)
        }
      }
    }
  }
  return {
    description,
    skills,
    errors,
    isLoading,
    submitForm
  }
}
