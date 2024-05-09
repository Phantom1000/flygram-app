<template>
  <div class="form-wrapper">
    <h1 class="text-center ms-3 my-3">{{ $route.meta.title }}</h1>
    <div class="d-flex align-items-center w-100 m-auto form-signin">
      <form class="text-center w-100" @submit.prevent="submitForm" novalidate>
        <div class="alert alert-danger text-start" v-if="errors.length > 0">
          {{ errors[0] }}
        </div>
        <div class="form-floating">
          <input
            type="text"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.username && errors.username.length > 0
              }
            ]"
            id="floatingInput"
            placeholder="Имя пользователя"
            v-model="username"
            autocomplete="username"
            required
            autofocus
          />
          <label for="floatingInput">Имя пользователя</label>
          <template v-if="errors.username && errors.username.length > 0">
            <div
              class="invalid-feedback text-start mb-2"
              v-for="(error, index) in errors.username"
              :key="index"
            >
              {{ error }}
            </div>
          </template>
        </div>
        <div class="form-floating">
          <input
            type="password"
            :class="[
              'form-control mb-2',
              {
                'is-invalid': errors.password && errors.password.length > 0
              }
            ]"
            id="floatingPassword"
            placeholder="Пароль"
            v-model="password"
            autocomplete="current-password"
            required
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
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" v-model="rememberMe" />
            Запомнить меня
          </label>
        </div>
        <button type="submit" class="w-100 btn btn-lg btn-primary">Войти</button>
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
import { useLoginForm } from '@/composable/useLoginForm.js'

const { username, password, rememberMe, submitForm, errors } = useLoginForm()
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
