<template>
  <section class="container">
    <SpinnerComponent v-if="isLoadingCommunity" />
    <div class="row" v-else>
      <h1 class="text-center ms-3 my-3">
        {{ errors && errors.length > 0 ? errors[0] : community.name }}
      </h1>
      <div class="alert alert-danger text-start" v-if="errors && errors.length > 0">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <template v-else-if="currentUser">
        <div class="row d-flex justify-content-between">
          <div class="d-flex align-items-center col-md-6">
            <div class="col-md-4 col-lg-3">
              <div class="avatar">
                <img
                  :src="API_URL + community.links.image"
                  width="150"
                  height="150"
                  v-if="community.links.image"
                />
              </div>
            </div>

            <div class="col-md-6 ms-3">
              <div class="row">
                <h2>{{ community.name }}</h2>
                <p class="mt-2">{{ community.description }}</p>
              </div>
              <div>
                <RouterLink :to="{ name: 'members', params: { id: route.params.id } }"
                  >{{ community.membersCount }} участников</RouterLink
                >
              </div>
            </div>
          </div>
          <div
            class="col-lg-8 ms-4 mt-4"
            v-if="currentUser && currentUser.username !== community.owner"
          >
            <button
              @click="leaveCommunity"
              v-if="community.isMember"
              class="btn btn-danger fly-btn"
            >
              Покинуть
            </button>
            <button
              @click="joinCommunity"
              v-if="!community.isMember"
              class="btn btn-primary mt-2 fly-btn"
            >
              Вступить
            </button>
          </div>
          <div
            v-if="currentUser && currentUser.username === community.owner"
            class="bth-group col-md-6 text-end d-flex align-items-end justify-content-end flex-column"
            role="group"
          >
            <div class="row mb-3 col-md-6">
              <button @click="editCommunity" class="btn btn-primary fly-btn">Редактировать</button>
            </div>
            <div class="row mb-3 col-md-6">
              <button @click="deleteCommunity" class="btn btn-danger fly-btn">Удалить</button>
            </div>
          </div>
        </div>
      </template>
      <div class="col-md-10 d-flex mt-5 row">
        <div class="col-md-8 row">
          <PostFormComponent
            id="postForm"
            v-if="currentUser && currentUser.username === community.owner"
            :post="null"
            :community="route.params.id"
            @add-post="addPost"
          ></PostFormComponent>
          <h2 class="text-center mb-3">
            {{ posts.length > 0 ? 'Записи сообщества' : 'Пока нет записей' }}
          </h2>
          <PostComponent
            v-for="(post, index) in posts"
            @update-post="(post) => updatePost(index, post)"
            @delete-post="deletePost"
            :key="post.id"
            :post="post"
          ></PostComponent>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCommunity } from '@/composable/useCommunity.js'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { watch, watchEffect } from 'vue'
import { useUserStore } from '@/store/user'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { storeToRefs } from 'pinia'
import config from '@/config'
import PostComponent from '@/components/posts/PostComponent.vue'
import PostFormComponent from '@/components/posts/PostFormComponent.vue'
import { useCommunityActions } from '@/composable/useCommunityActions.js'
import { usePosts } from '@/composable/usePosts'
import { useLoading } from '@/composable/useLoading'
import { useRouter } from 'vue-router'
import { useCommunityStore } from '@/store/community'

const router = useRouter()
const { currentUser } = storeToRefs(useUserStore())
const { community, fetchCommunity, isLoadingCommunity, errors } = useCommunity()
const { posts, meta, getPosts, isLoadingPosts } = usePosts()
const { setEditCommunity } = useCommunityStore()
const currentPage = ref(1)

const route = useRoute()
const API_URL = config.apiUrl
watch(errors, () => {
  document.title = errors.value.length > 0 ? errors.value[0] : community.value.name
})

watchEffect(() => {
  fetchCommunity(route.params.id)
  posts.value = []
  getPosts(1, null, null, null, null, route.params.id)
})

useLoading(
  currentPage,
  getPosts,
  isLoadingPosts,
  meta,
  false,
  null,
  null,
  null,
  null,
  route.params.id
)

const { joinCommunity, leaveCommunity } = useCommunityActions(community)
const updatedPost = ref(null)

const deletePost = (post) => {
  posts.value = posts.value.filter((el) => el !== post)
}

const updatePost = (index, data) => {
  posts.value[index] = data
}

const addPost = (post) => {
  updatedPost.value = null
  posts.value.unshift(post)
}

const editCommunity = () => {
  setEditCommunity(community.value)
  router.push({ name: 'editCommunity' })
}

const deleteCommunity = async () => {
  await fetchCommunity(community.value.id, 'delete')
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
