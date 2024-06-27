<template>
  <section class="container-fluid">
    <SpinnerComponent v-if="isLoading" />

    <div class="row justify-content-center d-flex align-items-start" v-else>
      <h1 class="text-center ms-3 my-3">
        {{ errors && errors.length > 0 ? errors[0] : route.meta.title }}
      </h1>
      <div class="alert alert-danger text-start" v-if="errors.length > 0">
        {{ errors[0] }}
      </div>
      <template v-else-if="currentUser">
        <div class="col-md-12 col-lg-9">
          <ul class="nav d-flex justify-content-center">
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{ name: 'friends', params: { username: currentUser.username } }"
                >Друзья</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{
                  name: 'friends',
                  params: { username: currentUser.username },
                  query: { type: 'followers' }
                }"
                >Подписчики</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{
                  name: 'friends',
                  params: { username: currentUser.username },
                  query: { type: 'following' }
                }"
                >Подписки</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{ name: 'users', query: { type: 'recommended' } }"
                >Рекомендации</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" exact-active-class="active" :to="{ name: 'users' }"
                >Все пользователи</RouterLink
              >
            </li>
          </ul>
          <div class="row mt-3 justify-content-center">
            <div class="col-md-2 col-lg-3 card fly-filter">
              <h2 class="text-center mt-3">Фильтры</h2>
              <form class="card-body" role="search">
                <input
                  v-model.lazy="firstname"
                  class="form-control mt-3"
                  type="search"
                  placeholder="Имя"
                  aria-label="Имя"
                />
                <input
                  v-model.lazy="lastname"
                  class="form-control mt-3"
                  type="search"
                  placeholder="Фамииля"
                  aria-label="Фамилия"
                />
                <input
                  v-model.lazy="city"
                  class="form-control mt-3"
                  type="search"
                  placeholder="Город"
                  aria-label="Город"
                />
                <input
                  v-model.lazy="education"
                  class="form-control mt-3"
                  type="search"
                  placeholder="Образование"
                  aria-label="Образование"
                />
                <input
                  v-model.lazy="career"
                  class="form-control mt-3"
                  type="search"
                  placeholder="Карьера"
                  aria-label="Карьера"
                />
              </form>
            </div>
            <div class="col-md-9 user-list">
              <UserComponent
                v-for="user in users"
                :key="user.username"
                :user="user"
              ></UserComponent>
            </div>
          </div>

          <PaginationComponent label="Страницы пользователей" :meta="meta"></PaginationComponent>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
//   import { watchEffect } from 'vue'
import { useUsers } from '@/composable/useUsers'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import UserComponent from '@/components/users/UserComponent.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import PaginationComponent from '@/components/PaginationComponent.vue'

const { currentUser } = storeToRefs(useUserStore())

const { users, meta, getUsers, isLoading, errors } = useUsers()
const firstname = ref('')
const lastname = ref('')
const education = ref('')
const career = ref('')
const city = ref('')
const route = useRoute()

// getUsers()
watchEffect(() => {
  getUsers({
    username: route.params.username,
    communityId: route.params.id,
    type: route.query.type,
    page: route.query.page,
    firstname: firstname.value,
    lastname: lastname.value,
    city: city.value,
    education: education.value,
    career: career.value
  })
})
</script>

<style>
.fly-filter {
  min-height: 350px;
  max-height: 350px;
}

.user-list {
  min-height: 500px;
}
</style>
