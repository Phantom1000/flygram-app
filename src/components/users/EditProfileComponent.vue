<template>
  <SpinnerComponent v-if="isLoading" />
  <UserFormComponent
    v-else
    v-model:username="username"
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
    button-label="Сохранить изменения"
    @submit-form="sumbitForm"
  ></UserFormComponent>
</template>

<script setup>
import UserFormComponent from '@/components/users/UserFormComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { useUserForm } from '@/composable/useUserForm.js'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'

const { currentUser } = storeToRefs(useUserStore())
const isLoading = ref(currentUser.value === null)

const {
  username,
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
} = useUserForm(currentUser)

watchEffect(() => {
  isLoading.value = currentUser.value === null
  if (!isLoading.value) {
    username.value = currentUser.value.username
    firstname.value = currentUser.value.firstname
    lastname.value = currentUser.value.lastname
    email.value = currentUser.value.email
    phoneNumber.value = currentUser.value.phoneNumber || ''
    city.value = currentUser.value.city || ''
    address.value = currentUser.value.address || ''
    education.value = currentUser.value.education || ''
    career.value = currentUser.value.career || ''
    hobbies.value = currentUser.value.hobbies || ''
    dateBirth.value = currentUser.value.dateBirth || ''
  }
})
</script>

<style>
.form-register {
  min-width: 600px;
  padding: 15px;
}
</style>
