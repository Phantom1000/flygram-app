<template>
  <div class="form-wrapper">
    <h1 class="text-center ms-3 my-3">{{ $route.meta.title }}</h1>
    <div class="d-flex align-items-center w-100 m-auto form-signin">
      <form class="text-center w-100" @submit.prevent="submitForm" novalidate>
        <div class="alert alert-danger text-start" v-if="errors.length > 0">
          {{ errors[0] }}
        </div>
        <div class="form-floating">
          <input-component
            type="text"
            id="floatingCode"
            placeholder="Код авторизации"
            v-model="code"
            described="Код должен состоять из 6 цифр."
            :errors="errors.code ?? []"
            label="Код авторизации"
          ></input-component>
        </div>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" v-model="rememberMe" />
            Запомнить меня
          </label>
        </div>
        <button-component type="submit" :is-loading="isLoading" class="w-100 btn-lg btn-primary">
          Войти
        </button-component>
        <p class="mt-5 mb-3 text-muted">© 2024</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useTwoFactorForm } from '@/composable/useTwoFactorForm'

const { code, rememberMe, errors, isLoading, submitForm } = useTwoFactorForm()

watch(errors, () => {
  document.getElementById('floatingCode').focus()
})
</script>
