import { ref, watch } from 'vue'
import { useFetch } from '@/composable/useFetch'
import { useToken } from '@/composable/useToken'
import utils from '@/utils.js'

export const useMessageForm = () => {
  const body = ref('')
  const errors = ref([])
  const isLoading = ref(false)
  const { getToken } = useToken()

  const validateBody = () => {
    errors.value.body = []
    utils.validateString(
      body.value,
      'body',
      errors,
      true,
      'Сообщение не может быть пустым',
      1,
      'Сообщение не может быть пустым',
      200,
      'Длина сообщения не может быть больше 200 символов'
    )
  }

  watch(body, validateBody)

  const validateForm = () => {
    errors.value = {}
    validateBody()
    let result = true
    for (let field in errors.value) {
      if (errors.value[field].length > 0) {
        result = false
      }
    }
    return result
  }

  const submitForm = async (username) => {
    if (validateForm()) {
      errors.value = []
      isLoading.value = true
      const token = await getToken()

      const { data, error } = await useFetch(
        'post',
        'messages',
        {
          body: body.value,
          recipient: username
        },
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      )
      errors.value = error.value
      isLoading.value = false
      if (errors.value.length === 0) {
        body.value = ''
        if (data.value.dataMessage) {
          return utils.toCamel(data.value.dataMessage)
        }
      }
    }
  }
  return {
    body,
    errors,
    isLoading,
    submitForm
  }
}
