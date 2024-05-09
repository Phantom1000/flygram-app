<template>
  <header class="header">
    <nav class="py-2 border-bottom">
      <div class="container d-flex flex-wrap align-items-center">
        <!--<img src="@/assets/images/logo.png" class="logo" alt="Черные крылья" />-->
        <ul class="nav me-auto">
          <template v-if="currentUser">
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'profile', params: { username: currentUser.username } }"
                class="nav-link px-2 text-white flylink"
                exact-active-class="active"
              >
                Профиль</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'posts' }"
                class="nav-link px-2 text-white flylink"
                exact-active-class="active"
                >Новости</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'friends', params: { username: currentUser.username } }"
                class="nav-link px-2 text-white flylink"
                exact-active-class="active"
                >Друзья</RouterLink
              >
            </li>
            <!-- <li class="nav-item">
              <RouterLink
                :to="{ name: 'friends' }"
                class="nav-link px-2 text-white flylink"
                exact-active-class="active"
                >Сообщества</RouterLink
              >
            </li> -->

            <!-- <li class="nav-item">
              <RouterLink
                v-if="currentUser"
                :to="{ name: 'friends' }"
                class="nav-link px-2 text-white flylink"
                exact-active-class="active"
                >Вакансии</RouterLink
              >
            </li>-->
          </template>
          <template v-else>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'login' }"
                class="nav-link px-2 text-white flylink"
                exact-active-class="active"
                >Войти</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'register' }"
                class="nav-link px-2 text-white flylink"
                exact-active-class="active"
                >Регистрация</RouterLink
              >
            </li>
          </template>
        </ul>
        <div class="dropdown-center" v-if="currentUser">
          <button
            class="btn btn-primary dropdown-toggle d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div class="mini-avatar">
              <img
                :src="API_URL + currentUser.links.avatar"
                width="50"
                height="50"
                v-if="currentUser.links.avatar"
              />
            </div>
          </button>
          <ul class="dropdown-menu">
            <li>
              <RouterLink
                :to="{ name: 'change-password', params: { username: currentUser.username } }"
                class="dropdown-item"
              >
                <FontAwesomeIcon class="me-2" :icon="faLock" />Сменить пароль</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ name: 'edit-profile', params: { username: currentUser.username } }"
                class="dropdown-item"
                ><FontAwesomeIcon class="me-2" :icon="faPenToSquare" />Редактировать
                профиль</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: 'logout' }" class="dropdown-item"
                ><FontAwesomeIcon class="me-2" :icon="faArrowRightFromBracket" />Выйти</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import config from '@/config'

const { currentUser } = storeToRefs(useUserStore())
const API_URL = config.apiUrl
</script>

<style>
.header {
  background-color: #8944e3;
  color: white;
}

.flylink:hover {
  color: #c8c1d0 !important;
}

.flylink.active {
  color: #e4deec !important;
}

.logo {
  width: 50px;
  border-radius: 50px;
}

.mini-avatar {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: gray;
}

.mini-avatar img {
  border-radius: 25px;
  object-fit: cover;
}
</style>
