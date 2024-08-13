<template>
  <div class="form-wrapper">
    <h1 class="text-center ms-3 my-3">{{ $route.meta.title }}</h1>
    <div class="d-flex align-items-center w-100 m-auto form-register">
      <form class="text-center w-100" @submit.prevent="submitForm" novalidate>
        <div class="alert alert-danger text-start" v-if="errors.length > 0">
          {{ errors[0] }}
        </div>
        <div class="form-floating">
          <input-component
            type="email"
            id="floatingEmail"
            placeholder="Ваш email"
            v-model="email"
            autocomplete="email"
            described="Email должен состоять из 5–100 символов."
            :errors="errors.email ?? []"
            label="Ваш email"
          ></input-component>
        </div>
        <button-component type="submit" :is-loading="isLoading" class="w-100 btn-lg btn-primary">
          Сбросить пароль
        </button-component>
        <p class="mt-5 mb-3 text-muted">© 2024</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useEmailForm } from '@/composable/useEmailForm'

const { email, errors, isLoading, submitForm } = useEmailForm()

watch(errors, () => {
  document.getElementById('floatingEmail').focus()
})
</script>
