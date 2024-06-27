<template>
  <section class="container">
    <SpinnerComponent v-if="isLoadingPost" />
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
      <div class="col-lg-9" v-else><PostComponent :post="post"></PostComponent></div>
      <div class="col-lg-6 d-flex mt-5 row">
        <CommentFormComponent :comment="null" @add-comment="addComment"></CommentFormComponent>
        <h2 class="text-center mb-3">
          {{ comments.length > 0 ? 'Комментарии' : 'Пока нет комментариев' }}
        </h2>
        <CommentComponent
          v-for="(comment, index) in comments"
          @update-comment="(comment) => updateComment(index, comment)"
          @delete-comment="deleteComment"
          :key="comment.id"
          :comment="comment"
        >
        </CommentComponent>
      </div>
    </div>
  </section>
</template>

<script setup>
import PostComponent from '@/components/posts/PostComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { usePost } from '@/composable/usePost'
import { useComments } from '@/composable/useComments'
import { watchEffect, provide, readonly } from 'vue'
import { useRoute } from 'vue-router'
import CommentComponent from '@/components/posts/CommentComponent.vue'
import CommentFormComponent from '@/components/posts/CommentFormComponent.vue'
import { useLoading } from '@/composable/useLoading'
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const { currentUser } = storeToRefs(useUserStore())

const { post, errors, fetchPost, isLoadingPost } = usePost()
const { comments, meta, getComments, isLoadingComments } = useComments()

const route = useRoute()
const currentPage = ref(1)

watchEffect(() => {
  fetchPost(route.params.id, 'get')
  comments.value = []
  currentPage.value = 1
  getComments(1, route.params.id)
})

const addComment = (comment) => {
  comments.value.unshift(comment)
}

const updateComment = (index, data) => {
  comments.value[index] = data
}

const deleteComment = (comment) => {
  comments.value = comments.value.filter((el) => el !== comment)
}

provide('post', readonly(post))
useLoading(currentPage, getComments, isLoadingComments, meta, route.params.id)
</script>
