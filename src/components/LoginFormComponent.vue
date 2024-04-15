<template>
  <div class="d-flex align-items-center w-100 m-auto form-signin">
    <form class="text-center w-100">
      <div class="alert alert-danger text-start" v-if="errors.length > 0">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="form-floating">
        <input type="text" class="form-control mb-2" id="floatingInput" placeholder="Имя пользователя"
          v-model="username" />
        <label for="floatingInput">Имя пользователя</label>
        <div class="alert alert-danger text-start" v-if="errors.username && errors.username.length > 0">
          <ul>
            <li v-for="(error, index) in errors.username" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control mb-2" id="floatingPassword" placeholder="Пароль"
          v-model="password" />
        <label for="floatingPassword">Пароль</label>
        <div class="alert alert-danger text-start" v-if="errors.password && errors.password.length > 0">
          <ul>
            <li v-for="(error, index) in errors.password" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" v-model="rememberMe" />
          Запомнить меня
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="button" @click="sumbitForm">
        Войти
      </button>
      <p class="mt-5 mb-3 text-muted">© 2024</p>
    </form>
  </div>
</template>

<script setup>
import { useLoginForm } from "@/composable/useLoginForm.js";


const { username, password, rememberMe, sumbitForm, errors } =
  useLoginForm();

</script>