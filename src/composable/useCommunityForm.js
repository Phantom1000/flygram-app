import { ref, watch } from 'vue'
import { useFetch } from '@/composable/useFetch'
import { useToken } from '@/composable/useToken'
import { useRouter } from 'vue-router'
import utils from '@/utils.js'

export const useCommunityForm = () => {
  const name = ref('')
  const description = ref('')
  const image = ref('')
  const errors = ref([])
  const isLoading = ref(false)
  const { getToken } = useToken()
  const router = useRouter()

  const validateName = () => {
    errors.value.name = []
    utils.validateString(
      name.value,
      'name',
      errors,
      true,
      'Введите название',
      3,
      'Длина названия не может быть меньше 3 символов',
      32,
      'Длина названия не может быть больше 32 символов'
    )
  }

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

  watch(name, validateName)
  watch(description, validateDescription)

  const validateForm = () => {
    errors.value = {}
    validateName()
    validateDescription()
    let result = true
    for (let field in errors.value) {
      if (errors.value[field].length > 0) {
        result = false
      }
    }
    return result
  }

  const submitForm = async (community = null) => {
    if (validateForm()) {
      errors.value = []
      isLoading.value = true
      const token = await getToken()
      const communityData = new FormData()
      communityData.append('name', name.value)
      communityData.append('description', description.value)
      if (image.value) communityData.append('image', image.value)

      const { data, error } = await useFetch(
        community === null ? 'post' : 'put',
        community === null ? 'communities' : `community/${community.id}`,
        communityData,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'multipart/form-data'
        }
      )
      errors.value = error.value
      isLoading.value = false
      if (errors.value.length === 0) {
        if (data.value.community) {
          router.push({ name: 'community', params: { id: data.value.community.id } })
          return utils.toCamel(data.value.community)
        }
      }
    }
  }
  return {
    name,
    description,
    image,
    errors,
    isLoading,
    submitForm
  }
}
