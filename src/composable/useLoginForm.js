import { ref } from 'vue'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'
import { useRouter, useRoute } from 'vue-router'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useLoginForm = () => {
  const errors = ref([])
  const username = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const router = useRouter()
  const route = useRoute()

  const validateForm = () => {
    errors.value = {
      username: [],
      password: []
    }
    utils.validateString(
      username.value,
      'username',
      3,
      32,
      errors,
      'Введите имя пользователя',
      'Длина имени пользователя не может быть меньше 3 символов',
      'Длина имени пользователя не может быть больше 32 символов',
      'Имя пользователя не может содержать пробелы',
      false
    )
    utils.validateString(
      password.value,
      'password',
      8,
      32,
      errors,
      'Введите пароль',
      'Длина пароля не может быть меньше 8 символов',
      'Длина пароля не может быть больше 32 символов',
      'Пароль не может содержать пробелы',
      false
    )
    return errors.value.username.length == 0 && errors.value.password.length == 0
  }

  const sendForm = async () => {
    errors.value = []
    const { data, error } = await useFetch(
      'post',
      'token',
      {
        username: username.value.trim(),
        password: password.value.trim(),
        remember_me: rememberMe.value
      },
      { 'Content-Type': 'application/json' }
    )
    if (data.value) {
      const { setToken } = useTokenStore()
      const { setCurrentUser } = useUserStore()
      const token = data.value.token
      if (token) {
        setToken(token, rememberMe.value)
      }
      const userResponse = await useFetch(
        'get',
        'user/current',
        {},
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      )
      if (userResponse.data.value) {
        setCurrentUser(userResponse.data.value)
      }

      if (userResponse.error.value.length === 0) {
        router.replace(route.query.redirect ? route.query.redirect : { name: 'posts' })
      }
      errors.value = userResponse.error.value
    }
    errors.value = errors.value.concat(error.value)
  }

  const submitForm = () => {
    if (validateForm()) {
      sendForm()
    }
  }
  return { username, password, rememberMe, errors, submitForm }
}
