import { ref, watch } from 'vue'
import { useToken } from '@/composable/useToken'
import utils from '@/utils.js'

export const useMessageForm = (socket) => {
  const body = ref('')
  const errors = ref([])
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
      const token = await getToken()

      socket.emit('message', {
        token: token,
        recipient: username,
        body: body.value
      })

      body.value = ''
    }
  }
  return {
    body,
    errors,
    submitForm
  }
}
