<template>
  <section class="container">
    <SpinnerComponent v-if="isLoadingVacancy" />
    <div class="row justify-content-center" v-else-if="currentUser">
      <h1 class="text-center ms-3 my-3">
        {{ errors && errors.length > 0 ? errors[0] : route.params.username }}
      </h1>
      <div class="alert alert-danger text-start" v-if="errors && errors.length > 0">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="col-lg-9" v-else><VacancyComponent :vacancy="vacancy"></VacancyComponent></div>

      <div class="col-lg-8 d-flex mt-5 row" v-if="!isLoading">
        <h2 class="text-center mb-3">Возможные сотрудники</h2>
        <UserComponent v-for="user in users" :key="user.username" :user="user"> </UserComponent>
        <PaginationComponent label="Страницы пользователей" :meta="meta"></PaginationComponent>
      </div>
    </div>
  </section>
</template>

<script setup>
import VacancyComponent from '@/components/vacancies/VacancyComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { useVacancy } from '@/composable/useVacancy'
import { useUsers } from '@/composable/useUsers'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import UserComponent from '@/components/users/UserComponent.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import PaginationComponent from '@/components/PaginationComponent.vue'

const { currentUser } = storeToRefs(useUserStore())

const { vacancy, errors, fetchVacancy, isLoadingVacancy } = useVacancy()
const { users, meta, getUsers, isLoading } = useUsers()

const route = useRoute()

getUsers({
  page: route.query.page,
  vacancyId: route.params.id
})

watchEffect(() => {
  fetchVacancy(route.params.id, 'get')
  getUsers({
    page: route.query.page,
    vacancyId: route.params.id
  })
})
</script>
