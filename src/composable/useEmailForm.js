import { ref, watch } from 'vue'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useEmailForm = () => {
  const email = ref('')
  const errors = ref([])
  const isLoading = ref(false)

  const validateEmail = () => {
    errors.value.email = []
    utils.validateString(
      email.value,
      'email',
      errors,
      true,
      'Введите Ваш email',
      5,
      'Длина email не может быть меньше 5 символовв',
      32,
      'Длина email не может быть больше 32 символов',
      false,
      'Пароль не может содержать пробелы',
      /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
      'Проверьте email'
    )
  }

  watch(email, validateEmail)

  const validateForm = () => {
    errors.value = {}
    validateEmail()
    return errors.value.email.length == 0
  }

  const submitForm = async () => {
    if (validateForm()) {
      errors.value = []
      isLoading.value = true
      const { error } = await useFetch(
        'post',
        'password',
        {
          email: email.value
        },
        {
          'Content-Type': 'application/json'
        }
      )
      email.value = ''
      errors.value = error.value
      isLoading.value = false
    }
  }
  return {
    email,
    errors,
    isLoading,
    submitForm
  }
}
