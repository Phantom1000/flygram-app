import { ref } from 'vue'
import { useFetch } from '@/composable/useFetch'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'
import utils from '@/utils.js'

export const useUserForm = (user = null) => {
  const username = ref('')
  const firstname = ref('')
  const lastname = ref('')
  const email = ref('')
  const phoneNumber = ref('')
  const city = ref('')
  const address = ref('')
  const education = ref('')
  const career = ref('')
  const hobbies = ref('')
  const password = ref('')
  const dateBirth = ref('')
  const avatar = ref('')
  const passwordConfirm = ref('')
  const errors = ref([])
  const router = useRouter()

  const validateForm = () => {
    errors.value = {
      username: [],
      password: [],
      firstname: [],
      lastname: [],
      email: [],
      phoneNumber: [],
      city: [],
      address: [],
      education: [],
      career: [],
      hobbies: [],
      dateBirth: [],
      avatar: []
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
    if (user === null) {
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
      if (password.value != passwordConfirm.value) {
        errors.value.password.push('Пароли не совпадают')
      }
    }

    utils.validateString(
      firstname.value,
      'firstname',
      3,
      32,
      errors,
      'Введите Ваше имя',
      'Длина имени не может быть меньше 3 символов',
      'Длина имени не может быть больше 32 символов'
    )
    utils.validateString(
      lastname.value,
      'lastname',
      3,
      32,
      errors,
      'Введите Вашу фамилию',
      'Длина фамилии не может быть меньше 3 символов',
      'Длина фамилии не может быть больше 32 символов'
    )
    utils.validateString(
      email.value,
      'email',
      5,
      100,
      errors,
      'Введите Ваш email',
      'Длина email не может быть меньше 3 символов',
      'Длина email не может быть больше 32 символов',
      'Email не может содержать пробелы',
      false,
      false
    )
    utils.validateString(
      city.value,
      'city',
      0,
      100,
      errors,
      '',
      '',
      'Длина названия города не может быть больше 100 символов',
      '',
      true,
      false
    )
    utils.validateString(
      address.value,
      'address',
      0,
      100,
      errors,
      '',
      '',
      'Длина адреса не может быть больше 100 символов',
      '',
      true,
      false
    )
    utils.validateString(
      education.value,
      'education',
      0,
      100,
      errors,
      '',
      '',
      'Информация об образовании не может содержать больше 100 символов',
      '',
      true,
      false
    )
    utils.validateString(
      career.value,
      'career',
      0,
      100,
      errors,
      '',
      '',
      'Информация о карьере не может содержать больше 100 символов',
      '',
      true,
      false
    )
    utils.validateString(
      hobbies.value,
      'hobbies',
      0,
      500,
      errors,
      '',
      '',
      'Информация об увлечениях не может содержать больше 500 символов',
      '',
      true,
      false
    )
    const date = Date.parse(dateBirth.value)
    if (dateBirth.value !== '' && (isNaN(date) || date > Date.now())) {
      errors.value.dateBirth.push('Проверьте дату рождения')
    }
    if (
      phoneNumber.value !== '' &&
      phoneNumber.value.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/) === null
    ) {
      errors.value.phoneNumber.push('Проверьте номер телефона')
    }
    if (!email.value.includes('@') || !email.value.includes('.')) {
      errors.value.email.push('Проверьте email')
    }
    let result = true
    for (let field in errors.value) {
      if (errors.value[field].length > 0) {
        result = false
      }
    }
    return result
  }

  const sumbitForm = async () => {
    if (validateForm()) {
      errors.value = []
      const { token } = useTokenStore()
      const userData = new FormData()
      userData.append('username', username.value.trim())
      userData.append('firstname', firstname.value.trim())
      userData.append('lastname', lastname.value.trim())
      if (phoneNumber.value.trim()) userData.append('phone_number', phoneNumber.value.trim())
      userData.append('email', email.value.trim())
      if (city.value.trim()) userData.append('city', city.value.trim())
      if (dateBirth.value.trim()) userData.append('date_birth', dateBirth.value.trim())
      if (avatar.value) userData.append('avatar', avatar.value)
      if (hobbies.value.trim()) userData.append('hobbies', hobbies.value.trim())
      if (education.value.trim()) userData.append('education', education.value.trim())
      if (career.value.trim()) userData.append('career', career.value.trim())

      if (user === null) {
        userData.append('password', password.value.trim())
      }
      const { data, error } = await useFetch(
        user === null ? 'post' : 'put',
        user === null ? 'users' : `user/${user.value.username}`,
        userData,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'multipart/form-data'
        }
      )
      errors.value = error.value
      if (errors.value.length === 0) {
        if (user !== null) {
          const { setCurrentUser } = useUserStore()
          // setCurrentUser(Object.fromEntries(data))
          setCurrentUser(utils.toCamel(data.value.user))
        }
        router.replace(
          user === null
            ? { name: 'login' }
            : { name: 'profile', params: { username: username.value } }
        )
      } else {
        scrollTo(0, 0)
      }
    }
  }
  return {
    username,
    firstname,
    lastname,
    email,
    phoneNumber,
    dateBirth,
    city,
    address,
    education,
    career,
    hobbies,
    avatar,
    password,
    passwordConfirm,
    errors,
    sumbitForm
  }
}
