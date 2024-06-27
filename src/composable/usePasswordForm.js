import { ref, watch } from 'vue'
import { useFetch } from '@/composable/useFetch'

import { useToken } from '@/composable/useToken'
import utils from '@/utils.js'

export const usePasswordForm = (username) => {
  const password = ref('')
  const newPassword = ref('')
  const passwordConfirm = ref('')
  const errors = ref([])
  const isLoading = ref(false)
  const { getToken } = useToken()

  const validatePassword = () => {
    errors.value.newPassword = []
    utils.validateString(
      newPassword.value,
      'newPassword',
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
    if (newPassword.value !== passwordConfirm.value)
      errors.value.newPassword.push('Пароли не совпадают')
  }

  watch(newPassword, validatePassword)
  watch(passwordConfirm, validatePassword)

  const validateForm = () => {
    errors.value = {}
    validatePassword()
    return errors.value.newPassword.length == 0
  }

  const submitForm = async () => {
    if (validateForm()) {
      errors.value = []
      isLoading.value = true
      const token = await getToken()
      const data = new FormData()
      data.append('password', password.value)
      data.append('new_password', newPassword.value)
      const { error } = await useFetch('put', `user/${username}?update=password`, data, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'multipart/form-data'
      })
      errors.value = error.value
      isLoading.value = false
    }
  }
  return {
    password,
    newPassword,
    passwordConfirm,
    errors,
    isLoading,
    submitForm
  }
}
