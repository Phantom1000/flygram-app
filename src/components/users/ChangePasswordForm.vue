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
          <input-component
            type="password"
            id="floatingPassword"
            placeholder="Пароль"
            v-model="password"
            autocomplete="current-password"
            described=""
            :errors="errors.password ?? []"
            label="Старый пароль"
          ></input-component>
        </div>
        <div class="form-floating">
          <input-component
            type="password"
            id="floatingNewPassword"
            placeholder="Пароль"
            v-model="newPassword"
            autocomplete="new-password"
            described="Пароль должен состоять из 8–32 символов и не содержать пробелы."
            :errors="errors.newPassword ?? []"
            label="Новый пароль"
          ></input-component>
        </div>
        <div class="form-floating">
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
        <button-component type="submit" :is-loading="isLoading" class="w-100 btn-lg btn-success">
          Сохранить
        </button-component>
        <p class="mt-5 mb-3 text-muted">© 2024</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { usePasswordForm } from '@/composable/usePasswordForm'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { password, newPassword, passwordConfirm, errors, isLoading, submitForm } = usePasswordForm(
  route.params.username
)

const changePassword = async () => {
  await submitForm()
  if (errors.value.length === 0) {
    router.push({ name: 'profile', params: { username: route.params.username } })
  }
}

watch(errors, () => {
  if (errors.value.length > 0) {
    document.getElementById('floatingPassword').focus()
  } else {
    Object.keys(errors.value).forEach((keyError) => {
      if (errors.value[keyError].length > 0) {
        document
          .getElementById(`floating${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`)
          .focus()
      }
    })
  }
})
</script>
