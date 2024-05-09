<template>
  <section class="container">
    <SpinnerComponent v-if="isLoading" />
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
      <template v-else>
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
                  v-model.lazy="body"
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
            <PaginationComponent label="Страницы новостей" :meta="meta"></PaginationComponent>
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
import PaginationComponent from '@/components/PaginationComponent.vue'

const { posts, meta, getPosts, isLoading, errors } = usePosts()
const route = useRoute()
const body = ref('')

watchEffect(() => {
  getPosts(route.query.hashtag, route.query.type, route.query.page)
})

const deletePost = (post) => {
  posts.value = posts.value.filter((el) => el !== post)
}
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
