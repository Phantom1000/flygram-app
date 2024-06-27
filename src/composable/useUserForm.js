import { ref, watch } from 'vue'
import { useFetch } from '@/composable/useFetch'
import { useRouter } from 'vue-router'
import { useToken } from '@/composable/useToken'
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
  const skills = ref('')
  const errors = ref([])
  const router = useRouter()
  const isLoadingUser = ref(false)
  const { getToken } = useToken()

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
      /^[a-zA-Z0-9_-]+$/i,
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
    if (password.value !== passwordConfirm.value) errors.value.password.push('Пароли не совпадают')
  }

  const validateFirstname = () => {
    errors.value.firstname = []
    utils.validateString(
      firstname.value,
      'firstname',
      errors,
      true,
      'Введите Ваше имя',
      3,
      'Длина имени не может быть меньше 3 символов',
      32,
      'Длина пользователя не может быть больше 32 символов'
    )
  }

  const validateLastname = () => {
    errors.value.lastname = []
    utils.validateString(
      lastname.value,
      'lastname',
      errors,
      true,
      'Введите Вашу фамилию',
      3,
      'Длина фамилии не может быть меньше 3 символов',
      32,
      'Длина фамилии не может быть больше 32 символов',
      false,
      'Пароль не может содержать пробелы'
    )
  }

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

  const validatePhoneNumber = () => {
    errors.value.phoneNumber = []
    utils.validateString(
      phoneNumber.value,
      'phoneNumber',
      errors,
      false,
      '',
      0,
      '',
      32,
      'Длина номера не может быть больше 32 символов',
      false,
      'Номер не может содержать пробелы',
      /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
      'Проверьте номер телефона'
    )
  }

  const validateCity = () => {
    errors.value.city = []
    utils.validateString(
      city.value,
      'city',
      errors,
      false,
      '',
      0,
      '',
      100,
      'Длина названия города не может быть больше 100 символов'
    )
  }

  const validateAddress = () => {
    errors.value.address = []
    utils.validateString(
      address.value,
      'address',
      errors,
      false,
      '',
      0,
      '',
      100,
      'Длина адреса не может быть больше 100 символов'
    )
  }

  const validateEducation = () => {
    errors.value.education = []
    utils.validateString(
      education.value,
      'education',
      errors,
      false,
      '',
      0,
      '',
      100,
      'Информация об образовании не может содержать больше 100 символов'
    )
  }

  const validateCareer = () => {
    errors.value.career = []
    utils.validateString(
      career.value,
      'career',
      errors,
      false,
      '',
      0,
      '',
      100,
      'Информация о карьере не может содержать больше 100 символов'
    )
  }

  const validateSkills = () => {
    errors.value.skills = []
    utils.validateString(
      skills.value,
      'skills',
      errors,
      false,
      '',
      0,
      '',
      100,
      'Длина навыков не может быть больше 100 символов',
      false,
      'Навыки не могут содержать пробелы'
    )
  }

  const validateHobbies = () => {
    errors.value.hobbies = []
    utils.validateString(
      hobbies.value,
      'hobbies',
      errors,
      false,
      '',
      0,
      '',
      500,
      'Информация об увлечениях не может содержать больше 500 символов'
    )
  }

  const validateDateBirth = () => {
    errors.value.dateBirth = []
    const date = Date.parse(dateBirth.value)
    if (dateBirth.value !== '' && (isNaN(date) || date > Date.now())) {
      errors.value.dateBirth.push('Проверьте дату рождения')
    }
  }

  watch(username, validateUsername)
  watch(password, validatePassword)
  watch(passwordConfirm, validatePassword)
  watch(firstname, validateFirstname)
  watch(lastname, validateLastname)
  watch(email, validateEmail)
  watch(city, validateCity)
  watch(address, validateAddress)
  watch(dateBirth, validateDateBirth)
  watch(phoneNumber, validatePhoneNumber)
  watch(education, validateEducation)
  watch(career, validateCareer)
  watch(skills, validateSkills)
  watch(hobbies, validateHobbies)

  const validateForm = () => {
    errors.value = {}
    validateUsername()
    if (user === null) {
      validatePassword()
    }
    validateFirstname()
    validateLastname()
    validateEmail()
    validateCity()
    validateDateBirth()
    validatePhoneNumber()
    validateAddress()
    validateEducation()
    validateCareer()
    validateSkills()
    validateHobbies()
    let result = true
    for (let field in errors.value) {
      if (errors.value[field].length > 0) {
        result = false
      }
    }
    return result
  }

  const submitForm = async () => {
    console.log('asdasd')
    if (validateForm()) {
      errors.value = []
      isLoadingUser.value = true
      //const { token } = useTokenStore()
      const token = await getToken()
      const userData = new FormData()
      userData.append('username', username.value)
      userData.append('firstname', firstname.value)
      userData.append('lastname', lastname.value)
      if (phoneNumber.value) userData.append('phone_number', phoneNumber.value)
      userData.append('email', email.value)
      if (city.value) userData.append('city', city.value)
      if (dateBirth.value) userData.append('date_birth', dateBirth.value)
      if (avatar.value) userData.append('avatar', avatar.value)
      if (hobbies.value) userData.append('hobbies', hobbies.value)
      if (education.value) userData.append('education', education.value)
      if (career.value) userData.append('career', career.value)
      if (skills.value) userData.append('skills', skills.value)

      if (user === null) {
        userData.append('password', password.value)
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
      }
      isLoadingUser.value = false
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
    skills,
    password,
    passwordConfirm,
    errors,
    isLoadingUser,
    submitForm
  }
}
