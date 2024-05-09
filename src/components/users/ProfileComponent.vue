<template>
  <section class="container">
    <SpinnerComponent v-if="isLoading" />
    <div class="row" v-else>
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
      <template v-else>
        <div class="row d-flex justify-content-between">
          <div class="d-flex align-items-center col-md-6">
            <div class="col-md-4 col-lg-3">
              <div class="avatar">
                <img
                  :src="API_URL + user.links.avatar"
                  width="150"
                  height="150"
                  v-if="user.links.avatar"
                />
              </div>
            </div>

            <div class="col-md-6 ms-3">
              <div class="row">
                <h2>{{ user.firstname }} {{ user.lastname }}{{ age }}</h2>
                <p class="mt-2">{{ user.city ?? '' }} {{ user.career ?? '' }}</p>
              </div>
              <div class="row mt-3">
                <button
                  type="button"
                  class="btn-underline"
                  data-bs-toggle="modal"
                  data-bs-target="#userInfo"
                >
                  Подробнее
                </button>
              </div>
              <div>
                <RouterLink :to="{ name: 'friends', params: { username: route.params.username } }"
                  >{{ user.friendsCount }} друзей</RouterLink
                >
              </div>
              <div>
                <RouterLink
                  :to="{
                    name: 'friends',
                    params: { username: route.params.username },
                    query: { type: 'followers' }
                  }"
                  >{{ user.followersCount }} подписчиков</RouterLink
                >
              </div>
            </div>
          </div>
          <div
            class="col-lg-8 mt-4"
            v-if="currentUser && currentUser.username !== route.params.username"
          >
            <button @click="removeFriend" v-if="user.isFriend" class="btn btn-danger fly-btn">
              Удалить из друзей
            </button>
            <button
              @click="removeFriend"
              v-else-if="user.isFollower"
              class="btn btn-danger fly-btn"
            >
              Отменить заявку
            </button>
            <button
              @click="acceptFriend"
              v-else-if="user.isFollowing"
              class="btn btn-success fly-btn"
            >
              Принять заявку
            </button>
            <button @click="addFriend" v-else class="btn btn-primary fly-btn">
              Добавить в друзья
            </button>
          </div>
          <div
            v-if="currentUser && currentUser.username === route.params.username"
            class="bth-group col-md-6 text-end d-flex align-items-end justify-content-end flex-column"
            role="group"
          >
            <div class="row mb-3 col-md-6">
              <RouterLink
                :to="{ name: 'change-password', params: { username: currentUser.username } }"
                class="btn btn-success"
                >Сменить пароль</RouterLink
              >
            </div>
            <div class="row mb-3 col-md-6">
              <RouterLink
                :to="{ name: 'edit-profile', params: { username: currentUser.username } }"
                class="btn btn-primary"
                >Редактировать профиль</RouterLink
              >
            </div>
            <div class="row col-md-6">
              <RouterLink
                :to="{ name: 'delete-profile', params: { username: currentUser.username } }"
                class="btn btn-danger"
                >Удалить аккаунт</RouterLink
              >
            </div>
          </div>
        </div>
      </template>
      <div class="col-md-10 d-flex mt-5 row">
        <div class="col-md-8 row">
          <PostFormComponent
            id="postForm"
            v-if="currentUser && currentUser.username === route.params.username"
            :post="updatedPost"
            @update-posts="updatePosts"
          ></PostFormComponent>
          <h2 class="text-center mb-3">
            {{ posts.length > 0 ? 'Записи пользователя' : 'Пока нет записей' }}
          </h2>
          <PostComponent
            @edit-post="editPost"
            @delete-post="deletePost"
            v-for="post in posts"
            :key="post.id"
            :post="post"
          ></PostComponent>
        </div>
      </div>
      <InfoComponent v-if="user" :user="user" />
    </div>
  </section>
</template>

<script setup>
import { useProfile } from '@/composable/useProfile.js'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { computed, watch, watchEffect } from 'vue'
import { useUserStore } from '@/store/user'
import InfoComponent from '@/components/users/InfoComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { storeToRefs } from 'pinia'
import config from '@/config'
import PostComponent from '@/components/posts/PostComponent.vue'
import PostFormComponent from '@/components/posts/PostFormComponent.vue'
import { useUserActions } from '@/composable/useUserActions.js'

const { currentUser } = storeToRefs(useUserStore())
const { user, posts, getUserProfile, isLoading, errors } = useProfile()
const route = useRoute()
const API_URL = config.apiUrl
watch(errors, () => {
  document.title = errors.value.length > 0 ? errors.value[0] : route.params.username
})

watchEffect(() => {
  getUserProfile(route.params.username)
})

const { addFriend, removeFriend, acceptFriend } = useUserActions(user)
const updatedPost = ref(null)

const age = computed(() => {
  if (user.value.dateBirth) {
    let years = Math.floor((new Date() - new Date(user.value.dateBirth)) / (3600 * 24 * 365 * 1000))
    if (years === 1 || (years > 20 && years % 10 === 1)) {
      years = years + ' год'
    } else if (years < 5 || (years > 20 && years % 10 < 5)) {
      years = years + ' года'
    } else {
      years = years + ' лет'
    }
    return ', ' + years
  } else {
    return ''
  }
})

const deletePost = (post) => {
  posts.value = posts.value.filter((el) => el !== post)
}

const editPost = (post) => {
  location.hash = ''
  location.hash = 'postForm'
  updatedPost.value = post
}

const updatePosts = () => {
  updatedPost.value = null
  getUserProfile(route.params.username)
}
</script>

<style>
.btn-underline {
  border: none;
  background: none;
  text-align: start;
  color: gray;
  text-decoration: underline;
}

.btn-underline:hover {
  color: rgb(167, 167, 167);
  cursor: pointer;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: gray;
}

.avatar img {
  border-radius: 75px;
  object-fit: cover;
}

.wrapper {
  min-width: 100%;
}
</style>
