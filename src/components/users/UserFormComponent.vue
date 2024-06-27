<template>
  <div class="form-wrapper">
    <h1 class="text-center ms-3 my-3">{{ $route.meta.title }}</h1>
    <div class="d-flex align-items-center w-100 m-auto form-register">
      <form
        class="text-center w-100"
        @submit.prevent="emit('submitForm')"
        novalidate
        enctype="multipart/form-data"
      >
        <div class="alert alert-danger text-start" v-if="errors.length > 0">
          {{ errors[0] }}
        </div>
        <div class="form-floating">
          <input-component
            id="floatingUsername"
            placeholder="Имя пользователя"
            v-model="username"
            :focus="true"
            autocomplete="username"
            described="Имя пользователя должно состоять из 3–32 символов и не содержать пробелы."
            :errors="errors.username ?? []"
            label="Имя пользователя"
          ></input-component>
        </div>
        <div class="form-floating" v-if="password !== undefined">
          <input-component
            type="password"
            id="floatingPassword"
            placeholder="Пароль"
            v-model="password"
            autocomplete="new-password"
            described="Пароль должен состоять из 8–32 символов и не содержать пробелы."
            :errors="errors.password ?? []"
            label="Пароль"
          ></input-component>
        </div>
        <div class="form-floating" v-if="passwordConfirm !== undefined">
          <input
            type="password"
            class="form-control mb-2"
            :class="['form-control mb-2']"
            id="floatingPasswordConfirm"
            placeholder="Повторите пароль"
            v-model.trim="passwordConfirm"
            required
            minlength="3"
            maxlength="32"
            autocomplete="new-password"
          />
          <label for="floatingPasswordConfirm">Повторите пароль</label>
        </div>

        <div class="form-floating">
          <input-component
            id="floatingFirstname"
            placeholder="Ваше имя"
            v-model="firstname"
            autocomplete="name"
            described="Ваше имя должно состоять из 2–100 символов."
            :errors="errors.firstname ?? []"
            label="Ваше имя"
          ></input-component>
        </div>

        <div class="form-floating">
          <input-component
            id="floatingLastname"
            placeholder="Ваше фамилия"
            v-model="lastname"
            autocomplete="family-name"
            described="Ваша фамилия должна состоять из 2–100 символов."
            :errors="errors.lastname ?? []"
            label="Ваша фамилия"
          ></input-component>
        </div>

        <div class="form-floating">
          <input-component
            type="email"
            id="floatingEmail"
            placeholder="Ваш email"
            v-model="email"
            autocomplete="family-name"
            described="Email должен состоять из 5–100 символов."
            :errors="errors.email ?? []"
            label="Ваш email"
          ></input-component>
        </div>

        <div class="form-floating">
          <input-component
            type="tel"
            id="floatingPhoneNumber"
            placeholder="Номер Вашего телефона"
            v-model="phoneNumber"
            :required="false"
            autocomplete="tel"
            :errors="errors.phoneNumber ?? []"
            label="Номер Вашего телефона"
          ></input-component>
        </div>

        <div>
          <file-component
            id="floatingAvatar"
            placeholder="Загрузите аватар"
            @file-change="onAvatarChanged"
            :errors="errors.avatar ?? []"
            label="Загрузите Вашу фотографию"
          ></file-component>
        </div>

        <div class="form-floating">
          <input-component
            type="date"
            id="floatingDateBirth"
            placeholder="Ваша дата рождения"
            v-model="dateBirth"
            :required="false"
            autocomplete="bday"
            :errors="errors.dateBirth ?? []"
            label="Ваша дата рождения"
          ></input-component>
        </div>

        <div class="form-floating">
          <input-component
            id="floatingCity"
            placeholder="Ваш город"
            v-model="city"
            :required="false"
            :errors="errors.city ?? []"
            label="Ваш город"
          ></input-component>
        </div>

        <div class="form-floating">
          <input-component
            id="floatingAddress"
            placeholder="Ваш адрес"
            v-model="address"
            :required="false"
            :errors="errors.address ?? []"
            label="Ваш адрес"
          ></input-component>
        </div>

        <div class="form-floating">
          <input-component
            id="floatingEducation"
            placeholder="Ваше образование"
            v-model="education"
            :required="false"
            :errors="errors.education ?? []"
            label="Ваш образование"
          ></input-component>
        </div>

        <div class="form-floating">
          <input-component
            id="floatingCareer"
            placeholder="Чем занимаетесь"
            v-model="career"
            :required="false"
            :errors="errors.career ?? []"
            label="Чем занимаетесь"
          ></input-component>
        </div>

        <div class="form-floating">
          <input-component
            id="floatingSkills"
            placeholder="Ваши навыки"
            v-model="skills"
            :required="false"
            :errors="errors.skills ?? []"
            label="Профессиональные навыки"
            described="Введите Ваши профессиональные навыки через запятую"
          ></input-component>
        </div>

        <div class="form-floating">
          <textarea-component
            id="floatingHobbies"
            placeholder=""
            v-model="hobbies"
            :required="false"
            :errors="errors.hobbies ?? []"
            label="Расскажите о себе"
          ></textarea-component>
        </div>
        <button-component
          type="submit"
          :is-loading="props.isLoading"
          class="w-100 btn-lg btn-primary"
        >
          {{ buttonLabel }}
        </button-component>
        <p class="mt-5 mb-3 text-muted">© 2024</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const username = defineModel('username', { required: true })
const password = defineModel('password')
const passwordConfirm = defineModel('passwordConfirm')
const firstname = defineModel('firstname', { required: true })
const lastname = defineModel('lastname', { required: true })
const phoneNumber = defineModel('phoneNumber', { required: true })
const city = defineModel('city', { required: true })
const email = defineModel('email', { required: true })
const address = defineModel('address', { required: true })
const career = defineModel('career', { required: true })
const education = defineModel('education', { required: true })
const hobbies = defineModel('hobbies', { required: true })
const dateBirth = defineModel('dateBirth', { required: true })
const avatar = defineModel('avatar', { required: true })
const skills = defineModel('skills', { required: true })
const errors = defineModel('errors', { required: true })
const props = defineProps({
  buttonLabel: {
    required: true,
    type: String
  },
  isLoading: {
    required: true,
    type: Boolean
  }
})

const emit = defineEmits(['submitForm'])

watch(errors, () => {
  if (errors.value.length > 0) {
    document.getElementById('floatingUsername').focus()
  } else {
    Object.keys(errors.value).some((keyError) => {
      if (errors.value[keyError].length > 0) {
        document
          .getElementById(`floating${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`)
          .focus()
        return true
      }
      return false
    })
  }
})

const onAvatarChanged = (file) => (avatar.value = file)
</script>
