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
          <input
            type="text"
            :class="[
              'form-control mb-2',
              {
                'border border-danger': username === '',
                'is-invalid': errors.username && errors.username.length > 0
              }
            ]"
            id="floatingUsername"
            placeholder="Имя пользователя"
            v-model="username"
            required
            minlength="3"
            autofocus
            maxlength="32"
            autocomplete="username"
            aria-describedby="usernameHelp"
          />
          <label for="floatingUsername">Имя пользователя</label>
          <template v-if="errors.username && errors.username.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.username"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
          <div v-else id="usernameHelp" class="form-text text-start mb-2">
            Имя пользователя должно состоять из 3–32 символов и не содержать пробелы.
          </div>
        </div>
        <div class="form-floating" v-if="password !== undefined">
          <input
            type="password"
            class="form-control mb-2"
            :class="[
              'form-control mb-2',
              {
                'border border-danger': password === '',
                'is-invalid': errors.password && errors.password.length > 0
              }
            ]"
            id="floatingPassword"
            placeholder="Пароль"
            v-model="password"
            required
            minlength="8"
            maxlength="32"
            autocomplete="new-password"
            aria-describedby="passwordHelp"
          />
          <label for="floatingPassword">Пароль</label>
          <template v-if="errors.password && errors.password.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.password"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
          <div v-else id="passwordHelp" class="form-text text-start mb-2">
            Пароль должен состоять из 8–32 символов и не содержать пробелы.
          </div>
        </div>
        <div class="form-floating" v-if="passwordConfirm !== undefined">
          <input
            type="password"
            class="form-control mb-2"
            :class="[
              'form-control mb-2',
              {
                'border border-danger': passwordConfirm === ''
              }
            ]"
            id="floatingPasswordConfirm"
            placeholder="Повторите пароль"
            v-model="passwordConfirm"
            required
            minlength="3"
            maxlength="32"
            autocomplete="new-password"
          />
          <label for="floatingPasswordConfirm">Повторите пароль</label>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control mb-2"
            :class="[
              'form-control mb-2',
              {
                'border border-danger': firstname === '',
                'is-invalid': errors.firstname && errors.firstname.length > 0
              }
            ]"
            id="floatingFirstname"
            placeholder="Ваше имя"
            v-model="firstname"
            required
            minlength="2"
            maxlength="100"
            autocomplete="name"
            aria-describedby="firstnameHelp"
          />
          <label for="floatingFirstname">Ваше имя</label>
          <template v-if="errors.firstname && errors.firstname.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.firstname"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
          <div v-else id="firstnameHelp" class="form-text text-start mb-2">
            Ваше имя должно состоять из 2–32 символов.
          </div>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control mb-2"
            :class="[
              'form-control mb-2',
              {
                'border border-danger': lastname === '',
                'is-invalid': errors.lastname && errors.lastname.length > 0
              }
            ]"
            id="floatingLastname"
            placeholder="Ваша фамилия"
            v-model="lastname"
            required
            minlength="2"
            autocomplete="family-name"
            maxlength="100"
            aria-describedby="lastnameHelp"
          />
          <label for="floatingLastname">Ваша фамилия</label>
          <template v-if="errors.lastname && errors.lastname.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.lastname"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
          <div v-else id="lastnameHelp" class="form-text text-start mb-2">
            Ваша фамилия должна состоять из 2–32 символов.
          </div>
        </div>

        <div class="form-floating">
          <input
            type="email"
            class="form-control mb-2"
            :class="[
              'form-control mb-2',
              {
                'border border-danger': email === '',
                'is-invalid': errors.email && errors.email.length > 0
              }
            ]"
            id="floatingEmail"
            placeholder="Ваш email"
            v-model="email"
            required
            minlength="5"
            maxlength="100"
            autocomplete="email"
            aria-describedby="emailHelp"
          />
          <label for="floatingEmail">Ваш email</label>
          <template v-if="errors.email && errors.email.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.email"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
          <div v-else id="emailHelp" class="form-text text-start mb-2">
            Email должен состоять из 5–100 символов.
          </div>
        </div>

        <div class="form-floating">
          <input
            type="tel"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.phoneNumber && errors.phoneNumber.length > 0
              }
            ]"
            id="floatingPhoneNumber"
            placeholder="Номер Вашего телефона"
            v-model="phoneNumber"
            minlength="2"
            maxlength="20"
            autocomplete="tel"
          />
          <label for="floatingPhoneNumber">Номер Вашего телефона</label>
          <template v-if="errors.phoneNumber && errors.phoneNumber.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.phoneNumber"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
        </div>

        <div>
          <input
            type="file"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.avatar && errors.avatar.length > 0
              }
            ]"
            id="avatarFile"
            placeholder="Загрузите аватар"
            @change="onAvatarChanged"
            accept="image/*"
            aria-describedby="avatarHelp"
          />
          <div id="avatarHelp" class="form-text text-start mb-2">Загрузите Вашу фотографию</div>
          <template v-if="errors.avatar && errors.avatar.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.avatar"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
        </div>

        <div class="form-floating">
          <input
            type="date"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.dateBirth && errors.dateBirth.length > 0
              }
            ]"
            id="floatingDateBirth"
            placeholder="Ваша дата рождения"
            v-model="dateBirth"
            autocomplete="bday"
          />
          <label for="floatingDateBirth">Ваша дата рождения</label>
          <template v-if="errors.dateBirth && errors.dateBirth.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.dateBirth"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
        </div>

        <div class="form-floating">
          <input
            type="text"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.city && errors.city.length > 0
              }
            ]"
            id="floatingCity"
            placeholder="Ваш город"
            v-model="city"
            maxlength="100"
          />
          <label for="floatingCity">Ваш город</label>
          <template v-if="errors.city && errors.city.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.city"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
        </div>

        <div class="form-floating">
          <input
            type="text"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.address && errors.address.length > 0
              }
            ]"
            id="floatingAddress"
            placeholder="Ваш адрес"
            v-model="address"
            maxlength="100"
          />
          <label for="floatingAddress">Ваш адрес</label>
          <template v-if="errors.address && errors.address.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.address"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
        </div>

        <div class="form-floating">
          <input
            type="text"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.education && errors.education.length > 0
              }
            ]"
            id="floatingEducation"
            placeholder="Ваше образование"
            v-model="education"
            required
            maxlength="100"
          />
          <label for="floatingEducation">Ваше образование</label>
          <template v-if="errors.education && errors.education.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.education"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
        </div>

        <div class="form-floating">
          <input
            type="text"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.career && errors.career.length > 0
              }
            ]"
            id="floatingCareer"
            placeholder="Чем занимаетесь"
            v-model="career"
            maxlength="100"
          />
          <label for="floatingCareer">Чем занимаетесь</label>
          <template v-if="errors.career && errors.career.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.career"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
        </div>

        <div class="form-floating">
          <textarea
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.hobbies && errors.hobbies.length > 0
              }
            ]"
            placeholder=""
            id="floatingHobbies"
            v-model="hobbies"
            maxlength="500"
            style="height: 150px"
          ></textarea>
          <label for="floatingHobbies">Расскажите о себе</label>
          <template v-if="errors.hobbies && errors.hobbies.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.hobbies"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
        </div>
        <button type="submit" class="w-100 btn btn-lg btn-primary">{{ buttonLabel }}</button>
        <p class="mt-5 mb-3 text-muted">© 2024</p>
      </form>
    </div>
  </div>
</template>

<script setup>
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
const errors = defineModel('errors', { required: true })
defineProps({
  buttonLabel: {
    required: true,
    type: String
  }
})

const emit = defineEmits(['submitForm'])

const onAvatarChanged = (event) => {
  const target = event.target
  if (target && target.files) {
    avatar.value = target.files[0]
  }
}
</script>
