<template>
  <div class="form-wrapper">
    <h1 class="text-center ms-3 my-3">{{ $route.meta.title }}</h1>
    <div class="d-flex align-items-center w-100 m-auto form-signin">
      <form class="text-center w-100" @submit.prevent="submit" novalidate>
        <div class="alert alert-danger text-start" v-if="errors.length > 0">
          {{ errors[0] }}
        </div>
        <div class="form-floating">
          <input-component
            id="floatingUsername"
            placeholder="Имя пользователя"
            v-model="username"
            autocomplete="username"
            :focus="true"
            :errors="errors.username ?? []"
            label="Имя пользователя"
          ></input-component>
        </div>
        <div class="form-floating">
          <input-component
            type="password"
            id="floatingPassword"
            placeholder="Пароль"
            v-model="password"
            autocomplete="current-password"
            :errors="errors.password ?? []"
            label="Пароль"
          ></input-component>
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" v-model="rememberMe" />
            Запомнить меня
          </label>
        </div>
        <button-component type="submit" class="w-100 btn-lg btn-primary" :is-loading="isLoading"
          >Войти</button-component
        >
        <p class="mt-3">
          Нет аккаунта?<RouterLink class="ms-2" :to="{ name: 'register' }"
            >Зарегистрироваться</RouterLink
          >
        </p>
        <p class="mt-3 mb-3 text-muted">© 2024</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useLoginForm } from '@/composable/useLoginForm.js'

const { username, password, rememberMe, submitForm, errors, isLoading } = useLoginForm()

const submit = async () => {
  await submitForm()
}

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
</script>

<style>
.form-wrapper {
  margin: 0 auto;
}

.form-signin {
  min-width: 450px;
  padding: 15px;
}
</style>
