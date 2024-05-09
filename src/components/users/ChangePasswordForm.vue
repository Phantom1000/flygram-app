<template>
  <div class="form-wrapper">
    <h1 class="text-center ms-3 my-3">{{ $route.meta.title }}</h1>
    <div class="d-flex align-items-center w-100 m-auto form-register">
      <form
        class="text-center w-100"
        @submit.prevent="changePassword"
        novalidate
        enctype="multipart/form-data"
      >
        <div class="alert alert-danger text-start" v-if="errors.length > 0">
          {{ errors[0] }}
        </div>
        <input
          type="text"
          name="username"
          :value="$route.params.username"
          v-show="false"
          autocomplete="username"
        />
        <div class="form-floating">
          <input
            type="password"
            class="form-control mb-2"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.password && errors.password.length > 0
              }
            ]"
            id="floatingPassword"
            placeholder="Пароль"
            v-model="password"
            required
            minlength="8"
            maxlength="32"
            autocomplete="current-password"
          />
          <label for="floatingPassword">Старый пароль</label>
          <template v-if="errors.password && errors.password.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.password"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control mb-2"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.newPassword && errors.newPassword.length > 0
              }
            ]"
            id="floatingNewPassword"
            placeholder="Пароль"
            v-model="newPassword"
            required
            minlength="8"
            maxlength="32"
            autocomplete="new-password"
            aria-describedby="passwordHelp"
          />
          <label for="floatingPassword">Новый пароль</label>
          <template v-if="errors.newPassword && errors.newPassword.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.newPassword"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
          <div v-else id="passwordHelp" class="form-text text-start mb-2">
            Пароль должен состоять из 8–32 символов и не содержать пробелы.
          </div>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control mb-2"
            :class="['form-control mb-2']"
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
        <button type="submit" class="w-100 btn btn-lg btn-success">Сохранить</button>
        <p class="mt-5 mb-3 text-muted">© 2024</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { usePasswordForm } from '@/composable/usePasswordForm'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { password, newPassword, passwordConfirm, errors, submitForm } = usePasswordForm(
  route.params.username
)

const changePassword = () => {
  submitForm()
  if (errors.value.length === 0) {
    router.push({ name: 'profile', params: { username: route.params.username } })
  }
}
</script>
