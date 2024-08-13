<template>
  <section class="container">
    <SpinnerComponent v-if="isLoadingSessions" />
    <div class="row justify-content-center d-flex align-items-center" v-else>
      <h1 class="text-center ms-3 my-3">
        {{ errors && errors.length > 0 ? errors[0] : route.meta.title }}
      </h1>
      <div class="alert alert-danger text-start" v-if="errors && errors.length > 0">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <template v-else-if="currentUser">
        <div class="col-md-12 col-lg-9">
          <div class="row mb-3 col-md-6">
            <RouterLink
              :to="{ name: 'change-password', params: { username: currentUser.username } }"
              class="btn btn-success"
              >Сменить пароль</RouterLink
            >
          </div>
          <div class="row mb-3 col-md-6">
            <RouterLink
              :to="{ name: 'delete-profile', params: { username: currentUser.username } }"
              class="btn btn-danger"
              >Удалить аккаунт</RouterLink
            >
          </div>
          <div class="row mb-3 col-md-6" v-if="!currentUser.verified_email">
            <RouterLink :to="{ name: 'verify-email' }" class="btn btn-primary"
              >Подтвердить почту</RouterLink
            >
          </div>
          <div
            class="row mb-3 col-md-6"
            v-if="currentUser.verified_email && !currentUser.two_factor_enabled"
          >
            <button @click="setTwoFactor" class="btn btn-primary">
              Включить двухфакторную аутентификацию
            </button>
          </div>
          <div
            class="row mb-3 col-md-6"
            v-if="currentUser.verified_email && currentUser.two_factor_enabled"
          >
            <button @click="setTwoFactor" class="btn btn-danger">
              Отключить двухфакторную аутентификацию
            </button>
          </div>
          <h2 class="text-center mb-2 mt-4">Активные сеансы</h2>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center" scope="col">IP адрес</th>
                <th class="text-center" scope="col">Устройство</th>
                <th class="text-center" scope="col">Дата входа</th>
                <th class="text-center" scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              <SessionComponent
                v-for="session in sessions"
                @delete-session="deleteSession"
                :key="session.id"
                :session="session"
              ></SessionComponent>
            </tbody>
          </table>

          <PaginationComponent label="Страницы сеансов" :meta="meta"></PaginationComponent>

          <div class="row mb-3 col-md-6">
            <button class="btn btn-danger" @click="deleteAllSessions">Завершить все сеансы</button>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import SessionComponent from '@/components/users/SessionComponent.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import { useUserStore } from '@/store/user'
import { useSessions } from '@/composable/useSessions'
import { useSessionActions } from '@/composable/useSessionActions'
import { storeToRefs } from 'pinia'

const { currentUser } = storeToRefs(useUserStore())
const route = useRoute()

const { sessions, meta, getSessions, isLoadingSessions, errors } = useSessions()
const { enableTwoFactor, disableTwoFactor, deleteSessions, actionErrors } = useSessionActions()

watchEffect(() => {
  getSessions({
    page: route.query.page
  })
})

const setTwoFactor = async () => {
  if (currentUser.value.two_factor_enabled) {
    await disableTwoFactor()
  } else {
    await enableTwoFactor()
  }
  if (actionErrors.value.length === 0)
    currentUser.value.two_factor_enabled = !currentUser.value.two_factor_enabled
}

const deleteSession = (session) => {
  sessions.value = sessions.value.filter((item) => item !== session)
}

const deleteAllSessions = async () => {
  await deleteSessions()
  sessions.value = []
}
</script>
