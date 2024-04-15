<template>
  <section class="container">
    <div class="nav-scroller py-1 mb-2">
      <nav class="nav d-flex justify-content-between">
        <a class="p-2 link-secondary" href="#">World</a>
        <a class="p-2 link-secondary" href="#">U.S.</a>
        <a class="p-2 link-secondary" href="#">Technology</a>
        <a class="p-2 link-secondary" href="#">Design</a>
        <a class="p-2 link-secondary" href="#">Culture</a>
        <a class="p-2 link-secondary" href="#">Business</a>
        <a class="p-2 link-secondary" href="#">Politics</a>
        <a class="p-2 link-secondary" href="#">Opinion</a>
        <a class="p-2 link-secondary" href="#">Science</a>
        <a class="p-2 link-secondary" href="#">Health</a>
        <a class="p-2 link-secondary" href="#">Style</a>
        <a class="p-2 link-secondary" href="#">Travel</a>
      </nav>
    </div>

    <div class="row">
      <template v-if="isLoading">
        <h2>Загрузка страницы...</h2>
      </template>
      <div v-else-if="error != null">{{ error }}</div>
      <template v-else>
        <div>
          <h1>Привет, {{ user.username }}</h1>
        </div>
        <article v-for="post in posts" :key="post.body" class="mt-3">
          <p>
            {{ post.author.username }}: <b>{{ post.body }}</b>
          </p>
        </article>
      </template>
    </div>
  </section>
</template>

<script setup>
import { useUserPosts } from "@/composable/usePosts.js";

const { user, posts, error, isLoading } = useUserPosts();

</script>
