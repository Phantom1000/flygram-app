import { ref } from 'vue'
import { useFetch } from '@/composable/useFetch'

import { useTokenStore } from '@/store/token'
import utils from '@/utils.js'

export const usePasswordForm = (username) => {
  const password = ref('')
  const newPassword = ref('')
  const passwordConfirm = ref('')
  const errors = ref([])

  const validateForm = () => {
    errors.value = {
      newPassword: []
    }
    utils.validateString(
      newPassword.value,
      'newPassword',
      8,
      32,
      errors,
      'Введите пароль',
      'Длина пароля не может быть меньше 8 символов',
      'Длина пароля не может быть больше 32 символов',
      'Пароль не может содержать пробелы',
      false
    )
    if (newPassword.value != passwordConfirm.value) {
      errors.value.newPassword.push('Пароли не совпадают')
    }

    return errors.value.newPassword.length == 0
  }

  const submitForm = async () => {
    console.log('!')
    if (validateForm()) {
      errors.value = []
      const { token } = useTokenStore()
      const data = new FormData()
      data.append('password', password.value.trim())
      data.append('new_password', newPassword.value.trim())
      const { error } = await useFetch('put', `user/${username}?update=password`, data, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'multipart/form-data'
      })
      errors.value = error.value
    }
  }
  return {
    password,
    newPassword,
    passwordConfirm,
    errors,
    submitForm
  }
}
