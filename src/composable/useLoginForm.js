import { ref, watch } from 'vue'
import { useToken } from '@/composable/useToken'
import { useUserStore } from '@/store/user'
import { useRouter, useRoute } from 'vue-router'
import { useFetch } from '@/composable/useFetch'
import utils from '@/utils.js'

export const useLoginForm = () => {
  const errors = ref([])
  const username = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const isLoading = ref(false)
  const router = useRouter()
  const route = useRoute()

  const validateUsername = () => {
    errors.value.username = []
    utils.validateString(
      username.value,
      'username',
      errors,
      true,
      'Введите имя пользователя',
      3,
      'Длина имени пользователя не может быть меньше 3 символов',
      32,
      'Длина имени пользователя не может быть больше 32 символов',
      false,
      'Имя пользователя не может содержать пробелы',
      /^[a-zA-Z0-9_-]+$/,
      'Только символы латиницы, цифры, знаки дефиса и подчеркивания.'
    )
  }

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
  }

  const validateForm = () => {
    errors.value = {}
    validateUsername()
    validatePassword()
    return errors.value.username.length == 0 && errors.value.password.length == 0
  }

  watch(username, validateUsername)
  watch(password, validatePassword)

  const sendForm = async () => {
    errors.value = []
    isLoading.value = true
    const { data, error } = await useFetch(
      'post',
      'token',
      {
        username: username.value,
        password: password.value,
        remember_me: rememberMe.value
      },
      { 'Content-Type': 'application/json' }
    )
    if (data.value) {
      const { setToken } = useToken()
      const { setCurrentUser } = useUserStore()
      const token = data.value.accessToken
      const user = data.value.user
      if (token) {
        setToken(token, rememberMe.value)
      }
      if (user) {
        setCurrentUser(user)
      }

      router.replace(route.query.redirect ? route.query.redirect : { name: 'posts' })
    }
    errors.value = error.value
    isLoading.value = false
  }

  const submitForm = async () => {
    if (validateForm()) {
      await sendForm()
    }
  }
  return { username, password, rememberMe, errors, isLoading, submitForm }
}
