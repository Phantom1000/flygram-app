import { ref, watch } from 'vue'
import { useFetch } from '@/composable/useFetch'
import { useToken } from '@/composable/useToken'
import { useUserStore } from '@/store/user'
import { useRouter, useRoute } from 'vue-router'
import { useTwoFactorToken } from '@/store/twoFactorToken'
import utils from '@/utils.js'

export const useTwoFactorForm = () => {
  const code = ref('')
  const errors = ref([])
  const isLoading = ref(false)
  const router = useRouter()
  const route = useRoute()
  const rememberMe = ref(route.query.rememberMe)
  const { twoFactorToken } = useTwoFactorToken()

  const validateCode = () => {
    errors.value.code = []
    utils.validateString(
      code.value,
      'code',
      errors,
      true,
      'Введите код авторизации',
      6,
      'Длина кода не может быть меньше 6 символовв',
      6,
      'Длина кода не может быть больше 6 символов',
      false,
      'Код не может содержать пробелы',
      /^\d+$/,
      'Код должен содержать только цифры'
    )
  }

  watch(code, validateCode)

  const validateForm = () => {
    errors.value = {}
    validateCode()
    return errors.value.code.length == 0
  }

  const submitForm = async () => {
    if (validateForm()) {
      errors.value = []
      isLoading.value = true
      const { data, error } = await useFetch(
        'post',
        'token',
        {
          code: code.value,
          remember_me: rememberMe.value,
          two_factor: true
        },
        {
          token: twoFactorToken,
          'Content-Type': 'application/json'
        }
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
  }
  return {
    code,
    rememberMe,
    errors,
    isLoading,
    submitForm
  }
}
