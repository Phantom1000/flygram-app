<template>
  <section class="container">
    <SpinnerComponent v-if="isLoading" />
    <div class="row justify-content-center" v-else>
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
      <div class="col-lg-9" v-else><PostComponent :post="post"></PostComponent></div>
    </div>
  </section>
</template>

<script setup>
import PostComponent from '@/components/posts/PostComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { usePost } from '@/composable/usePost'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const { post, errors, fetchPost, isLoading } = usePost()
const route = useRoute()

watchEffect(() => fetchPost(route.params.id, 'get'))
</script>
