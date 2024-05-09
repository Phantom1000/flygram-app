<template>
  <UserFormComponent
    v-model:username="username"
    v-model:password="password"
    v-model:passwordConfirm="passwordConfirm"
    v-model:firstname="firstname"
    v-model:lastname="lastname"
    v-model:phoneNumber="phoneNumber"
    v-model:city="city"
    v-model:email="email"
    v-model:address="address"
    v-model:career="career"
    v-model:education="education"
    v-model:hobbies="hobbies"
    v-model:dateBirth="dateBirth"
    v-model:avatar="avatar"
    v-model:errors="errors"
    button-label="Зарегистрироваться"
    @submit-form="sumbitForm"
  ></UserFormComponent>
</template>

<script setup>
import UserFormComponent from '@/components/users/UserFormComponent.vue'
import { useUserForm } from '@/composable/useUserForm.js'

const {
  username,
  password,
  passwordConfirm,
  firstname,
  lastname,
  phoneNumber,
  city,
  email,
  address,
  career,
  education,
  hobbies,
  dateBirth,
  avatar,
  errors,
  sumbitForm
} = useUserForm()
</script>

<style>
.form-register {
  min-width: 600px;
  padding: 15px;
}
</style>
