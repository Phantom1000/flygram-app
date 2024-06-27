<template>
  <section class="container">
    <SpinnerComponent v-if="isLoadingPosts" />
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
          <ul class="nav d-flex justify-content-center">
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{ name: 'posts', query: { type: 'liked' } }"
                >Понравившиеся</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{
                  name: 'posts',
                  query: { type: 'recommended' }
                }"
                >Рекомендации</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" exact-active-class="active" :to="{ name: 'posts' }"
                >Все новости</RouterLink
              >
            </li>
          </ul>
          <div class="row mt-3 justify-content-center">
            <div class="col-md-2 col-lg-3 card post-filter">
              <h2 class="text-center mt-3">Поиск</h2>
              <form class="card-body" role="search">
                <input
                  v-model.lazy="search"
                  class="form-control mt-3"
                  type="search"
                  placeholder="Текст"
                  aria-label="Текст"
                />
              </form>
            </div>
            <div class="col-md-9">
              <PostComponent
                v-for="post in posts"
                @delete-post="deletePost"
                :key="post.id"
                :post="post"
              ></PostComponent>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { watchEffect, ref } from 'vue'
import { usePosts } from '@/composable/usePosts'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { useRoute } from 'vue-router'
import PostComponent from '@/components/posts/PostComponent.vue'
import { useLoading } from '@/composable/useLoading'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const { currentUser } = storeToRefs(useUserStore())

const { posts, meta, getPosts, isLoadingPosts, errors } = usePosts()
const route = useRoute()
const search = ref('')
const currentPage = ref(1)
const hashtag = ref(route.query.hashtag)
const type = ref(route.query.type)

watchEffect(() => {
  currentPage.value = 1
  posts.value = []
  hashtag.value = route.query.hashtag
  type.value = route.query.type
  getPosts(1, hashtag, type, search, null, null, true)
})

const deletePost = (post) => {
  posts.value = posts.value.filter((el) => el !== post)
}

useLoading(currentPage, getPosts, isLoadingPosts, meta, hashtag, type, search, null, null)
</script>

<style>
.post-filter {
  min-height: 150px;
  max-height: 150px;
}

.user-list {
  min-height: 500px;
}
</style>
