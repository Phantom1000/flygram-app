import { ref, watch } from 'vue'
import { useFetch } from '@/composable/useFetch'
import { useRoute } from 'vue-router'
import utils from '@/utils.js'

export const useResetPasswordForm = () => {
  const password = ref('')
  const passwordConfirm = ref('')
  const errors = ref([])
  const isLoading = ref(false)
  const route = useRoute()

  const validatePassword = () => {
    errors.value.password = []
    utils.validateString(
      password.value,
      'password',
      errors,
      true,
      'Введите пароль',
      8,
      'Длина пароля не может быть меньше 8 символов',
      32,
      'Длина пароля не может быть больше 32 символов',
      false,
      'Пароль не может содержать пробелы'
    )
    if (password.value !== passwordConfirm.value) errors.value.password.push('Пароли не совпадают')
  }

  watch(password, validatePassword)
  watch(passwordConfirm, validatePassword)

  const validateForm = () => {
    errors.value = {}
    validatePassword()
    return errors.value.password.length == 0
  }

  const submitForm = async () => {
    if (validateForm()) {
      errors.value = []
      isLoading.value = true
      const { error } = await useFetch(
        'put',
        'password',
        {
          password: password.value
        },
        {
          Token: route.query.token,
          'Content-Type': 'application/json'
        }
      )
      errors.value = error.value
      isLoading.value = false
    }
  }
  return {
    password,
    passwordConfirm,
    errors,
    isLoading,
    submitForm
  }
}
